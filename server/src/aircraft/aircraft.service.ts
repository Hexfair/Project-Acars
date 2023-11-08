import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aircraft } from './aircraft.entity';
import { Repository } from 'typeorm';
import { CreateAircraftDto } from './aircraft.dto';
//=========================================================================================================================

@Injectable()
export class AircraftService {
	constructor(
		@InjectRepository(Aircraft) private readonly aircraftRepository: Repository<Aircraft>,
	) { }

	async create(createAircraftDto: CreateAircraftDto) {
		try {
			const checkAircraft = await this.aircraftRepository.findOne({
				where: { hex: createAircraftDto.hex },
			});

			if (checkAircraft) {
				return checkAircraft;
			}
			return await this.aircraftRepository.save(createAircraftDto);
		} catch (error) {
			console.log(error);
		}
	}
}
