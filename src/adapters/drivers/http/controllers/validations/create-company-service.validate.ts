import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createCompanyServiceSchema = z.object({
  name: z.string().min(2),
  category_id: z.string(),
  company_id: z.string(),
  category_name: z.string(),
});

export class CreateCompanyServiceProps extends createZodDto(
  createCompanyServiceSchema,
) {}
