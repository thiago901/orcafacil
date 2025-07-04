import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const cancelSubscriptionSchema = z.object({
  email: z.string().email(),
});

export class CancelSubscriptionProps extends createZodDto(
  cancelSubscriptionSchema,
) {}
