import { UniqueEntityID } from '@core/common/entities/unique-entity-id';
import {
  Estimate,
  EstimateCompanyProps,
  EstimateCustomerProps,
} from '@core/modules/estimate-request/entities/estimate';
import {
  EstimateItem,
  EstimateItemsTypeProps,
  EstimateItemsTypeUnitProps,
} from '@core/modules/estimate-request/entities/estimate-item';
import { WatchedEstimateItem } from '@core/modules/estimate-request/entities/watched-estimate-item';

import {
  Estimate as EstimatePrisma,
  EstimateItems as EstimateItemsPrisma,
} from '@prisma/client';

type Complete = EstimatePrisma & {
  estimate_items?: EstimateItemsPrisma[];
};
export class EstimateMapping {
  static toDomain({
    description,
    company,
    created_at,
    customer,
    expire_at,
    id,
    updated_at,
    total,
    company_id,
    estimate_items,
  }: Complete) {
    return Estimate.create(
      {
        description,
        created_at,
        company: company as EstimateCompanyProps,
        customer: customer as EstimateCustomerProps,
        expire_at,
        items: !!estimate_items
          ? new WatchedEstimateItem(
              estimate_items.map((item) =>
                EstimateItem.create({
                  description: item.description,
                  estimate_id: item.estimate_id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  total: item.total,
                  type: item.type as EstimateItemsTypeProps,
                  unit: item.unit as EstimateItemsTypeUnitProps,
                  created_at: item.created_at,
                  updated_at: item.updated_at,
                }),
              ),
            )
          : ([] as any),
        total,
        company_id,
        updated_at,
      },
      new UniqueEntityID(id),
    );
  }

  static toPrisma(database: Estimate, options?: any) {
    return {
      ...options,
      id: database.id.toString(),
      description: database.description,
      total: database.total,
      company: database.company,
      customer: database.customer,
      expire_at: database.expire_at,
      company_id: database.company_id,
      created_at: database.created_at,
      updated_at: database.updated_at,
    };
  }
}
