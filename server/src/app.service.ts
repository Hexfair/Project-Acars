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
			if (html.length === 0) {
				return
			}

			const elems = htmlParser(html);

			for (let i = elems.length - 1; i >= 0; i--) {
				const elemParams = elemsParser(elems[i]);
				const paramsFromAcars = findFlightParams(elemParams.text);

				const aircraftParams = {
					hex: elemParams.hex,
					reg: elemParams.reg,
					type: elemParams.type,
					description: elemParams.description
				}

				const aircraftData = await this.aircraftService.create(aircraftParams);
				const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

				const acarsParams = {
					aircraft: aircraftData,
					text: elemParams.text,
					timestamp: paramsFromAcars.timestamp || elemParams.timestamp,
					callsign: paramsFromAcars.callsign,
					program: paramsFromAcars.program,
					from: paramsFromAcars.from,
					to: paramsFromAcars.to,
				}

				if (!checkLastAcars) {
					await this.acarsService.create(acarsParams);
				} else {
					const dateAcarsFromHtml = dayjs(elemParams.timestamp);
					const dateLastAcars = dayjs(checkLastAcars.timestamp);

					if (dateAcarsFromHtml.isAfter(dateLastAcars)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

		} catch (error) {
			console.log(error);
		}
	}
}

