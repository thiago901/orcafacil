import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface TagProps {
  name: string;
  post_id: UniqueEntityID;
}

export class Tag extends Entity<TagProps> {
  static create(props: TagProps, id?: UniqueEntityID) {
    return new Tag(props, id);
  }

  get name() {
    return this.props.name;
  }

  get post_id() {
    return this.props.post_id;
  }
}
