import { Tag } from '@lib/entity';

export interface TagRepository {
  save(tag: Tag): Promise<Tag>;

  findById(id: number): Promise<Tag>;

  findByName(name: string): Promise<Tag>;

  deleteById(id: number): Promise<void>;
}
