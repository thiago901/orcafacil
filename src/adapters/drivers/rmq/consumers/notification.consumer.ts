import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, EventPattern } from '@nestjs/microservices';
import { SendEstimateCreateDTO } from './dtos/send-estimate-create.dto';

import { ListAllCompaniesUseCase } from '@core/modules/company/application/use-case/list-all-companies-use-case';
import { CreateBulkNotificationUseCase } from '@core/modules/notification/application/use-case/create-bulk-notification-use-case';

@Controller()
export class NotificationConsumer {
  constructor(
    private readonly listAllCompaniesUseCase: ListAllCompaniesUseCase,
    private readonly createBulkNotificationUseCase: CreateBulkNotificationUseCase,
  ) {}

  @EventPattern('estimate_request:created')
  async handelNotificationEstimate(
    @Payload()
    { category, estimate_request_id, location }: SendEstimateCreateDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const companies = await this.listAllCompaniesUseCase.execute({
        categories: [category],
        location,
      });
      if (companies.isLeft()) {
        channel.ack(originalMsg);
        return;
      }
      const notifications = companies.value.companies.map((company) => ({
        recipient_id: company.owner_id,
        title: 'Nova solicitação de orçamento',
        message: JSON.stringify({
          title: 'Nova solicitação de orçamento',
          estimate_request_id,
          text: 'Você recebeu uma nova solicitação de orçamento. Acesse o painel para visualizar os detalhes e responder ao cliente o quanto antes.',
        }),

        type: 'estimate_request:created',
      }));
      await this.createBulkNotificationUseCase.execute(notifications);

      channel.ack(originalMsg);
    } catch (error) {
      console.log('Error', error);

      throw error;

      // TODO: Deve lancar um erro apropriado
    }
  }
}
