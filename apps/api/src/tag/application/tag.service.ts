import { Inject, Injectable } from '@nestjs/common';
import { Tag, TagRepository } from '@lib/entity';

export class TagCreatDto {
  name: string;

  toTag(): Tag {
    return Tag.from(this.name);
  }
}

@Injectable()
export class TagService {
  constructor(
    @Inject('tagRepository')
    private readonly tagRepository: TagRepository,
  ) {}

  async saveTag(tagCreateDto: TagCreatDto): Promise<number> {
    const tag = tagCreateDto.toTag();
    const foundTag = await this.tagRepository.findByName(tag.name);
    if(foundTag) {
      return foundTag.id;
    }
    const savedTag = await this.tagRepository.save(tag);
    return savedTag.id;
  }
}
