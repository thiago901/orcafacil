import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface PostFileProps {
  post_id: UniqueEntityID;
  file_id: UniqueEntityID;
}

export class PostFile extends Entity<PostFileProps> {
  static create(props: PostFileProps, id?: UniqueEntityID) {
    return new PostFile(props, id);
  }

  get post_id() {
    return this.props.post_id;
  }

  get file_id() {
    return this.props.file_id;
  }
}
