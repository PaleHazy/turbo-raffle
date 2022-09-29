import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import type { Item } from 'interfaces';

@Entity()
export class ItemEntity extends BaseEntity implements Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsNotEmpty()
  valueInDollars: number;

  @Column()
  @IsNotEmpty()
  inStock: number;

  @Column()
  @IsNotEmpty()
  isSold: boolean;
}
