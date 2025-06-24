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
  address_id: string;
  website: string | null;
  email: string | null;
  phone: string | null;
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
  set name(name: string) {
    this.props.name = name;
  }
  get avatar() {
    return this.props.avatar;
  }
  set avatar(avatar: string | null) {
    this.props.avatar = avatar;
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
  set about(about: string | null) {
    this.props.about = about;
  }
  get email() {
    return this.props.email;
  }
  set email(email: string | null) {
    this.props.email = email;
  }
  get phone() {
    return this.props.phone;
  }
  set phone(phone: string | null) {
    this.props.phone = phone;
  }
  get website() {
    return this.props.website;
  }
  set website(website: string | null) {
    this.props.website = website;
  }
  get address_id() {
    return this.props.address_id;
  }
  get address() {
    return this.props.address;
  }
  set address(address: CompanyAddress | null) {
    this.props.address = address;
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
