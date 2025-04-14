import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateRecommendationDto } from './create-recommendation.dto';
import { IsOptional, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRecommendationDto extends PartialType(CreateRecommendationDto) {
  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  productosRecomendadosIds?: number[];
}
