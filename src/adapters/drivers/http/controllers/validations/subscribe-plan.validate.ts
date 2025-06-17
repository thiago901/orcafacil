import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const subscribePlanSchema = z.object({
  plan_type: z.enum(['monthly', 'yearly']),
});

export class SubscribePlanProps extends createZodDto(subscribePlanSchema) {}
