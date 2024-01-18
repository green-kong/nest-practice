import { Tag, TagRepository } from '@lib/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TypeormTagRepository implements TagRepository {
  constructor(@InjectRepository(Tag) private readonly tags: Repository<Tag>) {}

  async save(tag: Tag): Promise<Tag> {
    return await this.tags.save(tag);
  }

  async findById(id: number): Promise<Tag> {
    return await this.tags.findOneBy({ id });
  }

  async findAllByIds(ids: number[]): Promise<Tag[]> {
    return await this.tags
      .createQueryBuilder('tag')
      .where('tag.id in :ids', { ids })
      .getMany();
  }

  async findByName(name: string): Promise<Tag> {
    return await this.tags.findOneBy({ name });
  }

  async deleteById(id: number): Promise<void> {
    await this.tags.delete(id);
  }
}
