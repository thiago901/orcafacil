import { Module } from '@nestjs/common';
import { AcceptSuggestedDateUseCase } from './application/use-case/accept-suggested-date-use-case';
import { CancelScheduledVisitUseCase } from './application/use-case/cancel-scheduled-visit-use-case';
import { SuggestNewDateUseCase } from './application/use-case/suggest-new-date-use-case';
import { CreateScheduledVisitUseCase } from './application/use-case/create-schedule-visit-use-case';
import { ConfirmScheduledVisitUseCase } from './application/use-case/confirm-scheduled-visit-use-case';
import { ListPendingVisitsByCompanyUseCase } from './application/use-case/list-pending-visits-by-company.use-case';
import { GetScheduledVisitByIdUseCase } from './application/use-case/get-scheduled-visit-by-id.use-case';
import { ListSuggestedVisitsByCustomerUseCase } from './application/use-case/list-suggested-visits-by-customer.use-case';
import { FinishedVisitUseCase } from './application/use-case/finished-visit-use-case';

@Module({
  imports: [],

  providers: [
    AcceptSuggestedDateUseCase,
    CancelScheduledVisitUseCase,
    ConfirmScheduledVisitUseCase,
    CreateScheduledVisitUseCase,
    SuggestNewDateUseCase,
    ListPendingVisitsByCompanyUseCase,
    GetScheduledVisitByIdUseCase,
    ListSuggestedVisitsByCustomerUseCase,
    FinishedVisitUseCase,
  ],
  exports: [
    AcceptSuggestedDateUseCase,
    CancelScheduledVisitUseCase,
    ConfirmScheduledVisitUseCase,
    CreateScheduledVisitUseCase,
    SuggestNewDateUseCase,
    ListPendingVisitsByCompanyUseCase,
    GetScheduledVisitByIdUseCase,
    ListSuggestedVisitsByCustomerUseCase,
    FinishedVisitUseCase,
  ],
})
export class ScheduledVisitModule {}
