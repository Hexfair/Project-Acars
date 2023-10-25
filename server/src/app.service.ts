import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { AircraftService } from './aircraft/aircraft.service';
import { AcarsService } from './acars/acars.service';
import { findFlightParams } from 'helpers/find-flightParams';
import { elemsParser, htmlParser } from 'helpers/html-parser';
//=========================================================================================================================
dayjs.extend(utc);
//=========================================================================================================================

@Injectable()
export class AppService {
	constructor(
		private readonly aircraftService: AircraftService,
		private readonly acarsService: AcarsService,
	) { }

	async onRunParser(html: string): Promise<void> {
		try {
			const elems = htmlParser(html);

			for (let i = 0; i < elems.length; i++) {
				const elemParams = elemsParser(elems[i]);
				const paramsFromAcars = findFlightParams(elemParams.text);

				const aircraftParams = {
					hex: elemParams.hex,
					reg: elemParams.reg,
					type: elemParams.type,
				}

				const aircraftData = await this.aircraftService.create(aircraftParams);
				const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

				const acarsParams = {
					aircraft: aircraftData,
					text: elemParams.text,
					timestamp: paramsFromAcars.timestamp || elemParams.timestamp,
					callsign: paramsFromAcars.callsign,
					program: paramsFromAcars.program
				}

				if (!checkLastAcars) {
					await this.acarsService.create(acarsParams);
				} else {
					const dateAcarsFromHtml = dayjs(elemParams.timestamp);
					const dateLastAcars = dayjs(checkLastAcars.timestamp);
					if (dateAcarsFromHtml.isBefore(dateLastAcars)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

		} catch (error) {
			console.log(error);
		}
	}
}

