import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().regex(/^[0-9]+[smhd]$/),
  JWT_REFRESH_EXPIRES_IN: z.string().regex(/^[0-9]+[smhd]$/),
  FRONTEND_URL: z.url(),
  FRONTEND_LOGIN_CALLBACK_ENDPOINT: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;
