import { Inject, Injectable } from '@nestjs/common';
import { Product, ProductRepository, TagRepository } from '@lib/entity';
import { ProductCreateDto } from './dto/productCreateDto';
import { NotExistedTagException } from '@lib/exception/tag/not.existed.tag.exception';

@Injectable()
export class ProductService {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
    @Inject('tagRepository')
    private readonly tagRepository: TagRepository,
  ) {}

  async saveProduct(productCreateDto: ProductCreateDto) {
    const tagIds = productCreateDto.tagIds;
    await this.validate(tagIds);
    const product: Product = productCreateDto.toProduct(tagIds);
    const savedProduct = await this.productRepository.save(product);
    return product.id;
  }

  private async validate(tagIds: number[]) {
    const tags = await this.tagRepository.findAllByIds(tagIds);
    if (tags.length !== tagIds.length) {
      throw new NotExistedTagException();
    }
  }
}
