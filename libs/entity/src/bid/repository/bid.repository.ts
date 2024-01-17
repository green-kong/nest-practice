import { Bid } from '@lib/entity/bid/model/bid.entity';

export interface BidRepository {
  save(bid: Bid): Promise<Bid>;

  findById(id: number): Promise<Bid>;

  findLastBidByProductId(productId: number): Promise<Bid>;
}
