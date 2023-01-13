import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import type { Item } from 'interfaces';
import { CategoryEntity } from './categories.entity';

@Entity()
export class ItemEntity extends BaseEntity implements Partial<Item> {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  type: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];

  @Column()
  rarity: string;

  @Column({
    nullable: true,
  })
  group: string;
}
