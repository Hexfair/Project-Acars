import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { AircraftService } from './aircraft/aircraft.service';
import { AcarsService } from './acars/acars.service';
import { findFlightParams } from 'helpers/find-flightParams';
import { elemsParser, htmlParser } from 'helpers/html-parser';
import { AllAcars } from 'interfaces/acars.interface';
import { findMission } from 'helpers/find-mission';
import { data } from 'helpers/ex';
import { Timeout } from '@nestjs/schedule';
//=========================================================================================================================
dayjs.extend(utc);
dayjs.extend(customParseFormat)
//=========================================================================================================================

@Injectable()
export class AppService {
	constructor(
		private readonly aircraftService: AircraftService,
		private readonly acarsService: AcarsService,
	) { }

	/*
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

					if (dateAcarsFromHtml.isAfter(dateLastAcars) && checkLastAcars.text.slice(25) !== elemParams.text.slice(25)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

		} catch (error) {
			console.log(error);
		}
	}
	*/
	//@Timeout(2000)
	async fetchFromBrowser(dataFromBrowser: any): Promise<void> {
		const initialData: AllAcars[] = JSON.parse(dataFromBrowser);
		//const initialData = data;
		for (let item of initialData) {

			if ('Interest' in item) {
				const aircraftParams = {
					hex: item.ICAO,
					reg: item.Rego,
					type: item.Type,
					description: item.Desc
				}
				const aircraftData = await this.aircraftService.create(aircraftParams);
				const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

				let latestTimeDays = item.Timestamp[item.Timestamp.length - 1] === 'Z'
					? dayjs(item.Timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
					: dayjs(item.Timestamp, 'HH:mm:ssZ DD-MM-YYYY');

				const acarsParams = {
					aircraft: aircraftData,
					text: typeof item.Raw === 'string' ? item.Raw : 'n/a',
					timestamp: new Date(latestTimeDays.toISOString()),
					callsign: item.Owner.length > 2 ? item.Owner : 'n/a',
					mission: typeof item.Raw === 'string' ? findMission(item.Raw) : 'n/a',
					from: 'n/a',
					to: 'n/a',
				}

				if (!checkLastAcars) {
					await this.acarsService.create(acarsParams);
				} else {
					const dateAcarsFromBrowser = dayjs(item.Timestamp);
					const dateLastAcars = dayjs(checkLastAcars.timestamp);

					if (dateAcarsFromBrowser.isAfter(dateLastAcars) && checkLastAcars.text.slice(25) !== acarsParams.text.slice(25)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

			if ('gndstn' in item) {
				const aircraftParams = {
					hex: item.ICAOtxt,
					reg: item.Tail,
					type: item.Type,
					description: item.Desc
				}
				const aircraftData = await this.aircraftService.create(aircraftParams);
				const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

				let latestTimeDays = item.Timestamp[item.Timestamp.length - 1] === 'Z'
					? dayjs(item.Timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
					: dayjs(item.Timestamp, 'HH:mm:ssZ DD-MM-YYYY');


				const acarsParams = {
					aircraft: aircraftData,
					text: typeof item.Raw === 'string' ? item.Raw : 'n/a',
					timestamp: new Date(latestTimeDays.toISOString()),
					callsign: item.Call,
					mission: typeof item.Raw === 'string' ? findMission(item.Raw) : 'n/a',
					from: 'n/a',
					to: 'n/a',
				}

				if (!checkLastAcars) {
					await this.acarsService.create(acarsParams);
				} else {
					const dateAcarsFromBrowser = dayjs(item.Timestamp);
					const dateLastAcars = dayjs(checkLastAcars.timestamp);

					if (dateAcarsFromBrowser.isAfter(dateLastAcars) && checkLastAcars.text.slice(25) !== acarsParams.text.slice(25)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

			if ('timest' in item) {
				const aircraftParams = {
					hex: item.icao,
					reg: item.rego,
					type: item.actype,
					description: item.actype
				}
				const aircraftData = await this.aircraftService.create(aircraftParams);
				const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

				let latestTimeDays = item.timest[item.timest.length - 1] === 'Z'
					? dayjs(item.timest, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
					: dayjs(item.timest, 'HH:mm:ssZ DD-MM-YYYY');

				const acarsParams = {
					aircraft: aircraftData,
					text: typeof item.rawacars === 'string' ? item.rawacars : 'n/a',
					timestamp: new Date(latestTimeDays.toISOString()),
					callsign: item.callsign,
					mission: item.mission,
					from: item.departloc,
					to: item.arriveloc,
				}

				if (!checkLastAcars) {
					await this.acarsService.create(acarsParams);
				} else {
					const dateAcarsFromBrowser = dayjs(item.timest);
					const dateLastAcars = dayjs(checkLastAcars.timestamp);

					if (dateAcarsFromBrowser.isAfter(dateLastAcars) && checkLastAcars.text.slice(25) !== acarsParams.text.slice(25)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

			if ('DD' in item) {
				const aircraftParams = {
					hex: item.Tail,
					reg: item.ID,
					type: item.Type,
					description: item.Desc
				}
				const aircraftData = await this.aircraftService.create(aircraftParams);
				const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

				let latestTimeDays = item.Timestamp[item.Timestamp.length - 1] === 'Z'
					? dayjs(item.Timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
					: dayjs(item.Timestamp, 'HH:mm:ssZ DD-MM-YYYY');

				const acarsParams = {
					aircraft: aircraftData,
					text: typeof item.Raw === 'string' ? item.Raw : 'n/a',
					timestamp: new Date(latestTimeDays.toISOString()),
					callsign: item.call,
					mission: item.Mission,
					from: item.departloc,
					to: item.arriveloc,
				}

				if (!checkLastAcars) {
					await this.acarsService.create(acarsParams);
				} else {
					const dateAcarsFromBrowser = dayjs(item.Timestamp);
					const dateLastAcars = dayjs(checkLastAcars.timestamp);

					if (dateAcarsFromBrowser.isAfter(dateLastAcars) && checkLastAcars.text.slice(25) !== acarsParams.text.slice(25)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

			if ('Realtime' in item) {
				const aircraftParams = {
					hex: item.icao,
					reg: item.Rego,
					type: item.Type,
					description: item.Desc
				}
				const aircraftData = await this.aircraftService.create(aircraftParams);
				const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

				let latestTimeDays = item.Timestamp[item.Timestamp.length - 1] === 'Z'
					? dayjs(item.Timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
					: dayjs(item.Timestamp, 'HH:mm:ssZ DD-MM-YYYY');

				const acarsParams = {
					aircraft: aircraftData,
					text: 'n/a',
					timestamp: new Date(latestTimeDays.toISOString()),
					callsign: item.Flight,
					mission: 'n/a',
					from: 'n/a',
					to: 'n/a',
				}

				if (!checkLastAcars) {
					await this.acarsService.create(acarsParams);
				} else {
					const dateAcarsFromBrowser = dayjs(item.Timestamp);
					const dateLastAcars = dayjs(checkLastAcars.timestamp);

					if (dateAcarsFromBrowser.isAfter(dateLastAcars) && checkLastAcars.text.slice(25) !== acarsParams.text.slice(25)) {
						await this.acarsService.create(acarsParams);
					}
				}
			}

			/*
				aircraft: Aircraft;
				text: string;
				timestamp: Date;
				callsign: string;
				mission: string;
				from: string;
				to: string;
			*/



		}
	}
}

//2023-10-25T21:18:29.173Z AE2FA8 GES:44 2 .88196A 	- #MD/AA PIKCPYA.AT1.88196A22D5106840990D