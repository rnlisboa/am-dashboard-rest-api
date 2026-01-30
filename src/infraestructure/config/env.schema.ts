import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  FRONTEND_URL: z.string().url(),
  FRONTEND_LOGIN_CALLBACK_ENDPOINT: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;
