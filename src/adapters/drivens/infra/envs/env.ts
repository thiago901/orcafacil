import { z } from 'zod';

export const schemaEnv = z.object({
  ENVIRONMENT: z.enum(['DEV', 'PROD']).default('DEV'),
  DATABASE_URL: z.string().url(),
  DATABASE_DIRECT_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  JWT_PUBLIC_KEY: z.coerce.string(),
  JWT_PRIVATE_KEY: z.coerce.string(),
  AWS_ACCESS_KEY_ID: z.coerce.string(),
  AWS_SECRET_ACCESS_KEY: z.coerce.string(),
  FIREBASE_CREDENTIALS: z.coerce.string(),
  FIREBASE_BUCKET_STORAGE_NAME: z.coerce.string(),
  FIREBASE_DATABASE_URL: z.coerce.string(),
  NOMINATIM_POSTAL_CODE: z.coerce.string(),
  RESEND_EMAIL_KEY: z.coerce.string(),
  WEB_APPLICATION_URL: z.coerce.string(),
  LOCATION_IQ_URL: z.coerce.string(),
  LOCATION_IQ_KEY: z.coerce.string(),
});

export type Env = z.infer<typeof schemaEnv>;
