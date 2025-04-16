// // src/modules/recommendation/recommendation.controller.ts
// import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
// import { RecommendationService } from './recommendation.service';
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
// import { RecommendationResponseDto } from './dto/recommendation-response.dto';
// import { Delete } from '@nestjs/common';
// import { CreateRecommendationDto } from './dto/create-recommendation.dto';
// import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';


// @ApiTags('Recomendaciones')
// @Controller('recommendations')
// export class RecommendationController {
//   constructor(private readonly service: RecommendationService) {}


//   @Get()
// @ApiResponse({ status: 200, type: [RecommendationResponseDto] })
// findAll(): Promise<RecommendationResponseDto[]> {
//   return this.service.findAllWithPrices();
// }


//   @Get(':id')
//   @ApiResponse({ status: 200, type: RecommendationResponseDto })
//   findOne(@Param('id') id: string) {
//     return this.service.findOne(+id);
//   }

//   @Post()
//   @ApiResponse({ status: 201, type: RecommendationResponseDto })
//   create(@Body() dto: CreateRecommendationDto) {
//     return this.service.create(dto);
//   }


//   @Put(':id')
// @ApiResponse({ status: 200, type: RecommendationResponseDto })
// update(@Param('id') id: string, @Body() dto: UpdateRecommendationDto) {
//   return this.service.update(+id, dto);
// }

// @Delete(':id')
// @ApiResponse({ status: 204, description: 'Recomendación eliminada' })
// remove(@Param('id') id: string) {
//   return this.service.remove(+id);
// }
// }


// import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
// import { RecommendationService } from './recommendation.service';
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
// import { RecommendationResponseDto } from './dto/recommendation-response.dto';
// import { CreateRecommendationDto } from './dto/create-recommendation.dto';
// import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';

// @ApiTags('Recomendaciones')
// @Controller('recommendations')
// export class RecommendationController {
//   constructor(private readonly service: RecommendationService) {}

//   @Get()
//   @ApiResponse({ status: 200, type: [RecommendationResponseDto] })
//   findAll(): Promise<RecommendationResponseDto[]> {
//     return this.service.findAll(); // Ahora ya devuelve comboPrice integrado
//   }

//   @Get(':id')
//   @ApiResponse({ status: 200, type: RecommendationResponseDto })
//   async findOne(@Param('id') id: string): Promise<RecommendationResponseDto> {
//     const rec = await this.service.findOne(+id);

//     const comboPrice = rec.productosRecomendados.reduce(
//       (sum, prod) => sum + (prod.price ?? 0),
//       0,
//     );
    

//     return {
//       id: rec.id,
//       padecimiento: rec.padecimiento,
//       comentarios: rec.comentarios,
//       productosRecomendados: rec.productosRecomendados,
//       comboPrice,
//     };
//   }

//   @Post()
//   @ApiResponse({ status: 201, type: RecommendationResponseDto })
//   async create(@Body() dto: CreateRecommendationDto): Promise<RecommendationResponseDto> {
//     const rec = await this.service.create(dto);

//     const comboPrice = rec.productosRecomendados.reduce(
//       (sum, prod) => sum + (prod.price ?? 0),
//       0,
//     );
    

//     return {
//       id: rec.id,
//       padecimiento: rec.padecimiento,
//       comentarios: rec.comentarios,
//       productosRecomendados: rec.productosRecomendados,
//       comboPrice,
//     };
//   }

//   @Put(':id')
//   @ApiResponse({ status: 200, type: RecommendationResponseDto })
//   async update(@Param('id') id: string, @Body() dto: UpdateRecommendationDto): Promise<RecommendationResponseDto> {
//     const rec = await this.service.update(+id, dto);

//     const comboPrice = rec.productosRecomendados.reduce(
//       (sum, prod) => sum + (prod.price ?? 0),
//       0,
//     );
    

//     return {
//       id: rec.id,
//       padecimiento: rec.padecimiento,
//       comentarios: rec.comentarios,
//       productosRecomendados: rec.productosRecomendados,
//       comboPrice,
//     };
//   }

//   @Delete(':id')
//   @ApiResponse({ status: 204, description: 'Recomendación eliminada' })
//   remove(@Param('id') id: string): Promise<void> {
//     return this.service.remove(+id);
//   }
// }




import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';

@ApiTags('Recomendaciones')
@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly service: RecommendationService) {}

  @Get()
  @ApiResponse({ status: 200, type: [RecommendationResponseDto] })
  findAll(): Promise<RecommendationResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: RecommendationResponseDto })
  async findOne(@Param('id') id: string): Promise<RecommendationResponseDto> {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, type: RecommendationResponseDto })
  async create(@Body() dto: CreateRecommendationDto): Promise<RecommendationResponseDto> {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: RecommendationResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateRecommendationDto): Promise<RecommendationResponseDto> {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Recomendación eliminada' })
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id);
  }
}
