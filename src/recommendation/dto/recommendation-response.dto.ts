// src/modules/recommendation/dto/recommendation-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../entities/product.entity';

export class RecommendationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  padecimiento: string;

  @ApiProperty({ required: false })
  comentarios?: string;

  @ApiProperty({ type: [Product] })
  productosRecomendados: Product[];
}
