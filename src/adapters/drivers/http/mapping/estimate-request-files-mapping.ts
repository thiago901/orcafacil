import { EstimateRequestFile } from '@core/modules/estimate-request/entities/estimate-request-file';

export class EstimateRequestFilesMapping {
  static toView({
    id,
    created_at,

    estimate_request_id,
    url,
  }: EstimateRequestFile) {
    return {
      id: id.toString(),
      created_at,

      estimate_request_id,
      url,
    };
  }
}
