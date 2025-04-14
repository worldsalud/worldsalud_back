// src/modules/recommendation/recommendation.controller.ts
import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';
import { Delete } from '@nestjs/common';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/UpdateRecommendationDto';


@ApiTags('Recomendaciones')
@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly service: RecommendationService) {}

  @Get()
  @ApiResponse({ status: 200, type: [RecommendationResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: RecommendationResponseDto })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @ApiResponse({ status: 201, type: RecommendationResponseDto })
  create(@Body() dto: CreateRecommendationDto) {
    return this.service.create(dto);
  }


  @Put(':id')
@ApiResponse({ status: 200, type: RecommendationResponseDto })
update(@Param('id') id: string, @Body() dto: UpdateRecommendationDto) {
  return this.service.update(+id, dto);
}

@Delete(':id')
@ApiResponse({ status: 204, description: 'Recomendación eliminada' })
remove(@Param('id') id: string) {
  return this.service.remove(+id);
}
}
