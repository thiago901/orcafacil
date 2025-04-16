import { Module } from '@nestjs/common';
import { ListProposalsByEstimateUseCase } from './application/use-case/list-proposals-by-estimate-use-case';
import { ListProposalsByCompanyUseCase } from './application/use-case/list-proposals-by-company-use-casey';
import { FindProposalsByIdUseCase } from './application/use-case/find-proposals-by-id-use-case';
import { CreateProposalUseCase } from './application/use-case/create-proposals-use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListProposalsByEstimateUseCase,
    ListProposalsByCompanyUseCase,
    FindProposalsByIdUseCase,
    CreateProposalUseCase,
  ],
  exports: [
    ListProposalsByEstimateUseCase,
    ListProposalsByCompanyUseCase,
    FindProposalsByIdUseCase,
    CreateProposalUseCase,
  ],
})
export class ProposalModule {}
