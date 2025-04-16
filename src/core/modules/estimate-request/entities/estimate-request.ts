import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import { Optional } from '@core/common/entities/optional';

export interface EstimateRequestProps {
  footage: number;
  name: string;
  phone: string;
  email: string;
  description: string;
  user_id: string;
}

export class EstimateRequest extends Entity<EstimateRequestProps> {
  static create(
    props: EstimateRequestProps,
    id?: UniqueEntityID,
  ) {
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
}
