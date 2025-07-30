import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Proposal } from '@core/modules/proposal/entities/proposal';
import { EstimateRequestFile } from './estimate-request-file';
import { Optional } from '@core/common/entities/optional';
import { EstimateRequestMessage } from './estimate-request-message';
import { User } from '@core/modules/user/entities/user';

type AddressProp = {
  street: string;
  number: string;
  postal_code: string;
  neighborhood: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
};
export interface EstimateRequestProps {
  footage: number;
  name: string;
  phone: string;
  email: string;
  description: string;
  category: string;
  user_id: string;
  urgency: number;
  address: AddressProp;
  proposals?: Proposal[];
  messages?: EstimateRequestMessage[];
  user?: User | null;
  estimate_request_files?: EstimateRequestFile[];
  created_at: Date;
  updated_at: Date | null;
  finished_at: Date | null;
}

export class EstimateRequest extends Entity<EstimateRequestProps> {
  static create(
    props: Optional<EstimateRequestProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new EstimateRequest(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        updated_at: props.updated_at ?? new Date(),
      },
      id,
    );
  }

  get name() {
    return this.props.name;
  }

  get phone() {
    return this.props.phone;
  }
  set phone(phone: string) {
    this.props.phone = phone;
  }

  set email(email: string) {
    this.props.email = email;
  }
  get email() {
    return this.props.email;
  }
  get urgency() {
    return this.props.urgency;
  }

  get description() {
    return this.props.description;
  }

  get footage() {
    return this.props.footage;
  }

  get user_id() {
    return this.props.user_id;
  }
  get proposals() {
    return this.props.proposals;
  }
  get estimate_request_files() {
    return this.props.estimate_request_files;
  }
  get address() {
    return this.props.address;
  }
  get category() {
    return this.props.category;
  }
  get messages() {
    return this.props.messages;
  }
  get user() {
    return this.props.user;
  }

  get finished_at() {
    return this.props.finished_at;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
}
