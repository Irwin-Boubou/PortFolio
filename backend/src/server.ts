import { createApp } from './app';
import { env } from './config/env';

createApp().listen(env.port, () => {
  console.log(`🚀 API ready → http://localhost:${env.port}/api/v1  (health: /health)`);
});
