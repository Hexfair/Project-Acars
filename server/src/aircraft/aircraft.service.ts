import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aircraft } from './aircraft.entity';
import { Repository } from 'typeorm';
import { CreateAircraftDto } from './aircraft.dto';

@Injectable()
export class AircraftService {
	constructor(
		@InjectRepository(Aircraft) private readonly aircraftRepository: Repository<Aircraft>,
	) { }

	async create(createAircraftDto: CreateAircraftDto) {
		const checkAircraft = await this.aircraftRepository.findOne({
			where: { hex: createAircraftDto.hex },
		});

		if (checkAircraft) {
			return checkAircraft;
		}

		return await this.aircraftRepository.save(createAircraftDto);
	}


	findAll() {
		return `This action returns all aircraft`;
	}

	findOne(id: number) {
		return `This action returns a #${id} aircraft`;
	}

	// update(id: number, updateAircraftDto: UpdateAircraftDto) {
	// 	return `This action updates a #${id} aircraft`;
	// }

	remove(id: number) {
		return `This action removes a #${id} aircraft`;
	}
}
