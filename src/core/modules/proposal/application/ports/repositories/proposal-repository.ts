import { Proposal } from '@core/modules/proposal/entities/proposal';

export abstract class ProposalRepository {
  abstract findByEstimateRequestId(
    estimateRequestId: number,
  ): Promise<Proposal[]>;
  abstract save(user: Proposal): Promise<void>;
}
