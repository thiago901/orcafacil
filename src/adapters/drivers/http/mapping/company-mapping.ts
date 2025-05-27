import { Company } from '@core/modules/company/entities/company';

export class CompanyMapping {
  static toView({
    id,
    avatar,
    about,
    name,
    ratting,
    address,
    services,
    phone,
    website,
    email,
    created_at,
  }: Company) {
    return {
      id: id.toString(),
      avatar,
      name,
      ratting,
      about,
      created_at,
      phone,
      website,
      email,
      address: {
        id: address?.id.toString(),
        address: address?.address,
        city: address?.city,
        country: address?.country,
        state: address?.state,
        zip: address?.zip,
        latitude: address?.latitude,
        longitude: address?.longitude,
      },
      services: services?.map((service) => ({
        id: service.id.toString(),
        name: service.name,
        category_name: service.category_name,
        category_id: service.category_id.toString(),
      })),
    };
  }
}
