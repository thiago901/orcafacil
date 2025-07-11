import { createZodDto } from 'nestjs-zod';

import { z } from 'zod';

export const createSupportMessageSchema = z.object({
  title: z.string().min(2),
  body: z.string().min(2),
  label: z.string().min(2),
});

export class CreateSupportMessageProps extends createZodDto(
  createSupportMessageSchema,
) {}
