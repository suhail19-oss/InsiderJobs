import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://7ca28e72996d2603097543893d318c39@o4510753843314688.ingest.us.sentry.io/4510753849409536",
  integrations: [Sentry.mongooseIntegration()],
  sendDefaultPii: true,
});
