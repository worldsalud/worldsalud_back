// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from 'src/entities/product.entity';
// import { Category } from 'src/entities/category.entity';
// import { User } from 'src/entities/user.entity';
// import { Order } from 'src/entities/order.entity';
// import * as bcrypt from 'bcrypt';
// import { StockMovements } from 'src/entities/stock-movement.entiy';
// import { Magazine } from 'src/entities/magazine.entity';

// async function hashPassword(password: string): Promise<string> {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// }

// @Injectable()
// export class SeederService {
//   constructor(
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//     @InjectRepository(Category)
//     private readonly categoryRepository: Repository<Category>,
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,
//     @InjectRepository(Order)
//     private readonly orderRepository: Repository<Order>,
//     @InjectRepository(StockMovements)
//     private readonly stockMovementRepository: Repository<StockMovements>,
//     @InjectRepository(Magazine)
//     private readonly magazineRepository: Repository<Magazine>,
//   ) { }

//   async seed() {
//     console.log('🚀 Iniciando Seed...');

//     const categoryNames = ['Ropa', 'Calzado', 'Accesorios'];
//     const createdCategories: Category[] = await Promise.all(
//       categoryNames.map(async (name) => {
//         let category = await this.categoryRepository.findOne({
//           where: { name },
//         });
//         if (!category) {
//           category = this.categoryRepository.create({ name });
//           await this.categoryRepository.save(category);
//         }
//         return category;
//       }),
//     );
//     const categoryMap = new Map<string, Category>();
//     categoryMap.set('ropa', createdCategories[0]);
//     categoryMap.set('calzado', createdCategories[1]);
//     categoryMap.set('accesorios', createdCategories[2]);

//     const usersData = [
//       {
//         name: 'Admin', email: 'admin@example.com', password: '@dm!n1234', role: 'admin',
//       },
//     ];
//     const createdUsers = await Promise.all(
//       usersData.map(async (userData) => {
//         let user = await this.userRepository.findOne({
//           where: { email: userData.email },
//         });
//         if (!user) {
//           userData.password = await hashPassword(userData.password);
//           user = this.userRepository.create(userData);
//           await this.userRepository.save(user);
//         }
//         return user;
//       }),
//     );
//     const userMap = new Map<string, User>();
//     userMap.set('juan', createdUsers[0]);
//     userMap.set('ana', createdUsers[1]);

//     /** 🔹 3️⃣ Crear Productos */
//     let existingProducts = await this.productRepository.find();
//     if (existingProducts.length === 0) {
//       const products: Partial<Product>[] = [
//         {
//           name: 'Remera senna edition',
//           description: 'Remera senna editio limitada',
//           price: 1999,
//           stock: 25,
//           category: categoryMap.get('ropa'),
//           style: "Motorsport",
//           size: 'M',
//           isActive: true,
//           image: ["https://i.pinimg.com/736x/16/9a/49/169a497c320601b50225324917ef52e8.jpg"]
//         },
//         {
//           name: 'Pantalón sport N6 custom',
//           description: 'Pantalón sport N6 custom edicion limitada',
//           price: 3999,
//           stock: 30,
//           category: categoryMap.get('ropa'),
//           style: "Streetwear",
//           size: 'L',
//           isActive: true,
//           image: ["https://i.pinimg.com/736x/f0/04/6d/f0046df3f87ce98891f4d355402209b1.jpg"]
//         },
//         {
//           name: 'Camiseta Urban Tokyo',
//           description: "Camiseta de algodón con diseño inspirado en la cultura urbana de Tokio, gráficos minimalistas y ajuste oversize.",
//           price: 2499,
//           stock: 20,
//           category: categoryMap.get("ropa"),
//           style: "Asian",
//           size: "L",
//           isActive: true,
//           image: ["https://i.pinimg.com/736x/9a/4c/3b/9a4c3b36c408866a7d18fbd7f18f5bed.jpg", "https://i.pinimg.com/736x/bb/da/55/bbda557c26ae321a27f130a1101ee58b.jpg"]
//         },
//       ];
//       await this.productRepository.save(products);
//       console.log("✅ Productos insertados correctamente en la base de datos.");
//       const existingPosts = await this.magazineRepository.find();
//       if (existingPosts.length === 0) {
//         const posts: Partial<Magazine>[] = [
//             {
//               category: 'MUNDO ASIAN',
//               title: '¿Por qué es tan cool  Asian Style?',
//               content:
//                 ' El Asian Style no sigue tendencias, las crea. Mientras en otros lugares la moda tarda en evolucionar, en Asia las calles son pasarelas vivas donde cada prenda tiene actitud. Se trata de jugar con texturas, siluetas oversized y prendas funcionales que te hacen ver como salido de una película cyberpunk.Las piezas clave para dominar el look:Cortavientos techwear  Ligero, futurista y perfecto para el caos urbano.Pantalones cargo ultra cómodos Bolsillos estratégicos para guardar desde el celular hasta los snacks.Sneakers chunky o minimalistas  Todo depende de qué tan "extra" quieras ser.Camisetas oversized con tipografías asiáticas – Porque un buen print siempre dice algo, aunque no entiendas qué.Tip de INK3D:El truco del Asian Style está en mezclar sin miedo: prueba un pantalón ancho con un top ajustado o una chaqueta oversized con sneakers futuristas. Recuerda, más que un outfit, es una actitud.',
//               image:
//                 'https://i.pinimg.com/736x/44/60/d7/4460d73f5184e3ef7a5ba50180e93f56.jpg',
//               author: 'Emma Blue',
//             },
//         ];
//         await this.magazineRepository.save(posts);
//       }
//       console.log(
//         '✅ Seed de categorías, productos, usuarios, órdenes, movimientos de stock y posts en magazine completado.',
//       );
//     }
//   }
// }




