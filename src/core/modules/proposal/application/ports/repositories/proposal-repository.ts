import { Proposal } from '@core/modules/proposal/entities/proposal';

export type ProposalRepositoryOptions = {
  relations?: any;
};
export abstract class ProposalRepository {
  abstract findByEstimateRequestId(
    estimateRequestId: string,
  ): Promise<Proposal[]>;
  abstract findByCompanyId(company_id: string): Promise<Proposal[]>;
  abstract findById(
    id: string,
    options?: ProposalRepositoryOptions,
  ): Promise<Proposal | null>;
  abstract save(user: Proposal): Promise<void>;
  abstract create(user: Proposal): Promise<void>;
}
