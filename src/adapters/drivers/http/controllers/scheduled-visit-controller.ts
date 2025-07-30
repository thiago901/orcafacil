// scheduled-visit.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoggingInterceptor } from '../interceptors/custom-logger-routes';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

import {
  CreateScheduledVisitDto,
  createScheduledVisitSchema,
} from './validations/scheduled-visit.validate';
import { CreateScheduledVisitUseCase } from '@core/modules/scheduled-visit/application/use-case/create-schedule-visit-use-case';
import { ConfirmScheduledVisitUseCase } from '@core/modules/scheduled-visit/application/use-case/confirm-scheduled-visit-use-case';
import { SuggestNewDateUseCase } from '@core/modules/scheduled-visit/application/use-case/suggest-new-date-use-case';
import { GetScheduledVisitByIdUseCase } from '@core/modules/scheduled-visit/application/use-case/get-scheduled-visit-by-id.use-case';
import { ListPendingVisitsByCompanyUseCase } from '@core/modules/scheduled-visit/application/use-case/list-pending-visits-by-company.use-case';
import { FinishedVisitUseCase } from '@core/modules/scheduled-visit/application/use-case/finished-visit-use-case';
import { ScheduledVisitMapping } from '../mapping/schedule-visit-mapping';

@ApiTags('ScheduledVisits')
@ApiBearerAuth()
@Controller('/scheduled-visits')
@UseInterceptors(LoggingInterceptor)
export class ScheduledVisitController {
  constructor(
    private readonly createVisitUseCase: CreateScheduledVisitUseCase,
    private readonly confirmVisitUseCase: ConfirmScheduledVisitUseCase,
    private readonly suggestVisitUseCase: SuggestNewDateUseCase,
    private readonly getVisitByIdUseCase: GetScheduledVisitByIdUseCase,
    private readonly listPendingUseCase: ListPendingVisitsByCompanyUseCase,
    private readonly listSuggestedUseCase: ListPendingVisitsByCompanyUseCase,
    private readonly finishedVisitUseCase: FinishedVisitUseCase,
  ) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createScheduledVisitSchema))
  async create(@Body() body: CreateScheduledVisitDto) {
    const {
      company_id,
      customer_id,
      estimate_request_id,
      scheduled_at,
      notes,
      proposal_id,
    } = body;
    const result = await this.createVisitUseCase.execute({
      company_id,
      customer_id,
      estimate_request_id,
      scheduled_at,
      notes,
      proposal_id,
    });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }

    return { result: result.value.visit };
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const result = await this.getVisitByIdUseCase.execute({ id });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.NOT_FOUND);
    }

    return { result: result.value.visit };
  }

  @Get('/company/:company_id')
  async listPending(@Param('company_id') company_id: string) {
    const result = await this.listPendingUseCase.execute({ company_id });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }

    return { result: result.value.visits.map(ScheduledVisitMapping.toView) };
  }

  @Get('/customer/:customer_id/suggestions')
  async listSuggestions(@Param('customer_id') customer_id: string) {
    const result = await this.listSuggestedUseCase.execute({
      company_id: customer_id,
    });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }

    return { result: result.value.visits };
  }

  @Patch('/:id/confirm')
  async confirm(@Param('id') id: string) {
    const result = await this.confirmVisitUseCase.execute({ visit_id: id });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }

    return { result: ScheduledVisitMapping.toView(result.value.visit) };
  }

  @Patch('/:id/suggest-new-date/:date')
  async suggestNewDate(@Param('id') id: string, @Param('date') date: string) {
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }

    const result = await this.suggestVisitUseCase.execute({
      visit_id: id,
      suggested_at: newDate,
      is_customer: false,
    });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }

    return { result: result.value.visit };
  }
  @Patch('/:id/suggest-new-date/:date/customer')
  async suggestNewDateCustomer(
    @Param('id') id: string,
    @Param('date') date: string,
  ) {
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }

    const result = await this.suggestVisitUseCase.execute({
      visit_id: id,
      suggested_at: newDate,
      is_customer: true,
    });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }

    return { result: result.value.visit };
  }
  @Post('/:id/complete')
  async finisedVisit(@Param('id') id: string) {
    const result = await this.finishedVisitUseCase.execute({
      visit_id: id,
    });

    if (result.isLeft()) {
      throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST);
    }

    return { result: result.value.visit };
  }
}
