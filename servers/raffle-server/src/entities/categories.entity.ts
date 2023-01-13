import { IsNotEmpty } from 'class-validator';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column()
  @IsNotEmpty()
  name: string;
}
