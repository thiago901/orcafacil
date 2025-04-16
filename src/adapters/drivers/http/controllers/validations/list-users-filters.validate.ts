import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const listUsersFiltersSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
});

export class ListUsersFiltersProps extends createZodDto(
  listUsersFiltersSchema,
) {}
