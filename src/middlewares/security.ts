import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from '../config.js';

export const security = [
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: [config.cspDefault]
      }
    },
    hsts: true,
    referrerPolicy: { policy: 'no-referrer' }
  }),
  rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
];
