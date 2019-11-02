import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: false }));
  app.use(json({ limit: '25mb' }));
  app.use((req, res, next) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS ?
      process.env.ALLOWED_ORIGINS.split(',').map((p) => p.trim()) :
      ['https://www.foundneedles.com', 'https://foundneedles.com'];
    const origin: string = Array.isArray(req.headers.origin) ? req.headers.origin.join(',') : req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH');
    if (req.method === 'OPTIONS') {
      res.send();
    } else {
      next();
    }
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
