// src/modules/recommendation/dto/create-recommendation.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, ArrayNotEmpty, IsNumber } from 'class-validator';

export class CreateRecommendationDto {
  @ApiProperty()
  @IsString()
  padecimiento: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  comentarios?: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  productosRecomendadosIds: number[];
}





