import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { CompanyAddress } from './company-address';
import { CompanyService } from './company-service';
import { Optional } from '@core/common/entities/optional';

export interface CompanyProps {
  name: string;
  avatar: string | null;
  ratting: number;
  owner_id: string;
  about: string | null;
  address: CompanyAddress | null;
  services?: CompanyService[];
  created_at: Date;
  updated_at?: Date;
}

export class Company extends Entity<CompanyProps> {
  static create(
    props: Optional<CompanyProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    return new Company(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  get avatar() {
    return this.props.avatar;
  }

  get ratting() {
    return this.props.ratting;
  }

  get owner_id() {
    return this.props.owner_id;
  }
  get about() {
    return this.props.about;
  }
  get address() {
    return this.props.address;
  }
  get services() {
    return this.props.services;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
}
