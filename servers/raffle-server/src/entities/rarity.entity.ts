import { IsNotEmpty } from 'class-validator';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RarityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('identity', {
    name: 'rarity_id',
  })
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;
}
