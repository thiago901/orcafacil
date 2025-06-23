import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../Interceptors/custom-logger-routes';

import { GetAllEstimateByCompanyUseCase } from '@core/modules/estimate-request/application/use-case/get-all-estimate-by-company-use-case';
import { EstimateMapping } from '../mapping/estimate-mapping';
import { GetAllEstimateByEstimateRequestUseCase } from '@core/modules/estimate-request/application/use-case/get-all-estimate-by-estimate-request-use-case';
import { GetAllEstimateByIdUseCase } from '@core/modules/estimate-request/application/use-case/get-all-estimate-by-id-use-case';

@ApiTags('Estimates')
@ApiBearerAuth()
@Controller('/estimates')
@UseInterceptors(LoggingInterceptor)
export class EstimateController {
  constructor(
    private readonly getAllEstimateByCompanyUseCase: GetAllEstimateByCompanyUseCase,
    private readonly getAllEstimateByEstimateRequestUseCase: GetAllEstimateByEstimateRequestUseCase,
    private readonly getAllEstimateByIdUseCase: GetAllEstimateByIdUseCase,
  ) {}

  @Get('/')
  @HttpCode(201)
  async create() {
    const result = await this.getAllEstimateByCompanyUseCase.execute({
      company_id: '',
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: result.value.estimates.map(EstimateMapping.toView),
    };
  }
  @Get('company/:company_id')
  @HttpCode(201)
  async getAllByCompany(@Param('company_id') company_id: string) {
    const result = await this.getAllEstimateByCompanyUseCase.execute({
      company_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: result.value.estimates.map(EstimateMapping.toView),
    };
  }
  @Get('estimate_request/:estimate_request_id')
  @HttpCode(201)
  async getAllByEstimateRequest(
    @Param('estimate_request_id') estimate_request_id: string,
  ) {
    const result = await this.getAllEstimateByEstimateRequestUseCase.execute({
      estimate_request_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: result.value.estimates.map(EstimateMapping.toView),
    };
  }
  @Get('/:estimate_id')
  @HttpCode(201)
  async getAllById(@Param('estimate_id') estimate_id: string) {
    const result = await this.getAllEstimateByIdUseCase.execute({
      estimate_id,
    });
    if (result.isLeft()) {
      throw new HttpException('result.value', HttpStatus.BAD_REQUEST);
    }
    return {
      result: EstimateMapping.toView(result.value.estimate),
    };
  }
}
