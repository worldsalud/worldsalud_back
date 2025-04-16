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

  @ApiProperty({ description: 'Precio total del combo de productos', example: 45900 })
  comboPrice: number;
}
