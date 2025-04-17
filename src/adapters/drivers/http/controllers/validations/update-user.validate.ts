import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  avatar: z.string().optional(),
});

export class UpdateUserProps extends createZodDto(updateUserSchema) {}
