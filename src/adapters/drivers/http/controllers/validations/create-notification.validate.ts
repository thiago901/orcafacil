import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createNotificationSchema = z.object({
  message: z.string(),
  recipient_id: z.string(),
  title: z.string(),
  type: z.string(),
});

export class CreateNotificationProps extends createZodDto(
  createNotificationSchema,
) {}
