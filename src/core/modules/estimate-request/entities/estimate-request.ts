import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Proposal } from '@core/modules/proposal/entities/proposal';
import { EstimateRequestFile } from './estimate-request-file';

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
  user_id: string | null;
  address: AddressProp;
  proposals?: Proposal[];
  estimate_request_files?: EstimateRequestFile[];
}

export class EstimateRequest extends Entity<EstimateRequestProps> {
  static create(props: EstimateRequestProps, id?: UniqueEntityID) {
    return new EstimateRequest(props, id);
  }

  get name() {
    return this.props.name;
  }

  get phone() {
    return this.props.phone;
  }

  get email() {
    return this.props.email;
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
}
