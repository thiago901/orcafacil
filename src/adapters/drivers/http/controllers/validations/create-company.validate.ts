import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(2),
  owner_id: z.string(),
  avatar: z.string().optional(),
});

export class CreateCompanyProps extends createZodDto(createCompanySchema) {}
