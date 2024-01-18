import { Bid, Money, ProductName, ProductTag } from '@lib/entity';
import {
  ClosedAuctionProduct,
  InvalidAuctionEndDateException,
  InvalidPricingException,
  ProductIdIsNotMatched,
  SmallerThanMinimumBidPrice,
} from '@lib/exception';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  productTags: ProductTag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static createNewProduct(
    name: string,
    startPrice: number,
    buyNowPrice: number,
    auctionEndDate: Date,
    productTags: ProductTag[],
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
    product.productTags = productTags;
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

  createBid(productId: number, price: number) {
    const bidPrice = Money.from(price);
    this.validateBidCreation(productId, bidPrice);
    return Bid.create(productId, price);
  }

  private validateBidCreation(productId: number, bidPrice: Money) {
    const now = new Date();
    if (this.auctionEndDate < now) {
      throw new ClosedAuctionProduct(this.id);
    }
    if (this.id !== productId) {
      throw new ProductIdIsNotMatched(this.id, productId);
    }

    if (!bidPrice.largerOrSameThan(this.startPrice)) {
      throw new SmallerThanMinimumBidPrice(
        this.getStartPriceValue(),
        bidPrice.value,
      );
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
