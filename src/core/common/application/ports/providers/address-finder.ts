export type AddressFinderProviderResponseProps = {
  postal_code: string;
  street: string;
  state: string;
  city: string;
};
export type AddressFinderProviderResponse = {
  place_id: number;
  lat: string;
  lon: string;
};

export abstract class AddressFinderProvider {
  abstract find(
    data: AddressFinderProviderResponseProps,
  ): Promise<AddressFinderProviderResponse>;
}
