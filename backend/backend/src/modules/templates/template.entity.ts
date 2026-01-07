import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  description: string;
}
