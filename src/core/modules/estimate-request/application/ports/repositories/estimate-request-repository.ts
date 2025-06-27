import { EstimateRequest } from '@core/modules/estimate-request/entities/estimate-request';

export type EstimateRequestRepositoryOptions = {
  omit?: {
    [key: string]: boolean;
  };
};
export type GetAllByGeoLocationProps = {
  lat: number;
  long: number;
  radius_in_meters: number;
  category?: string[];
  options?: EstimateRequestRepositoryOptions;
};

export abstract class EstimateRequestRepository {
  abstract save(user: EstimateRequest): Promise<void>;
  abstract findByUserId(user_id: string): Promise<EstimateRequest[]>;
  abstract getAllByGeoLocation(
    data: GetAllByGeoLocationProps,
  ): Promise<EstimateRequest[]>;
  abstract findById(id: string): Promise<EstimateRequest | null>;
}
