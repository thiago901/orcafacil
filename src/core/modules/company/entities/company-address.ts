import { Entity } from '@core/common/entities/entity';
import { Optional } from '@core/common/entities/optional';
import { UniqueEntityID } from '@core/common/entities/unique-entity-id';

export interface CompanyAddressProps {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  latitude: number;
  longitude: number;
  created_at: Date;
  updated_at: Date | null;
}

export class CompanyAddress extends Entity<CompanyAddressProps> {
  static create(
    props: Optional<CompanyAddressProps, 'created_at' | 'updated_at'>,
    id?: UniqueEntityID,
  ) {
    return new CompanyAddress(
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

  get address(): string {
    return this.props.address;
  }

  get city(): string {
    return this.props.city;
  }

  get state(): string {
    return this.props.state;
  }

  get country(): string {
    return this.props.country;
  }

  get zip(): string {
    return this.props.zip;
  }

  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date | null {
    return this.props.updated_at;
  }
}
