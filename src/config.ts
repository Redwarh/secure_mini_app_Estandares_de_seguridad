import 'dotenv/config';
export const config = {
  port: Number(process.env.PORT ?? 3000),
  jwt: { secret: process.env.JWT_SECRET ?? 'dev-secret' },
  env: process.env.NODE_ENV ?? 'development',
  cspDefault: process.env.CSP_DEFAULT_SRC ?? "'self'"
};
