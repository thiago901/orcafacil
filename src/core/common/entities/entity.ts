import { UniqueEntityID } from './unique-entity-id';

export class Entity<Props> {
  protected _id: UniqueEntityID;
  protected props: Props;

  constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();

    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
