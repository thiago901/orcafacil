import { Module } from '@nestjs/common';
import { ListProposalsByEstimateUseCase } from './application/use-case/list-proposals-by-estimate-use-case';
import { ListProposalsByCompanyUseCase } from './application/use-case/list-proposals-by-company-use-casey';
import { FindProposalsByIdUseCase } from './application/use-case/find-proposals-by-id-use-case';
import { CreateProposalUseCase } from './application/use-case/create-proposals-use-case';
import { ApproveProposalUseCase } from './application/use-case/approve-proposal-use-case ';
import { RejectProposalUseCase } from './application/use-case/reject-proposal-use-case';
import { WebSocketModule } from '@adapters/drivers/web-socket/web-socket.module';
import { ListProposalsByEstimateRequestCompanyUseCase } from './application/use-case/list-proposals-by-estimate-request-and-company-use-case';

@Module({
  imports: [WebSocketModule],
  controllers: [],
  providers: [
    ListProposalsByEstimateUseCase,
    ListProposalsByCompanyUseCase,
    FindProposalsByIdUseCase,
    CreateProposalUseCase,
    ApproveProposalUseCase,
    RejectProposalUseCase,
    ListProposalsByEstimateRequestCompanyUseCase,
  ],
  exports: [
    ListProposalsByEstimateUseCase,
    ListProposalsByCompanyUseCase,
    FindProposalsByIdUseCase,
    CreateProposalUseCase,
    ApproveProposalUseCase,
    RejectProposalUseCase,
    ListProposalsByEstimateRequestCompanyUseCase,
  ],
})
export class ProposalModule {}
