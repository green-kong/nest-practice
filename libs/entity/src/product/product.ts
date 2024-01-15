import { Money, ProductName } from '@lib/entity';
import { InvalidAuctionEndDateException, InvalidPricingException } from '@lib/exception';

export class Product {
  private _id: number;
  private _name: ProductName;
  private _startPrice: Money;
  private _buyNowPrice: Money;
  private _auctionEndDate: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor() {}

  static createNewProduct(
    name: string,
    startPrice: number,
    buyNowPrice: number,
    auctionEndDate: Date,
  ): Product {
    const newName = ProductName.from(name);
    const newStartPrice = Money.from(startPrice);
    const newBuyNowPrice = Money.from(buyNowPrice);
    this.validate(newStartPrice, newBuyNowPrice, auctionEndDate);
    const product = new Product();
    product._name = newName;
    product._startPrice = newStartPrice;
    product._buyNowPrice = newBuyNowPrice;
    product._auctionEndDate = auctionEndDate;
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

  get id(): number {
    return this._id;
  }

  get name(): ProductName {
    return this._name;
  }

  get startPrice(): Money {
    return this._startPrice;
  }

  get buyNowPrice(): Money {
    return this._buyNowPrice;
  }

  get auctionEndDate(): Date {
    return this._auctionEndDate;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
