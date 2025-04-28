import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { CompanyAddress } from './company-address';

export interface CompanyProps {
  name: string;
  avatar: string | null;
  ratting: number;
  owner_id: string;
  about: string | null;
  address: CompanyAddress | null;
}

export class Company extends Entity<CompanyProps> {
  static create(props: CompanyProps, id?: UniqueEntityID) {
    return new Company(props, id);
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
}
