import { Tag } from '@lib/entity';

export class TagCreatDto {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  toTag(): Tag {
    return Tag.from(this.name);
  }
}
