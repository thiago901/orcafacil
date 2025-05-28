import { z } from 'zod';

export const schemaEnv = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3000),
  JWT_PUBLIC_KEY: z.coerce.string(),
  JWT_PRIVATE_KEY: z.coerce.string(),
  AWS_ACCESS_KEY_ID: z.coerce.string(),
  AWS_SECRET_ACCESS_KEY: z.coerce.string(),
  FIREBASE_CREDENTIALS: z.coerce.string(),
  FIREBASE_BUCKET_STORAGE_NAME: z.coerce.string(),
  FIREBASE_DATABASE_URL: z.coerce.string(),
});

export type Env = z.infer<typeof schemaEnv>;
