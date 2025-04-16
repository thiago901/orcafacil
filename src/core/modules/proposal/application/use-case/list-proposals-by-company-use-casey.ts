import { Proposal } from '@core/modules/proposal/entities/proposal';
import { ProposalRepository } from '../ports/repositories/proposal-repository';

import { Injectable } from '@nestjs/common';
import { Either, right } from '@core/common/entities/either';

interface RequestProps {
  company_id: string;
}

type ResponseProps = Either<
  null,
  {
    proposals: Proposal[];
  }
>;

@Injectable()
export class ListProposalsByCompanyUseCase {
  constructor(private readonly proposalRepository: ProposalRepository) {}

  async execute({ company_id }: RequestProps): Promise<ResponseProps> {
    const proposals = await this.proposalRepository.findByCompanyId(company_id);

    return right({ proposals });
  }
}