import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';
import { Order } from 'src/entities/order.entity';
import * as bcrypt from 'bcrypt';
import { StockMovements } from 'src/entities/stock-movement.entiy';
import { Magazine } from 'src/entities/magazine.entity';
import { Recommendation } from 'src/entities/recommendation.entity';


async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(StockMovements)
    private readonly stockMovementRepository: Repository<StockMovements>,
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
    @InjectRepository(Recommendation)
    private readonly recommendationRepository: Repository<Recommendation>, 
  ) { }

  async seed() {
    console.log('🌿 Iniciando Seed World Salud...');

    /** 🔸 1️⃣ Crear categorías naturales */
    const categoryNames = ['Bienestar', 'Intima', 'Cosmética'];
    const createdCategories: Category[] = await Promise.all(
      categoryNames.map(async (name) => {
        let category = await this.categoryRepository.findOne({ where: { name } });
        if (!category) {
          category = this.categoryRepository.create({ name });
          await this.categoryRepository.save(category);
        }
        return category;
      }),
    );

    const categoryMap = new Map<string, Category>();
    categoryMap.set('bienestar', createdCategories[0]);
    categoryMap.set('intima', createdCategories[1]);
    categoryMap.set('cosmética', createdCategories[2]);
   

    /** 🔸 2️⃣ Crear usuario admin */
    const usersData = [
      {
        name: 'Admin',
        email: 'admin@worldsalud.com',
        password: 'admin123',
        role: 'admin',
      },
    ];
    const createdUsers = await Promise.all(
      usersData.map(async (userData) => {
        let user = await this.userRepository.findOne({ where: { email: userData.email } });
        if (!user) {
          userData.password = await hashPassword(userData.password);
          user = this.userRepository.create(userData);
          await this.userRepository.save(user);
        }
        return user;
      }),
    );

    /** 🔸 3️⃣ Crear productos naturales */
    const existingProducts = await this.productRepository.find();
    if (existingProducts.length === 0) {
      const products: Partial<Product>[] = [
        {
          name: 'Parches PNG',
          description: 'Acelera la recuperación de lesiones.\nFavorece la cicatrización.\nCombate el dolor de músculos.\nFortalece los pulmones.\nAlivia el dolor articular.\nActúa como un antiinflamatorio.\nRegula la presión arterial.\nDesintoxica el cuerpo.',
          price: 500000,
          stock: 1,
          category: categoryMap.get('bienestar'),
          style: 'Bienestar',
          size: 'Unidad',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663247/9_20250411_230817_0000_phyrzp.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/810VqU5VvJL._AC_UF894_1000_QL80__xjgjwg.jpg', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/550x751_brxdgi.jpg'],
        },
        {
          name: 'Vitamina B12',
          description: 'Ayuda a obtener las cantidades adecuadas de vitamina B12.\nFortalece el sistema nervioso central.\nPreviene la formación de problemas de memoria.\nEs beneficioso para el sistema digestivo.\nAyuda en la conversión de carbohidratos en glucosa.',
          price: 256000,
          stock: 1,
          category: categoryMap.get('cosmética'),
          style: 'Cosmética',
          size: '60 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663250/21_20250411_230817_0002_frzvrw.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341731/b12-produkt-1.jpg_nzlo7f.webp', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341731/14u_dzkdye.jpg'],
        },
        {
          name: 'Melatonin Plus',
          description: 'Concilias el sueño más rápido.\nDuermes profundamente durante toda la noche.\nReduce el estrés y la ansiedad.\nMejora tu estado de ánimo.\nFortalece tu sistema inmunológico.\nReduce la inflamación.\nAfrodisíaco.',
          price: 244000,
          stock: 1,
          category: categoryMap.get('cosmética'),
          style: 'Cosmética',
          size: '30 tabletas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663248/30_20250411_230936_0000_xpirml.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341734/onemore-france-melatonin-plus_uheluu.png', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341734/Melotonin-pr11_o60pcz.jpg'],
        },
        {
          name: 'Slime Style',
          description: 'Ayuda a alcanzar tu peso ideal.\nQuema grasa de forma natural.\nReduce la retención de líquidos.\nCombate la celulitis.\nPreviene el envejecimiento.\nMejora la elasticidad de la piel.\nReduce el colesterol.\nRegula las funciones tiroideas.\nDisminuye la presión arterial.',
          price: 325000,
          stock: 1,
          category: categoryMap.get('cosmética'),
          style: 'Cosmética',
          size: '90 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663251/37_20250411_230936_0001_vfz1e7.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/images_iraecg.jpg', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/110000403751206_iye2oc.jpg'],
        },
        {
          name: 'Omevia',
          description: 'Mejora la memoria y la función cerebral.\nReduce el riesgo de enfermedades cardiovasculares.\nFortalece el sistema inmunológico.\nAumenta la energía y la vitalidad.\nRetrasa el proceso de envejecimiento prematuro.',
          price: 268800,
          stock: 1,
          category: categoryMap.get('cosmética'),
          style: 'Bienestar',
          size: '90 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744664558/Disen%CC%83o_sin_ti%CC%81tulo_20250414_145434_0000_czi5ap.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341735/format-webp_mmtvrw.webp', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341735/sddefault_o6vigb.jpg'],
        },
        {
          name: 'Dekamin',
          description: 'Contiene Vitamina D, Vitamina C, Vitamina K2, Magnesio.\nContribuye al funcionamiento del sistema inmunológico.\nLa función principal de las vitaminas K en el cuerpo es la coagulación sanguínea.\nParticipa en cientos de reacciones químicas en su cuerpo y ayuda a mantener su salud.',
          price: 244000,
          stock: 1,
          category: categoryMap.get('bienestar'),
          style: 'Bienestar',
          size: '90 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663251/15_20250411_230817_0001_m8qrfe.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341733/format-webp_q5up1t.webp', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341734/dekamin_immune_booster_brczvm.png'],
        },
        {
          name: 'Sornie (Collagen Patch )',
          description: 'Mejora la elasticidad.\nPiel más firme, joven y radiante.\nContribuye a la curación de las arrugas.\nUnifica el tono de la piel.\nFavorece la cicatrización de heridas.\nReduce la inflamación.\nReduce la apariencia de manchas oscuras.',
          price: 500000,
          stock: 1,
          category: categoryMap.get('cosmética'),
          style: 'Cosmética',
          size: '90 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663246/44_20250411_230936_0002_pvefqw.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341732/IMG_0181-3_bfxlit.jpg', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341732/Sornie_swaavc.jpg'],
        },
        {
          name: 'Sornie(Anti-Maging Mask)',
          description: 'Calma la irritación.\nPromueve la cicatrización.\nRellena las arrugas.\nMejora la elasticidad.\nProtege la piel.\nEstimula la renovación celular.\nReduce las arrugas y las manchas.\nSuaviza y regenera.',
          price: 500000,
          stock: 1,
          category: categoryMap.get('cosmética'),
          style: 'Cosmética',
          size: '90 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663249/50_20250411_231020_0000_qmuopb.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341731/Anti_aging_mask_for_glowing_skin_wmffln.jpg'],
        },
        {
          name: 'Nigth Gentlemen',
          description: 'Aumenta la libido.\nMejora la erección.\nIntensifica el placer.\nAumenta la testosterona.\nMejora la calidad del esperma.\nMejora la circulación sanguínea.\nCombate la disfunción eréctil.\nReduce la inflamación.\nReduce el estrés.',
          price: 500000,
          stock: 1,
          category: categoryMap.get('intima'),
          style: 'Intima',
          size: '90 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663248/62_20250411_231020_0001_rmfze7.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345354/image_1080.jpg_tlxhtx.webp', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345354/Men-night_hhpgzz.jpg'],
        },
        {
          name: 'Nigth Lady s',
          description: 'Aumenta la libido.\nMejora la circulación sanguínea.\nFavorece la lubricación.\nPotencia los orgasmos.\nRegula el ciclo menstrual.\nMejora la fertilidad.\nReduce la inflamación.\nAlivia los calambres menstruales.\nRegula el equilibrio hormonal.\nReduce los síntomas de la menopausia.',
          price: 500000,
          stock: 1,
          category: categoryMap.get('intima'),
          style: 'Intima',
          size: '90 cápsulas',
          isActive: true,
          image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744663249/67_20250411_231020_0002_wbgudj.png','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345354/image-crop-200000517_ah3zm0.jpg', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345358/9g_tpde4l.jpg'],
        },

      ];
      await this.productRepository.save(products);
      console.log('✅ Productos naturales insertados.');
    }

    // Agregar stock inicial a StockMovements
    const allProducts = await this.productRepository.find();

    for (const product of allProducts) {
      // Evitar duplicar movimientos si ya existen
      const existingMovement = await this.stockMovementRepository.findOne({
        where: { product: { id: product.id }, type: 'initial_stock' },
      });

      if (!existingMovement) {
        await this.stockMovementRepository.save({
          product,
          quantity: product.stock,
          previousStock: 0,
          newStock: product.stock,
          type: 'initial_stock',
          reason: 'Stock inicial del seeder',
        });
      }
    }

    console.log('✅ Movimientos de stock inicial registrados.');
    const recommendationSeeds = [
        {
          padecimiento: "Cáncer de páncreas",
          productos: ["Parches PNG", "Omevia", "Melatonin Plus"],
          comentarios: "PNG medio en páncreas y la otra mitad en el omoplato derecho",
        },
        {
          padecimiento: "Neoplasia pancreática",
          productos: ["Parches PNG", "Omevia", "Melatonin Plus"],
          comentarios: "PNG medio en páncreas y un entero en el omoplato derecho",
        },
        {
          padecimiento: "Ataques de pánico",
          productos: ["Vitamina B12", "Melatonin Plus", "Parches PNG"],
          comentarios: "",
        },
        {
          padecimiento: "Parkinson",
          productos: ["Parches PNG", "Vitamina B12", "Melatonin Plus"],
          comentarios: "",
        },
        {
          padecimiento: "Embarazo",
          productos: ["Parches PNG", "Dekamin", "Melatonin Plus"],
          comentarios: "",
        },
        {
          padecimiento: "Próstata",
          productos: ["Nigth Gentlemen", "Parches PNG"],
          comentarios: "",
        },
        {
          padecimiento: "Psoriasis",
          productos: ["Parches PNG", "Omevia", "Dekamin", "Melatonin Plus"],
          comentarios: "",
        },
        {
          padecimiento: "Enfermedades pulmonares",
          productos: ["Parches PNG", "Omevia", "Melatonin Plus"],
          comentarios: "PNG la mitad sobre cada pulmón",
        },
        {
          padecimiento: "Infecciones pulmonares",
          productos: ["Parches PNG", "Dekamin", "Melatonin Plus"],
          comentarios: "",
        },
        {
          padecimiento: "Recuperación tras esfuerzo intenso",
          productos: ["Parches PNG", "Melatonin Plus"],
          comentarios: "",
        },
        {
          padecimiento: "Reumatismo",
          productos: ["Parches PNG", "Omevia", "Vitamina B12"],
          comentarios: "Pegar trozos de PNG alrededor del área afectada",
        },
        {
          padecimiento: "Espondilosis",
          productos: ["Parches PNG", "Omevia", "Dekamin", "Sornie (Collagen Patch )"],
          comentarios: "",
        },
        {
          padecimiento: "Trazos",
          productos: ["Omevia", "Melatonin Plus", "Vitamina B12", "Parches PNG"],
          comentarios: "Si es Isquemia, añadir PNG",
        },
        {
          padecimiento: "Hinchazón de Piernas",
          productos: ["Parches PNG"],
          comentarios: "En plantas de pies",
        },
        {
          padecimiento: "Tiroides",
          productos: ["Parches PNG", "Vitamina B12", "Omevia"],
          comentarios: "",
        },
        {
          padecimiento: "Tinnitus",
          productos: ["Melatonin Plus", "Vitamina B12", "Parches PNG"],
          comentarios: "",
        },
        {
          padecimiento: "Úlcera, ácido gástrico",
          productos: ["Melatonin Plus"],
          comentarios: "",
        },
        {
          padecimiento: "Venas Varicosas",
          productos: ["Parches PNG", "Omevia"],
          comentarios: "La mitad al inicio de la zona afectada y la otra mitad al final + ducha de agua fría en las piernas",
        },
        {
          padecimiento: "Vértigo, mareo",
          productos: ["Vitamina B12", "Melatonin Plus", "Parches PNG"],
          comentarios: "",
        },
        {
          padecimiento: "Cuerdas vocales",
          productos: ["Parches PNG"],
          comentarios: "La mitad en cada lado de la garganta",
        },
    ];
    for (const seed of recommendationSeeds) {
      // Verificar si ya existe la recomendación por padecimiento
      const existing = await this.recommendationRepository.findOne({
        where: { padecimiento: seed.padecimiento },
      });
    
      if (!existing) {
        // Buscar los productos por nombre
        const productos = await this.productRepository.find({
          where: seed.productos.map(name => ({ name })),
        });
    
        // Verificar si todos los productos fueron encontrados
        const foundProductNames = productos.map(product => product.name);
        const notFoundProducts = seed.productos.filter(product => !foundProductNames.includes(product));
    
        if (notFoundProducts.length > 0) {
          console.log('Algunos productos no fueron encontrados:', notFoundProducts);
          continue; // O puedes lanzar un error si prefieres detener el proceso
        }
    
        // Crear la recomendación con los productos encontrados
        const recommendation = this.recommendationRepository.create({
          padecimiento: seed.padecimiento,
          comentarios: seed.comentarios,
          productosRecomendados: productos,
        });
    
        // Utilizar una transacción para asegurar la integridad de los datos
        const queryRunner = this.recommendationRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
    
        try {
          // Guardar la recomendación en la base de datos
          await queryRunner.manager.save(recommendation);
    
          // Confirmar la transacción
          await queryRunner.commitTransaction();
          console.log(`✅ Recomendación para ${seed.padecimiento} insertada correctamente.`);
        } catch (error) {
          // Si algo falla, revertir la transacción
          await queryRunner.rollbackTransaction();
          console.error('Error al insertar la recomendación:', error);
        } finally {
          // Liberar el query runner
          await queryRunner.release();
        }
      } else {
        console.log(`La recomendación para ${seed.padecimiento} ya existe.`);
      }
    }
    

    /** 🔸 4️⃣ Crear post magazine */
    const existingPosts = await this.magazineRepository.find();
    if (existingPosts.length === 0) {
      const posts: Partial<Magazine>[] = [
        {
          category: 'Vida Natural',
          title: '5 beneficios del magnesio que no sabías',
          content: 'El magnesio es un mineral esencial que ayuda a mejorar el sueño, reducir el estrés y aliviar los calambres musculares. Ideal para deportistas y personas con rutinas intensas.',
          image: 'https://i.pinimg.com/736x/ab/b2/1c/abb21c8ad8ec163ea20b14e18852eeba.jpg',
          author: 'Laura Wellness',
        },
      ];
      await this.magazineRepository.save(posts);
      console.log('✅ Post magazine creado.');
    }

    console.log('🌱 Seed completado para World Salud.');
  }
}
