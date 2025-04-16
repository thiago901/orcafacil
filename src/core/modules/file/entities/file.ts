import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface FileProps {
  name: string;
  type: string;
  created_at: Date;
}

export class File extends Entity<FileProps> {
  static create(props: FileProps, id?: UniqueEntityID) {
    return new File({ ...props, created_at: props.created_at ?? new Date() }, id);
  }

  get name() {
    return this.props.name;
  }

  get type() {
    return this.props.type;
  }

  get created_at() {
    return this.props.created_at;
  }
}
