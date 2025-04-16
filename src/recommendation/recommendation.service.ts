// // src/modules/recommendation/recommendation.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Recommendation } from '../entities/recommendation.entity';
// import { Repository } from 'typeorm';
// import { CreateRecommendationDto } from './dto/create-recommendation.dto';
// import { Product } from '../entities/product.entity';
// import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';

// @Injectable()
// export class RecommendationService {
//   constructor(
//     @InjectRepository(Recommendation)
//     private readonly recommendationRepo: Repository<Recommendation>,
//     @InjectRepository(Product)
//     private readonly productRepo: Repository<Product>,
//   ) {}

//   async findAllWithPrices(): Promise<RecommendationResponseDto[]> {
//     const recommendations = await this.recommendationRepo.find({
//       relations: ['productosRecomendados'], // Asegúrate de que los productos vengan en la consulta
//     });
  
//     return recommendations.map((rec) => {
//       const comboPrice = rec.productosRecomendados.reduce((sum, prod) => {
//         return sum + parseFloat(prod.price || 0);
//       }, 0);
  
//       return {
//         id: rec.id,
//         padecimiento: rec.padecimiento,
//         comentarios: rec.comentarios,
//         productosRecomendados: rec.productosRecomendados,
//         comboPrice,
//       };
//     });
//   }
  


//   async findAll(): Promise<(Recommendation & { comboPrice: number })[]> {
//     const recommendations = await this.recommendationRepo.find({
//       relations: ['productosRecomendados'],
//     });
  
//     return recommendations.map((rec) => {
//       const comboPrice = rec.productosRecomendados.reduce((sum, prod) => sum + parseFloat(prod.price), 0);
  
//       return {
//         ...rec,
//         comboPrice,
//       };
//     });
//   }


  

//   async findOne(id: number): Promise<Recommendation> {
//     const recommendation = await this.recommendationRepo.findOne({ where: { id } });
//     if (!recommendation) throw new NotFoundException('Recomendación no encontrada');
//     return recommendation;
//   }
//   async update(id: number, dto: UpdateRecommendationDto): Promise<Recommendation> {
//   const recommendation = await this.findOne(id);

//   if (dto.padecimiento) recommendation.padecimiento = dto.padecimiento;
//   if (dto.comentarios !== undefined) recommendation.comentarios = dto.comentarios;

//   if (dto.productosRecomendadosIds) {
//     const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);
//     recommendation.productosRecomendados = productos;
//   }

//   return this.recommendationRepo.save(recommendation);
// }

// async remove(id: number): Promise<void> {
//   const recommendation = await this.findOne(id);
//   await this.recommendationRepo.remove(recommendation);
// }


//   async create(dto: CreateRecommendationDto): Promise<Recommendation> {
//     const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);

//     const recommendation = this.recommendationRepo.create({
//       padecimiento: dto.padecimiento,
//       comentarios: dto.comentarios,
//       productosRecomendados: productos,
//     });

//     return this.recommendationRepo.save(recommendation);
//   }
// }





// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Recommendation } from '../entities/recommendation.entity';
// import { Product } from '../entities/product.entity';
// import { CreateRecommendationDto } from './dto/create-recommendation.dto';
// import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';
// import { RecommendationResponseDto } from './dto/recommendation-response.dto';

// @Injectable()
// export class RecommendationService {
//   constructor(
//     @InjectRepository(Recommendation)
//     private readonly recommendationRepo: Repository<Recommendation>,
//     @InjectRepository(Product)
//     private readonly productRepo: Repository<Product>,
//   ) {}

//   async findAll(): Promise<RecommendationResponseDto[]> {
//     const recommendations = await this.recommendationRepo.find({
//       relations: ['productosRecomendados'],
//     });

//     return recommendations.map((rec) => {
//       const comboPrice = rec.productosRecomendados.reduce(
//         (sum, prod) => sum + (prod.price ?? 0),
//         0,
//       );
      

//       return {
//         id: rec.id,
//         padecimiento: rec.padecimiento,
//         comentarios: rec.comentarios,
//         productosRecomendados: rec.productosRecomendados,
//         comboPrice,
//       };
//     });
//   }

//   async findOne(id: number): Promise<Recommendation> {
//     const recommendation = await this.recommendationRepo.findOne({
//       where: { id },
//       relations: ['productosRecomendados'],
//     });

//     if (!recommendation) throw new NotFoundException('Recomendación no encontrada');
//     return recommendation;
//   }

//   async update(id: number, dto: UpdateRecommendationDto): Promise<Recommendation> {
//     const recommendation = await this.findOne(id);

