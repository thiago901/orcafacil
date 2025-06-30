import { Entity } from '@core/common/entities/entity';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

import { Optional } from '@core/common/entities/optional';

import { User } from '@core/modules/user/entities/user';
import { Company } from './company';
import { CompanyReviewFile } from './company-review-file';

export interface CompanyReviewProps {
  rating: number;
  title: string;
  comment?: string | null;
  company_id: string;
  user_id: string;
  files?: CompanyReviewFile[];
  created_at: Date;

  company?: Company;
  user?: User;
}

export class CompanyReview extends Entity<CompanyReviewProps> {
  static create(
    props: Optional<CompanyReviewProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    return new CompanyReview(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );
  }

  get comment() {
    return this.props.comment;
  }

  get rating() {
    return this.props.rating;
  }
  get title() {
    return this.props.title;
  }
  get company_id() {
    return this.props.company_id;
  }
  get user_id() {
    return this.props.user_id;
  }
  get files() {
    return this.props.files;
  }
  get created_at() {
    return this.props.created_at;
  }
}
