import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { AircraftService } from './aircraft/aircraft.service';
import { AcarsService } from './acars/acars.service';
import { Acars } from './acars/acars.entity';
//=========================================================================================================================
dayjs.extend(utc);
//=========================================================================================================================

@Injectable()
export class AppService {
	constructor(
		private readonly aircraftService: AircraftService,
		private readonly acarsService: AcarsService,
	) { }

	async onRunParser(html: string): Promise<Acars> {
		let $ = cheerio.load(html);
		console.log(html);
		const elems = $('.tabulator-row');


		for (let item of elems) {
			const hex = $(item).find('div[tabulator-field="ICAO"]').text().trim();
			const reg = $(item).find('div[tabulator-field="Rego"]').text().trim();
			const type = $(item).find('div[tabulator-field="Type"]').text().trim();
			const text = $(item).find('div[tabulator-field="Raw"]').text().trim();
			const timestamp = $(item).find('div[tabulator-field="Timestamp"]').text().trim();

			console.log(hex, reg, type, text, timestamp);
			const aircraftParams = {
				hex,
				reg,
				type,
			}

			const aircraftData = await this.aircraftService.create(aircraftParams);

			const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex)

			const acarsParams = {
				aircraft: aircraftData,
				text,
				timestamp
			}

			if (!checkLastAcars) {
				return await this.acarsService.create(acarsParams);
			}

			const dateAcarsFromHtml = dayjs(timestamp);
			const dateLastAcars = dayjs(checkLastAcars.timestamp);

			if (dateAcarsFromHtml.isBefore(dateLastAcars)) {
				return await this.acarsService.create(acarsParams);
			}
		}
	}
}
