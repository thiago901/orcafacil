import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface EstimateRequestFileProps {
  url: string;
  estimate_request_id: string;
  created_at: Date;
}

export class EstimateRequestFile extends Entity<EstimateRequestFileProps> {
  static create(
    props: Optional<EstimateRequestFileProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    return new EstimateRequestFile(
      { ...props, created_at: props.created_at ?? new Date() },
      id,
    );
  }

  get url() {
    return this.props.url;
  }

  get estimate_request_id() {
    return this.props.estimate_request_id;
  }

  get created_at() {
    return this.props.created_at;
  }
}
