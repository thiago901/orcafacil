import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import {
  EstimateItem,
  EstimateItemsTypeProps,
  EstimateItemsTypeUnitProps,
} from '@core/modules/estimate-request/entities/estimate-item';

import { EstimateItems as EstimateItemsPrisma } from '@prisma/client';

type Complete = EstimateItemsPrisma & {};
export class EstimateItemsMapping {
  static toDomain({
    description,
    estimate_id,
    name,
    price,
    quantity,
    total,
    type,
    unit,
    created_at,
    updated_at,
    id,
  }: Complete) {
    return EstimateItem.create(
      {
        description,
        estimate_id,
        name,
        price,
        quantity,
        total,
        type: type as EstimateItemsTypeProps,
        unit: unit as EstimateItemsTypeUnitProps,
        created_at,
        updated_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(database: EstimateItem, options?: any) {
    return {
      ...options,
      id: database.id.toString(),
      created_at: database.created_at,
      description: database.description,
      name: database.name,
      price: database.price,
      quantity: database.quantity,
      total: database.total,
      type: database.type,
      unit: database.unit,
      updated_at: database.updated_at,
    };
  }
}
