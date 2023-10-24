import { Module } from '@nestjs/common';
import { AcarsService } from './acars.service';
import { AcarsController } from './acars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Acars } from './acars.entity';
//=========================================================================================================================

@Module({
	imports: [TypeOrmModule.forFeature([Acars])],
	controllers: [AcarsController],
	providers: [AcarsService],
	exports: [AcarsService],
})
export class AcarsModule { }
