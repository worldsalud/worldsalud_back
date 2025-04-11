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
  ) {}

  async seed() {
    console.log('🌿 Iniciando Seed World Salud...');

    /** 🔸 1️⃣ Crear categorías naturales */
    const categoryNames = ['Parches', 'Vitaminas', 'Suplementos', 'Cuidado Digestivo', 'Natural'];
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
    categoryMap.set('parches', createdCategories[0]);
    categoryMap.set('vitaminas', createdCategories[1]);
    categoryMap.set('suplementos', createdCategories[2]);
    categoryMap.set('digestivo', createdCategories[3]);
    categoryMap.set('natural', createdCategories[4]);

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
            description: 'Útil para reumatismo y dolores articulares. Hechos 100% con ingredientes naturales.',
            price: 39999,
            stock: 30,
            category: categoryMap.get('parches'),
            style: 'Terapéutico',
            size: 'Unidad',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/810VqU5VvJL._AC_UF894_1000_QL80__xjgjwg.jpg','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/550x751_brxdgi.jpg'],
          },
          {
            name: 'Vitamina B12',
            description: 'Mejora niveles de energía y apoya la función neurológica. Fórmula de alta absorción.',
            price: 24999,
            stock: 45,
            category: categoryMap.get('vitaminas'),
            style: 'Suplemento',
            size: '60 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341731/b12-produkt-1.jpg_nzlo7f.webp','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341731/14u_dzkdye.jpg'],
          },
          {
            name: 'Melatonin Plus',
            description: 'Mejora la calidad del sueño, regula el ciclo circadiano y ofrece liberación gradual.',
            price: 19999,
            stock: 60,
            category: categoryMap.get('suplementos'),
            style: 'Suplemento',
            size: '30 tabletas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341734/onemore-france-melatonin-plus_uheluu.png', 'https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341734/Melotonin-pr11_o60pcz.jpg'],
          },
          {
            name: 'Slime Style',
            description: 'Fortalece el sistema inmune con ingredientes antioxidantes y 100% orgánicos.',
            price: 29999,
            stock: 40,
            category: categoryMap.get('suplementos'),
            style: 'Natural',
            size: '90 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/images_iraecg.jpg','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341737/110000403751206_iye2oc.jpg'],
          },
          {
            name: 'Omevia',
            description: 'Fortalece el sistema inmune con ingredientes antioxidantes y 100% orgánicos.',
            price: 29999,
            stock: 40,
            category: categoryMap.get('suplementos'),
            style: 'Natural',
            size: '90 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341735/format-webp_mmtvrw.webp','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341735/sddefault_o6vigb.jpg'],
          },
          {
            name: 'Dekamin',
            description: 'Fortalece el sistema inmune con ingredientes antioxidantes y 100% orgánicos.',
            price: 29999,
            stock: 40,
            category: categoryMap.get('suplementos'),
            style: 'Natural',
            size: '90 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341733/format-webp_q5up1t.webp','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341734/dekamin_immune_booster_brczvm.png'],
          },
          {
            name: 'Sornie (Collagen Patch )',
            description: 'Fortalece el sistema inmune con ingredientes antioxidantes y 100% orgánicos.',
            price: 29999,
            stock: 40,
            category: categoryMap.get('suplementos'),
            style: 'Natural',
            size: '90 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341732/IMG_0181-3_bfxlit.jpg','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341732/Sornie_swaavc.jpg'],
          },
          {
            name: 'Sornie(Anti-Maging Mask)',
            description: 'Fortalece el sistema inmune con ingredientes antioxidantes y 100% orgánicos.',
            price: 29999,
            stock: 40,
            category: categoryMap.get('suplementos'),
            style: 'Natural',
            size: '90 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744341731/Anti_aging_mask_for_glowing_skin_wmffln.jpg'],
          },
          {
            name: 'Nigth Gentlemen',
            description: 'Fortalece el sistema inmune con ingredientes antioxidantes y 100% orgánicos.',
            price: 29999,
            stock: 40,
            category: categoryMap.get('suplementos'),
            style: 'Natural',
            size: '90 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345354/image_1080.jpg_tlxhtx.webp','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345354/Men-night_hhpgzz.jpg'],
          },
          {
            name: 'Nigth Lady s',
            description: 'Fortalece el sistema inmune con ingredientes antioxidantes y 100% orgánicos.',
            price: 29999,
            stock: 40,
            category: categoryMap.get('suplementos'),
            style: 'Natural',
            size: '90 cápsulas',
            isActive: true,
            image: ['https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345354/image-crop-200000517_ah3zm0.jpg','https://res.cloudinary.com/dfxps2pzh/image/upload/v1744345358/9g_tpde4l.jpg'],
          },
        
      ];
      await this.productRepository.save(products);
      console.log('✅ Productos naturales insertados.');
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
