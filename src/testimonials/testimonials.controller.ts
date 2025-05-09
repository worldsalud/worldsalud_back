import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { TestimonialsService } from './testimonials.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('testimonials')
@ApiTags('Testimonials')
export class TestimonialsController {
  constructor(
    private readonly service: TestimonialsService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los testimonios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de testimonios',
    type: [CreateTestimonialDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('media')) // campo opcional
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Crear un testimonio con archivo o link externo',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Ana Martínez' },
        location: { type: 'string', example: 'Madrid, España' },
        comment: { type: 'string', example: 'Me encantó el producto' },
        rating: { type: 'number', example: 5 },
        type: { type: 'string', enum: ['text', 'video'], example: 'video' },
        media: { type: 'string', format: 'binary' }, // archivo
        mediaUrl: { type: 'string', example: 'https://youtu.be/abc123' }, // o link
        verified: { type: 'boolean', example: true },
      },
    },
  })
  @ApiOperation({
    summary: 'Crear un testimonio (con archivo o link externo)',
  })
  @ApiResponse({
    status: 201,
    description: 'Testimonio creado con éxito',
    type: CreateTestimonialDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateTestimonialDto,
  ) {
    let finalMediaUrl = dto.mediaUrl;

    if (!finalMediaUrl && file) {
      finalMediaUrl = await this.fileUploadService.uploadImage(file); 
    }
    if (!finalMediaUrl) {
      throw new BadRequestException(
        'Debe proporcionar un archivo o una URL de video',
      );
    }

    return this.service.create({
      ...dto,
      mediaUrl: finalMediaUrl,
    });
  }
  


  @Get(':id')
  @ApiOperation({ summary: 'Obtener un testimonio por ID' })
  @ApiResponse({ status: 200, description: 'Testimonio encontrado' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un testimonio' })
  @ApiResponse({ status: 200, description: 'Testimonio actualizado' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTestimonialDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un testimonio por ID' })
  @ApiResponse({ status: 204, description: 'Testimonio eliminado' })
  async remove(@Param('id') id: string) {
    await this.service.remove(id);
    return { message: 'Testimonio eliminado' };
  }



}
