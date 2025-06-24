export interface SendEstimateCreateDTO {
  category: string;
  estimate_request_id: string;
  location?: {
    lat: string;
    long: string;
    meters: number;
  };
}
