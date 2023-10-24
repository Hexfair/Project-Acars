import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
//=========================================================================================================================

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.setGlobalPrefix('/api');
	app.enableCors();
	app.useBodyParser('text', { bodyLimit: 10_485_760 });
	await app.listen(5001);
}
bootstrap();
