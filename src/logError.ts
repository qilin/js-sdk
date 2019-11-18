import * as Sentry from '@sentry/browser';

const isDevMod = process.env.NODE_ENV === 'development';
Sentry.init({ dsn: process.env.SENTRY_DSN });

export default (error: Error) => {
  if (!isDevMod) Sentry.captureException(error);
  console.error(error);
};
