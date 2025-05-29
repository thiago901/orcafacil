import { Injectable } from '@nestjs/common';

import { EnvService } from '../infra/envs/env.service';

import {
  AddressFinderProvider,
  AddressFinderProviderResponse,
  AddressFinderProviderResponseProps,
} from '@core/common/application/ports/providers/address-finder';

@Injectable()
export class NominatimAddressFinderProvider implements AddressFinderProvider {
  constructor(private readonly env: EnvService) {}

  async find({
    city,
    postal_code,
    state,
    street,
  }: AddressFinderProviderResponseProps): Promise<AddressFinderProviderResponse> {
    const q = `${street}, ${city}, ${state}, ${postal_code}`;

    const url = `${this.env.get('NOMINATIM_POSTAL_CODE')}/search?format=json&q=${encodeURIComponent(q)}`;
    const respose = await fetch(url, {
      headers: { 'User-Agent': 'SeuProjeto/1.0 (seu-email@dominio.com)' },
    });
    const fmtJson = await respose.json();

    return fmtJson[0];
  }
}
