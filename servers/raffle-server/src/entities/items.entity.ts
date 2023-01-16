import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, JoinColumn } from 'typeorm';
import type { Item } from 'interfaces';
import { CategoryEntity } from './categories.entity';

@Entity('items')
export class ItemEntity extends BaseEntity implements Partial<Item> {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  type: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @RelationId((item: ItemEntity) => item.category)
  categoryId: string;

  @Column()
  rarity: string;

  @Column({
    nullable: true,
  })
  group: string;
}
