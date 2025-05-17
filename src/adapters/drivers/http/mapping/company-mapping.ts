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
  }: Company) {
    return {
      id: id.toString(),
      avatar,
      name,
      ratting,
      about,
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
        category_id: service.category_id.toString(),
      })),
    };
  }
}
