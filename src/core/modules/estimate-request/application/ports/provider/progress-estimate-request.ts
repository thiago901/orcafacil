import { Either } from '@core/common/entities/either';
import {
  ProgressEstimateRequest,
  ProgressEstimateRequestType,
} from '@core/modules/estimate-request/entities/progress-estimate-request';

export interface RequestProps {
  description: string;
  estimate_request_id: string;
  title: string;
  type: ProgressEstimateRequestType;
  props: any;
  proposal_id: string;
}

export type ResponseProps = Either<
  null,
  {
    progressEstimateRequest: ProgressEstimateRequest;
  }
>;

export abstract class ProgressEstimateRequestProvider {
  abstract execute(data: RequestProps): Promise<ResponseProps>;
}
