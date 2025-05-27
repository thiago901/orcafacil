import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Category } from './category';

export interface CompanyServiceProps {
  name: string;
  category_name: string;
  company_id: string;
  category_id: string;
  created_at: Date;
  updated_at: Date | null;
  category?: Category;
}

export class CompanyService extends Entity<CompanyServiceProps> {
  static create(
    props: Optional<CompanyServiceProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new CompanyService(
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

  get company_id(): string {
    return this.props.company_id;
  }

  get category_id(): string {
    return this.props.category_id;
  }
  get category() {
    return this.props.category;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date | null {
    return this.props.updated_at;
  }
  get category_name(): string {
    return this.props.category_name;
  }
}
