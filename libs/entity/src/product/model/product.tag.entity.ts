import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '@lib/entity';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product: Product) => product.productTags, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  tagId: number;

  static from(tagId: number): ProductTag {
    const productTag = new ProductTag();
    productTag.tagId = tagId;
    return productTag;
  }
}
