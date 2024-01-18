import { Module } from '@nestjs/common';
import { BidService } from './application/bid.service';

@Module({
  providers: [BidService]
})
export class BidModule {}
