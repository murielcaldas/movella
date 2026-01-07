import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sites')
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ unique: true })
  subdomain: string;

  @Column()
  business_name: string;

  @Column({ nullable: true })
  business_category: string;

  @Column({ nullable: true })
  business_city: string;

  @Column()
  whatsapp: string;

  @Column({ nullable: true })
  template_id: number;

  @Column({ default: false })
  is_published: boolean;

  @Column({ type: 'json', nullable: true })
  settings: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
