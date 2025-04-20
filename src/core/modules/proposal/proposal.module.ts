import { Module } from '@nestjs/common';
import { ListProposalsByEstimateUseCase } from './application/use-case/list-proposals-by-estimate-use-case';
import { ListProposalsByCompanyUseCase } from './application/use-case/list-proposals-by-company-use-casey';
import { FindProposalsByIdUseCase } from './application/use-case/find-proposals-by-id-use-case';
import { CreateProposalUseCase } from './application/use-case/create-proposals-use-case';
import { ApproveProposalUseCase } from './application/use-case/approve-proposal-use-case ';
import { RejectProposalUseCase } from './application/use-case/reject-proposal-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListProposalsByEstimateUseCase,
    ListProposalsByCompanyUseCase,
    FindProposalsByIdUseCase,
    CreateProposalUseCase,
    ApproveProposalUseCase,
    RejectProposalUseCase,
  ],
  exports: [
    ListProposalsByEstimateUseCase,
    ListProposalsByCompanyUseCase,
    FindProposalsByIdUseCase,
    CreateProposalUseCase,
    ApproveProposalUseCase,
    RejectProposalUseCase,
  ],
})
export class ProposalModule {}
