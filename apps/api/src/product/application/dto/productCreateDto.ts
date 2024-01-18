import { Product, ProductTag } from '@lib/entity';

export class ProductCreateDto {
  name: string;
  startPrice: number;
  buyNowPrice: number;
  auctionEndDate: Date;
  tagIds: number[];

  toProduct(tagIds: number[]): Product {
    const productTags = tagIds.map(ProductTag.from);
    return Product.createNewProduct(
      this.name,
      this.startPrice,
      this.buyNowPrice,
      this.auctionEndDate,
      productTags,
    );
  }
}
