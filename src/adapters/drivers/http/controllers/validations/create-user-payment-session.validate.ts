import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createUserPaymentSessionSchema = z.object({
  proposal_id: z.string().uuid(),
});

export class CreateUserPaymentSessionProps extends createZodDto(
  createUserPaymentSessionSchema,
) {}
