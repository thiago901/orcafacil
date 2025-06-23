import { Estimate } from '@core/modules/estimate-request/entities/estimate';

export class EstimateMapping {
  static toView({
    company,
    company_id,
    created_at,
    customer,
    description,
    expire_at,
    id,
    items,
    total,
    updated_at,
  }: Estimate) {
    return {
      id: id.toString(),
      company: {
        id: company.id.toString(),
        address: {
          city: company.address.city,
          neighborhood: company.address.neighborhood,
          number: company.address.number,
          postal_code: company.address.postal_code,
          state: company.address.state,
          street: company.address.street,
        },
        avatar: company.avatar,
        document: company.document,
        email: company.email,
        name: company.name,
        phone: company.phone,
      },
      company_id,
      created_at,
      customer,
      description,
      expire_at,
      items: !!items?.currentItems
        ? items.currentItems.map((item) => ({
            id: item.id.toString(),
            description: item.description,
            estimate_id: item.estimate_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
            type: item.type,
            unit: item.unit,
            created_at: item.created_at,
            updated_at: item.updated_at,
          }))
        : [],
      total,
      updated_at,
    };
  }
}
