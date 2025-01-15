export const ENV = {
  OPENAI: {
    API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  },
  SUPABASE: {
    URL: import.meta.env.VITE_SUPABASE_URL || '',
    ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  }
} as const;

// Validate required environment variables
const requiredEnvVars = [
  ['VITE_OPENAI_API_KEY', ENV.OPENAI.API_KEY],
  ['VITE_SUPABASE_URL', ENV.SUPABASE.URL],
  ['VITE_SUPABASE_ANON_KEY', ENV.SUPABASE.ANON_KEY]
];

for (const [name, value] of requiredEnvVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}