export type AddressFinderProviderResponseProps = {
  postal_code: string;
  street: string;
  state: string;
  city: string;
};
export type AddressFinderProviderResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};

export abstract class AddressFinderProvider {
  abstract find(
    data: AddressFinderProviderResponseProps,
  ): Promise<AddressFinderProviderResponse>;
}
