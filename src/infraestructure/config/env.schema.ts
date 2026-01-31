import { z } from 'zod';

const expiresRegex = /^[0-9]+[smhd]$/;

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.number() || z.string(),
  FRONTEND_URL: z.url(),
  FRONTEND_LOGIN_CALLBACK_ENDPOINT: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;
