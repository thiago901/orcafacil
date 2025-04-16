import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthenticateUserProps extends createZodDto(
  authenticateUserSchema,
) {}
