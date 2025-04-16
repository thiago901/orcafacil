import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const recoverPasswordSchema = z.object({
  email: z.string().email(),
});

export class RecoverPasswordProps extends createZodDto(recoverPasswordSchema) {}
