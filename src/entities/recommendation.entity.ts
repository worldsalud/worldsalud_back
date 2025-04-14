import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  padecimiento: string;

  @Column({ nullable: true, type: 'text' })
  comentarios: string;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  productosRecomendados: Product[];
}
