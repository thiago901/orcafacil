import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { ListProposalsByEstimateUseCase } from '@core/modules/proposal/application/use-case/list-proposals-by-estimate-use-case';
import { ListProposalsByCompanyUseCase } from '@core/modules/proposal/application/use-case/list-proposals-by-company-use-casey';
import { FindProposalsByIdUseCase } from '@core/modules/proposal/application/use-case/find-proposals-by-id-use-case';
import { CreateProposalUseCase } from '@core/modules/proposal/application/use-case/create-proposals-use-case';
import {
  CreateProposalProps,
  createProposalSchema,
} from './validations/create-proposal.validate';
import { ProposalMapping } from '../mapping/proposal-mapping';
import { RejectProposalUseCase } from '@core/modules/proposal/application/use-case/reject-proposal-use-case';
import { ApproveProposalUseCase } from '@core/modules/proposal/application/use-case/approve-proposal-use-case ';
import { CurrentUser } from '@adapters/drivens/infra/auth/current-user-decorator';
import { TokenPayload } from '@adapters/drivens/infra/auth/jwt.strategy';

@ApiTags('Proposal')
@ApiBearerAuth()
@Controller('/proposals')
@UseInterceptors(LoggingInterceptor)
export class ProposalController {
  constructor(
    private readonly listProposalsByEstimateUseCase: ListProposalsByEstimateUseCase,
    private readonly listProposalsByCompanyUseCase: ListProposalsByCompanyUseCase,
    private readonly findProposalsByIdUseCase: FindProposalsByIdUseCase,
    private readonly createProposalUseCase: CreateProposalUseCase,
    private readonly rejectProposalUseCase: RejectProposalUseCase,
    private readonly approveProposalUseCase: ApproveProposalUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createProposalSchema))
  async create(
    @Body() body: CreateProposalProps,
    @CurrentUser() user: TokenPayload,
  ) {
    const result = await this.createProposalUseCase.execute({
      ...body,
      user_id: user.sub,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return { result: ProposalMapping.toView(result.value.proposal) };
  }

  @Get('/:id')
  @HttpCode(200)
  async findById(@Param('id') id: string) {
    const result = await this.findProposalsByIdUseCase.execute({ id });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.NOT_FOUND);
    }
    return { result: ProposalMapping.toView(result.value.proposal) };
  }

  @Get('/company/:company_id')
  @HttpCode(200)
  async listAllByCompany(@Param('company_id') company_id: string) {
    const result = await this.listProposalsByCompanyUseCase.execute({
      company_id,
    });
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { result: result.value.proposals.map(ProposalMapping.toView) };
  }
  @Get('/estimate/:estimate_id')
  @HttpCode(200)
  async listAllByEstimateId(@Param('estimate_id') estimate_id: string) {
    const result = await this.listProposalsByEstimateUseCase.execute({
      estimate_requestid: estimate_id,
    });
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { result: result.value.proposals.map(ProposalMapping.toView) };
  }
  @Patch('/:id/reject')
  @HttpCode(200)
  async rejectProposal(@Param('id') id: string) {
    const result = await this.rejectProposalUseCase.execute({
      id,
    });
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }
  @Patch('/:id/approve')
  @HttpCode(200)
  async aproveProposal(@Param('id') id: string) {
    const result = await this.approveProposalUseCase.execute({
      id,
    });
    if (result.isLeft()) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return;
  }
}
