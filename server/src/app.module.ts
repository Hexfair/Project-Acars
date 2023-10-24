import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AircraftModule } from './aircraft/aircraft.module';
import { AcarsModule } from './acars/acars.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'miracle2009',
			database: 'acars',
			entities: [],
			synchronize: true,
		}),
		AircraftModule,
		AcarsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
