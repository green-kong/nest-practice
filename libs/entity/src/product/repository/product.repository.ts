import { Product } from '@lib/entity';

export interface ProductRepository {
  save(product: Product): Promise<Product>;

  findById(id: number): Promise<Product>;

  deleteById(id: number): Promise<void>;
}
