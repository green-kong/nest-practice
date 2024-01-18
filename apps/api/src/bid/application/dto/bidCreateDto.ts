export class BidCreateDto {
  productId: number;
  bidPrice: number;

  constructor(productId: number, bidPrice: number) {
    this.productId = productId;
    this.bidPrice = bidPrice;
  }
}
