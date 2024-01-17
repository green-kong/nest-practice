import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Money } from '@lib/entity';

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column(() => Money, { prefix: 'bid' })
  bidPrice: Money;

  @CreateDateColumn()
  createdAt: Date;

  static create(productId: number, bidPrice: number): Bid {
    const newBidPrice = Money.from(bidPrice);
    const bid = new Bid();
    bid.productId = productId;
    bid.bidPrice = newBidPrice;
    return bid;
  }

  getBidPriceValue(): number {
    return this.bidPrice.value;
  }
}
