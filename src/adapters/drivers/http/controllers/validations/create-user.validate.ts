import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8),
  avatar: z.string().optional(),
});

export class CreateUserProps extends createZodDto(createUserSchema) {}
