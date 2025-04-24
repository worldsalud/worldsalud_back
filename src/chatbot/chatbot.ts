/* eslint-disable prefer-const */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { VertexAI, GenerativeModel } from '@google-cloud/vertexai';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

dotenv.config();

// ✅ Guardar credenciales de Google Cloud en un archivo temporal si existen
const credPath = path.join(__dirname, 'google-credentials.json');

if (process.env.GOOGLE_CREDENTIALS_JSON) {
  fs.writeFileSync(credPath, process.env.GOOGLE_CREDENTIALS_JSON);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class Chatbot {
  @WebSocketServer()
  server: Server;

  private model: GenerativeModel;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.GOOGLE_CLOUD_REGION,
    });

    this.model = vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
  }

  private readonly systemContext = `
  Eres un asistente virtual de WorldSalud, especializado en soluciones naturales a través de parches terapéuticos.
  
  🌿 ¿Qué es WorldSalud?
  WorldSalud es una tienda enfocada en el bienestar natural, que ofrece parches terapéuticos elaborados con ingredientes bioactivos. Estos parches se aplican sobre la piel y están formulados para apoyar diversos procesos del cuerpo de forma no invasiva.
  
  🩹 Productos:
  Los principales parches incluyen:
  - PNG: parche regenerador general, base en muchos tratamientos.
  - Melatonin: ideal para apoyo al sueño, relajación y procesos celulares.
  - B12: aporta energía y apoyo neurológico.
  - Omevia: antinflamatorio natural.
  - Dekamin: apoyo inmunológico y óseo.
  - Slim: utilizado para metabolismo y digestión.
  - Night (Ladies / Gentleman): enfocados en equilibrio hormonal y funciones reproductivas.
  - Colágeno, Indoloro, Delamin, entre otros, según cada caso.
  
  💊 Tu propósito:
  - Ayudar a los usuarios a saber qué parches usar para un padecimiento específico.
  - Basarte estrictamente en la tabla de combinaciones preestablecida (no inventes).
  - Siempre incluye:
    - Los nombres de los parches recomendados.
    - Comentarios adicionales si están disponibles.
  
  📋 Consideraciones:
  - Las recomendaciones están basadas en experiencias de uso. No sustituyen atención médica profesional.
  - Si el usuario menciona un padecimiento no registrado, responde con: "Por el momento no tengo una recomendación para ese caso. Te recomiendo consultar a un profesional."
  
  🧠 Reglas:
  - Usa un tono cálido, amable y fácil de entender.
  - Sé claro, directo, sin adornos innecesarios.
  - Nunca recomiendes productos fuera de los listados.
  
  ✅ Ejemplo de respuesta:
  🩹 Para *[nombre del padecimiento]*, se recomiendan los parches: [lista de parches].  
  📝 [Comentarios adicionales si los hay]
  `;
  

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: {
      userMessage: string;
      userId?: number;
      conversationHistory?: { text: string; sender: string }[];
    },
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    try {
      let userName = 'Usuario';

      if (data.userId) {
        const user = await this.userRepository.findOne({
          where: { id: data.userId as any },
        });
        if (user) {
          userName = user.name;
        }
      }

      // Tomar el último historial de mensajes (máximo 5)
      const recentHistory =
        data.conversationHistory
          ?.slice(-5)
          .map(
            (msg) =>
              `${msg.sender === 'bot' ? 'Chatbot' : userName}: ${msg.text}`,
          )
          .join('\n') || '';

      // Construir el prompt para Gemini
      const prompt = `
        ${this.systemContext}
        === Historial de conversación ===
        ${recentHistory}

        ${userName}: ${data.userMessage}
        Chatbot:`;

      // Llamar a Gemini AI
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const response = await result.response;
      let botResponse =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Lo siento, no entendí tu pregunta. ¿Podrías reformularla?';

      // Enviar la respuesta al usuario
      this.server.to(socket.id).emit('bot-response', { text: botResponse });
    } catch (error) {
      console.error('❌ Error al comunicarse con Gemini:', error);
      console.error('🔍 Stack:', error.stack);

      this.server.to(socket.id).emit('bot-response', {
        text: 'Lo siento, ocurrió un problema técnico. Inténtalo más tarde.',
      });
    }
  }
}
