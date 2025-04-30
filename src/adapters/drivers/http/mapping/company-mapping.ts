import { Company } from '@core/modules/company/entities/company';

export class CompanyMapping {
  static toView({ id, avatar, about, name, ratting, address }: Company) {
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
      },
    };
  }
}
