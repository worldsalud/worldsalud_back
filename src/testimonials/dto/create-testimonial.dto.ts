import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTestimonialDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  rating: number;
  @ApiPropertyOptional()
  comment?: string;
  @ApiProperty({ enum: ['text', 'video'] })
  type: 'text' | 'video';
  @ApiPropertyOptional({ description: 'URL de un video de YouTube (opcional si se sube archivo)' })
  mediaUrl?: string;
  @ApiPropertyOptional()
  verified?: boolean;
}
