import { Injectable } from '@nestjs/common';
import { CreateAcarsDto } from './acars.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Acars } from './acars.entity';
import { Repository } from 'typeorm';
//=========================================================================================================================

@Injectable()
export class AcarsService {
	constructor(
		@InjectRepository(Acars) private readonly acarsRepository: Repository<Acars>,
	) { }

	/* Сохранение акарса в базу */
	async create(createAcarsDto: CreateAcarsDto) {
		return await this.acarsRepository.save(createAcarsDto);
	}

	/* Получение последнего акарса конкретного самолета */
	async findLastAcars(hex: string) {
		const allAcarsByAircraft = await this.acarsRepository.find({
			relations: { aircraft: true },
			where: [{ aircraft: { hex: hex } }],
			order: { createdAt: 'ASC' }
		})

		return allAcarsByAircraft.at(-1);
	}

	findAll() {
		return `This action returns all acars`;
	}

	findOne(id: number) {
		return `This action returns a #${id} acar`;
	}

	// update(id: number, updateAcarDto: UpdateAcarDto) {
	// 	return `This action updates a #${id} acar`;
	// }

	remove(id: number) {
		return `This action removes a #${id} acar`;
	}
}
