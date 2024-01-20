import { Bid } from '@lib/entity/bid/model/bid.entity';

export interface ValidateBidService {
  validateBidCreate(newBid: Bid, productId: number): Promise<void>;
}
