import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export interface NotificationPropos {
  title: string;
  type: string;
  message: string;
  read: boolean;
  recipient_id: string;
  created_at: Date;
  updated_at: Date | null;
}

export class Notification extends Entity<NotificationPropos> {
  static create(
    props: Optional<NotificationPropos, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new Notification(
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
  get type() {
    return this.props.type;
  }
  get message() {
    return this.props.message;
  }
  get read() {
    return this.props.read;
  }
  set read(read: boolean) {
    this.props.read = read;
  }
  get recipient_id() {
    return this.props.recipient_id;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }
}
