import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export type TPostStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';

export interface PostProps {
  title: string;
  body: string;
  user_id: string;
  status: TPostStatus;
  created_at: Date;
  updated_at: Date;
}

export class Post extends Entity<PostProps> {
  static create(
    props: Optional<PostProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new Post(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
      },
      id,
    );
  }

  get title() {
    return this.props.title;
  }

  get body() {
    return this.props.body;
  }

  get user_id() {
    return this.props.user_id;
  }

  get status() {
    return this.props.status;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }
}
