import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AircraftModule } from './aircraft/aircraft.module';
import { AcarsModule } from './acars/acars.module';
import { Aircraft } from './aircraft/aircraft.entity';
import { Acars } from './acars/acars.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ScheduleModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'miracle2009',
			database: 'acars',
			entities: [Aircraft, Acars],
			synchronize: true,
		}),
		AircraftModule,
		AcarsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
