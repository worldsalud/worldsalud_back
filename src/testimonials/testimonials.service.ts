// src/testimonials/testimonials.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Testimonial } from 'src/entities/testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialRepository: Repository<Testimonial>,
  ) {}

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Testimonial> {
    const testimonial = await this.testimonialRepository.findOneBy({ id });
    if (!testimonial) {
      throw new NotFoundException('Testimonio no encontrado');
    }
    return testimonial;
  }

  async create(dto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = this.testimonialRepository.create(dto);
    return await this.testimonialRepository.save(testimonial);
  }

  async update(id: string, dto: UpdateTestimonialDto): Promise<Testimonial> {
    const testimonial = await this.findOne(id);
    const updated = Object.assign(testimonial, dto);
    return await this.testimonialRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const testimonial = await this.findOne(id);
    await this.testimonialRepository.remove(testimonial);
  }
}
