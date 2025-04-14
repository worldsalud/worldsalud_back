// src/modules/recommendation/recommendation.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommendation } from '../entities/recommendation.entity';
import { Repository } from 'typeorm';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { Product } from '../entities/product.entity';
import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationRepo: Repository<Recommendation>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Recommendation[]> {
    return this.recommendationRepo.find();
  }

  async findOne(id: number): Promise<Recommendation> {
    const recommendation = await this.recommendationRepo.findOne({ where: { id } });
    if (!recommendation) throw new NotFoundException('Recomendación no encontrada');
    return recommendation;
  }
  async update(id: number, dto: UpdateRecommendationDto): Promise<Recommendation> {
  const recommendation = await this.findOne(id);

  if (dto.padecimiento) recommendation.padecimiento = dto.padecimiento;
  if (dto.comentarios !== undefined) recommendation.comentarios = dto.comentarios;

  if (dto.productosRecomendadosIds) {
    const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);
    recommendation.productosRecomendados = productos;
  }

  return this.recommendationRepo.save(recommendation);
}

async remove(id: number): Promise<void> {
  const recommendation = await this.findOne(id);
  await this.recommendationRepo.remove(recommendation);
}


  async create(dto: CreateRecommendationDto): Promise<Recommendation> {
    const productos = await this.productRepo.findByIds(dto.productosRecomendadosIds);

    const recommendation = this.recommendationRepo.create({
      padecimiento: dto.padecimiento,
      comentarios: dto.comentarios,
      productosRecomendados: productos,
    });

    return this.recommendationRepo.save(recommendation);
  }
}
