import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
//=========================================================================================================================

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.setGlobalPrefix('/api');
	app.enableCors();
	app.useBodyParser('text', { limit: '10mb' });
	await app.listen(5001);
}
bootstrap();
