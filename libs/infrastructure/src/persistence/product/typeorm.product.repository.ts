import { Product, ProductRepository } from '@lib/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TypeormProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async save(product: Product): Promise<Product> {
    return await this.products.save(product);
  }

  async findById(id: number): Promise<Product> {
    return await this.products.findOneBy({ id });
  }

  async deleteById(id: number): Promise<void> {
    await this.products.delete({ id });
  }
}
