// src/testimonials/testimonials.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsController } from './testimonials.controller';
import { Testimonial } from 'src/entities/testimonial.entity';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial]),FileUploadModule],
  controllers: [TestimonialsController],
  providers: [TestimonialsService],
  exports: [TestimonialsService],
})
export class TestimonialsModule {}


