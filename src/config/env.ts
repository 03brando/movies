import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_API_KEY: z.string().min(1, 'Missing NEXT_PUBLIC_API_KEY')
});

export const env = EnvSchema.parse({
  NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY
});


