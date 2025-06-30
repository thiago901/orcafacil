import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { Optional } from '@core/common/entities/optional';

export interface CompanyReviewFileProps {
  company_review_id: string;
  url: string;
  created_at: Date;
}

export class CompanyReviewFile extends Entity<CompanyReviewFileProps> {
  static create(
    props: Optional<CompanyReviewFileProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    return new CompanyReviewFile(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );
  }

  get company_review_id() {
    return this.props.company_review_id;
  }

  get url() {
    return this.props.url;
  }

  get created_at() {
    return this.props.created_at;
  }
}
