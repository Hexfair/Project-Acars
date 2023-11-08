import { Injectable } from '@nestjs/common';
import { CreateAcarsDto, GetMoreAcarsDto, SearchAcarsDto } from './acars.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Acars } from './acars.entity';
import { ILike, Repository } from 'typeorm';
//=========================================================================================================================

@Injectable()
export class AcarsService {
	constructor(
		@InjectRepository(Acars) private readonly acarsRepository: Repository<Acars>,
	) { }

	/* Сохранение акарса в базу */
	async create(createAcarsDto: CreateAcarsDto) {
		try {
			await this.acarsRepository.save(createAcarsDto);
		} catch (error) {
			console.log(error);
		}
	}

	/* Получение последнего акарса конкретного самолета */
	async findLastAcars(hex: string) {
		try {
			const allAcarsByAircraft = await this.acarsRepository.find({
				relations: { aircraft: true },
				where: [{ aircraft: { hex: hex } }],
				order: { timestamp: 'ASC' }
			})
			if (!allAcarsByAircraft) {
				return null;
			} else {
				return allAcarsByAircraft.at(-1);
			}
		} catch (error) {
			console.log(error);
		}
	}

	/* Получение акарсов (100 штук) */
	async findAll() {
		return await this.acarsRepository.find({
			relations: { aircraft: true },
			order: { timestamp: 'DESC' },
			take: 100,
		});
	}

	/* Получение порции акарсов (по 100 штук) */
	async getMoreAcars(payload: GetMoreAcarsDto) {
		const countMessages = 100;

		return await this.acarsRepository.find({
			relations: { aircraft: true },
			order: { timestamp: 'DESC' },
			take: countMessages,
			skip: (payload.page - 1) * countMessages,
		});
	}

	/* Поиск акарса по тексту */
	async searchByText(payload: SearchAcarsDto) {
		const acars = await this.acarsRepository.find({
			relations: { aircraft: true },
			where: {
				text: ILike(`%${payload.searchAcarsTextValue}%`),
			},
			order: { timestamp: 'DESC' },
		});

		return acars.filter(obj =>
			obj.aircraft.hex.toLowerCase().includes(payload.searchAircraftTextValue.toLowerCase())
			|| obj.aircraft.reg.toLowerCase().includes(payload.searchAircraftTextValue.toLowerCase())
			|| obj.aircraft.type.toLowerCase().includes(payload.searchAircraftTextValue.toLowerCase())
			|| obj.aircraft.description.toLowerCase().includes(payload.searchAircraftTextValue.toLowerCase())
			|| obj.callsign.toLowerCase().includes(payload.searchAircraftTextValue.toLowerCase()))
	}
}
