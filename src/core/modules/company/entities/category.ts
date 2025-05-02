import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface CategoryProps {
  name: string;

  created_at: Date;
  updated_at: Date | null;
}

export class Category extends Entity<CategoryProps> {
  static create(
    props: Optional<CategoryProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new Category(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? null,
      },
      id,
    );
  }

  get name(): string {
    return this.props.name;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date | null {
    return this.props.updated_at;
  }
}