//     if (dto.padecimiento) recommendation.padecimiento = dto.padecimiento;
//     if (dto.comentarios !== undefined) recommendation.comentarios = dto.comentarios;

//     if (dto.productosRecomendadosIds) {
//       const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);
//       recommendation.productosRecomendados = productos;
//     }

//     return this.recommendationRepo.save(recommendation);
//   }

//   async remove(id: number): Promise<void> {
//     const recommendation = await this.findOne(id);
//     await this.recommendationRepo.remove(recommendation);
//   }

//   async create(dto: CreateRecommendationDto): Promise<Recommendation> {
//     const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);

//     const recommendation = this.recommendationRepo.create({
//       padecimiento: dto.padecimiento,
//       comentarios: dto.comentarios,
//       productosRecomendados: productos,
//     });

//     return this.recommendationRepo.save(recommendation);
//   }
// }






import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from '../entities/recommendation.entity';
import { Product } from '../entities/product.entity';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationRepo: Repository<Recommendation>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // // Método para calcular el comboPrice
  // private calculateComboPrice(products: Product[]): number {
  //   return products.reduce((sum, prod) => sum + (prod.price ?? 0), 0);
  // }

// // Método para calcular el comboPrice
// private calculateComboPrice(products: Product[]): number {
//   return products.reduce((sum, prod) => sum + (parseFloat(prod.price) || 0), 0);
// }


private calculateComboPrice(products: Product[]): number {
  return products.reduce((sum, prod) => sum + (Number(prod.price) || 0), 0);
}



  async findAll(): Promise<RecommendationResponseDto[]> {
    const recommendations = await this.recommendationRepo.find({
      relations: ['productosRecomendados'],
    });

    return recommendations.map((rec) => {
      const comboPrice = this.calculateComboPrice(rec.productosRecomendados);
      return {
        id: rec.id,
        padecimiento: rec.padecimiento,
        comentarios: rec.comentarios,
        productosRecomendados: rec.productosRecomendados,
        comboPrice,
      };
    });
  }

  async findOne(id: number): Promise<RecommendationResponseDto> {
    const recommendation = await this.recommendationRepo.findOne({
      where: { id },
      relations: ['productosRecomendados'],
    });

    if (!recommendation) throw new NotFoundException('Recomendación no encontrada');

    const comboPrice = this.calculateComboPrice(recommendation.productosRecomendados);

    return {
      id: recommendation.id,
      padecimiento: recommendation.padecimiento,
      comentarios: recommendation.comentarios,
      productosRecomendados: recommendation.productosRecomendados,
      comboPrice,
    };
  }

  async create(dto: CreateRecommendationDto): Promise<RecommendationResponseDto> {
    const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);

    const recommendation = this.recommendationRepo.create({
      padecimiento: dto.padecimiento,
      comentarios: dto.comentarios,
      productosRecomendados: productos,
    });

    const savedRecommendation = await this.recommendationRepo.save(recommendation);
    const comboPrice = this.calculateComboPrice(savedRecommendation.productosRecomendados);

    return {
      id: savedRecommendation.id,
      padecimiento: savedRecommendation.padecimiento,
      comentarios: savedRecommendation.comentarios,
      productosRecomendados: savedRecommendation.productosRecomendados,
      comboPrice,
    };
  }

  async update(id: number, dto: UpdateRecommendationDto): Promise<RecommendationResponseDto> {
    const recommendation = await this.findOne(id);

    if (dto.padecimiento) recommendation.padecimiento = dto.padecimiento;
    if (dto.comentarios !== undefined) recommendation.comentarios = dto.comentarios;

    if (dto.productosRecomendadosIds) {
      const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);
      recommendation.productosRecomendados = productos;
    }

    const updatedRecommendation = await this.recommendationRepo.save(recommendation);
    const comboPrice = this.calculateComboPrice(updatedRecommendation.productosRecomendados);

    return {
      id: updatedRecommendation.id,
      padecimiento: updatedRecommendation.padecimiento,
      comentarios: updatedRecommendation.comentarios,
      productosRecomendados: updatedRecommendation.productosRecomendados,
      comboPrice,
    };
  }

  // async remove(id: number): Promise<void> {
  //   const recommendation = await this.findOne(id);
  //   await this.recommendationRepo.remove(recommendation);
  // }


  async remove(id: number): Promise<void> {
    const recommendation = await this.recommendationRepo.findOne({
      where: { id },
      relations: ['productosRecomendados'],
    });
  
    if (!recommendation) throw new NotFoundException('Recomendación no encontrada');
  
    await this.recommendationRepo.remove(recommendation);
  }
  
  
}


