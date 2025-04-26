import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('float')
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @Column()
  type: 'text' | 'video'; 

  @Column()
  mediaUrl: string;

  @Column({ default: true })
  verified: boolean;
}
