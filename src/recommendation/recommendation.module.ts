// src/modules/recommendation/recommendation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from '../entities/recommendation.entity';
import { Product } from '../entities/product.entity';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation, Product])],
  providers: [RecommendationService],
  controllers: [RecommendationController],
  exports: [RecommendationService, TypeOrmModule],  
})
export class RecommendationModule {}
