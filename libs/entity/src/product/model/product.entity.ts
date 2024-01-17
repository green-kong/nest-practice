import { Money, ProductName } from '@lib/entity';
import {
  InvalidAuctionEndDateException,
  InvalidPricingException,
} from '@lib/exception';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTag } from '@lib/entity/product/model/product.tag.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => ProductName, { prefix: false })
  name: ProductName;

  @Column(() => Money, { prefix: 'start' })
  startPrice: Money;

  @Column(() => Money, { prefix: 'buyNow' })
  buyNowPrice: Money;

  @Column()
  auctionEndDate: Date;

  @OneToMany(() => ProductTag, (productCategory) => productCategory.product, {
    cascade: true,
    eager: true,
  })
  productCategories: ProductTag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static createNewProduct(
    name: string,
    startPrice: number,
    buyNowPrice: number,
    auctionEndDate: Date,
    productCategories: ProductTag[],
  ): Product {
    const newName = ProductName.from(name);
    const newStartPrice = Money.from(startPrice);
    const newBuyNowPrice = Money.from(buyNowPrice);
    this.validate(newStartPrice, newBuyNowPrice, auctionEndDate);
    const product = new Product();
    product.name = newName;
    product.startPrice = newStartPrice;
    product.buyNowPrice = newBuyNowPrice;
    product.auctionEndDate = auctionEndDate;
    product.productCategories = productCategories;
    return product;
  }

  private static validate(
    newStartPrice: Money,
    newBuyNowPrice: Money,
    auctionEndDate: Date,
  ) {
    if (newStartPrice.largerOrSameThan(newBuyNowPrice)) {
      throw new InvalidPricingException(
        newStartPrice.value,
        newBuyNowPrice.value,
      );
    }
    const now = new Date();
    if (auctionEndDate < now) {
      throw new InvalidAuctionEndDateException(auctionEndDate);
    }
  }

  getNameValue(): string {
    return this.name.value;
  }

  getStartPriceValue(): number {
    return this.startPrice.value;
  }

  getBuyNowPriceValue(): number {
    return this.buyNowPrice.value;
  }
}
