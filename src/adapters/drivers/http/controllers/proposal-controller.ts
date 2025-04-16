import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { Public } from '@adapters/drivens/infra/auth/public';

import { ListProposalsByEstimateUseCase } from '@core/modules/proposal/application/use-case/list-proposals-by-estimate-use-case';
import { ListProposalsByCompanyUseCase } from '@core/modules/proposal/application/use-case/list-proposals-by-company-use-casey';
import { FindProposalsByIdUseCase } from '@core/modules/proposal/application/use-case/find-proposals-by-id-use-case';
import { CreateProposalUseCase } from '@core/modules/proposal/application/use-case/create-proposals-use-case';
import {
  CreateProposalProps,
  createProposalSchema,
} from './validations/create-proposal.validate';
import { ProposalMapping } from '../mapping/proposal-mapping';

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
  ) {}

  @Post('')
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createProposalSchema))
  async create(@Body() body: CreateProposalProps) {
    const result = await this.createProposalUseCase.execute(body);
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
}
