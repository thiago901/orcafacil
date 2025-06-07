import { Injectable, Logger } from '@nestjs/common';

import { EnvService } from '../infra/envs/env.service';

import {
  AddressFinderProvider,
  AddressFinderProviderResponse,
  AddressFinderProviderResponseProps,
} from '@core/common/application/ports/providers/address-finder';

@Injectable()
export class LocationiqProvider implements AddressFinderProvider {
  constructor(private readonly env: EnvService) {}

  async find({
    city,
    postal_code,
    state,
    street,
  }: AddressFinderProviderResponseProps): Promise<AddressFinderProviderResponse> {
    try {
      const q = `${postal_code}, ${city}, ${state},"Brasil", ${street},${postal_code}`;

      const url = `${this.env.get('LOCATION_IQ_URL')}/v1/search?key=${this.env.get('LOCATION_IQ_KEY')}&format=json&q=
      ${encodeURIComponent(q)}`;
      const respose = await fetch(url);
      const fmtJson = await respose.json();
      const result = !!fmtJson ? fmtJson[0] : [];
      return { lat: result?.lat, lon: result?.lon, place_id: result?.place_id };
    } catch (error) {
      Logger.error(error, LocationiqProvider.name);
      throw new Error(error);
    }
  }
}
