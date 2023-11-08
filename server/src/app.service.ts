import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { AircraftService } from './aircraft/aircraft.service';
import { AcarsService } from './acars/acars.service';
import { AllAcars } from 'interfaces/acars.interface';
import { findMission } from 'helpers/find-mission';
import { calcDate } from 'helpers/calc-date';
import { calcCallsign } from 'helpers/calc-callsign';
//=========================================================================================================================
dayjs.extend(utc);
dayjs.extend(customParseFormat);
const regex = new RegExp(/\<br\/\>/, "ig");
//=========================================================================================================================

@Injectable()
export class AppService {
	constructor(
		private readonly aircraftService: AircraftService,
		private readonly acarsService: AcarsService,
	) { }

	async fetchFromBrowser(dataFromBrowser: any): Promise<void> {
		const initialData: AllAcars[] = JSON.parse(dataFromBrowser);
		const preparedData = initialData
			.map(obj => {
				const params = {
					aircraft: {
						hex: undefined,
						reg: undefined,
						type: '-',
						description: '-'
					},
					text: '-',
					timestamp: undefined,
					callsign: '-',
					mission: '-',
					from: '-',
					to: '-',
				}

				if ('Interest' in obj) {
					params.aircraft.hex = obj.ICAO && obj.ICAO.length > 2 && obj.ICAO;
					params.aircraft.reg = obj.Rego && obj.Rego.length > 2 && obj.Rego;
					params.aircraft.type = obj.Type && obj.Type.length > 2 ? obj.Type : '-';
					params.aircraft.description = obj.Desc && obj.Desc.length > 2 ? obj.Desc : '-';
					params.text = obj.Raw && typeof obj.Raw === 'string' && obj.Raw.replaceAll(regex, '\r\n');
					params.timestamp = calcDate(obj?.Timestamp);
					params.callsign = obj.Owner ? calcCallsign(obj.Owner) : '-';
					params.mission = obj.Raw && typeof obj.Raw === 'string' && findMission(obj.Raw);
				}

				if ('gndstn' in obj) {
					params.aircraft.hex = obj.ICAOtxt && obj.ICAOtxt.length > 2 && obj.ICAOtxt;
					params.aircraft.reg = obj.Tail && obj.Tail.length > 2 && obj.Tail;
					params.aircraft.type = obj.Type && obj.Type.length > 2 ? obj.Type : '-';
					params.aircraft.description = obj.Desc && obj.Desc.length > 2 ? obj.Desc : '-';
					params.text = obj.Raw && typeof obj.Raw === 'string' && obj.Raw.replaceAll(regex, '\r\n');
					params.timestamp = calcDate(obj?.Timestamp);
					params.callsign = obj.Call ? calcCallsign(obj.Call) : '-';
					params.mission = obj.Raw && typeof obj.Raw === 'string' && findMission(obj.Raw);
				}

				if ('timest' in obj) {
					params.aircraft.hex = obj.icao && obj.icao.length > 2 && obj.icao;
					params.aircraft.reg = obj.rego && obj.rego.length > 2 && obj.rego;
					params.aircraft.type = obj.actype && obj.actype.length > 2 ? obj.actype : '-';
					params.aircraft.description = obj.actype && obj.actype.length > 2 ? obj.actype : '-';
					params.text = obj.rawacars && typeof obj.rawacars === 'string' && obj.rawacars.replaceAll(regex, '\r\n');
					params.timestamp = calcDate(obj?.timest);
					params.callsign = obj.callsign ? calcCallsign(obj.callsign) : '-';
					params.mission = obj.mission ? obj.mission : '-';
					params.from = obj.depart ? obj.depart : '-';
					params.to = obj.arrive ? obj.arrive : '-';
				}

				if ('DD' in obj) {
					params.aircraft.hex = obj.Tail && obj.Tail.length > 2 && obj.Tail;
					params.aircraft.reg = obj.ID && obj.ID.length > 2 && obj.ID;
					params.aircraft.type = obj.Type && obj.Type.length > 2 ? obj.Type : '-';
					params.aircraft.description = obj.Desc && obj.Desc.length > 2 ? obj.Desc : '-';
					params.text = obj.Raw && typeof obj.Raw === 'string' && obj.Raw.replaceAll(regex, '\r\n');
					params.timestamp = calcDate(obj?.Timestamp);
					params.callsign = obj.call ? calcCallsign(obj.call) : '-';
					params.mission = obj.Mission ? obj.Mission : '-';
					params.from = obj.depart ? obj.depart : '-';
					params.to = obj.arrive ? obj.arrive : '-';
				}

				if ('Realtime' in obj) {
					params.aircraft.hex = obj.icao && obj.icao.length > 2 && obj.icao;
					params.aircraft.reg = obj.Rego && obj.Rego.length > 2 && obj.Rego;
					params.aircraft.type = obj.Type && obj.Type.length > 2 ? obj.Type : '-';
					params.aircraft.description = obj.Desc && obj.Desc.length > 2 ? obj.Desc : '-';
					params.timestamp = calcDate(obj?.Timestamp);
					params.callsign = obj.Flight ? calcCallsign(obj.Flight) : '-';
				}

				return params
			})
			.filter(obj => obj.timestamp !== undefined && obj.aircraft.hex !== undefined && obj.aircraft.reg !== undefined && obj.text !== 'false')
			.sort((a, b) => a.timestamp - b.timestamp)


		for (let item of preparedData) {
			const aircraftData = await this.aircraftService.create(item.aircraft);
			const checkLastAcars = await this.acarsService.findLastAcars(aircraftData.hex);

			const acarsParams = {
				aircraft: aircraftData,
				text: item.text,
				timestamp: item.timestamp,
				callsign: item.callsign,
				mission: item.mission,
				from: item.from,
				to: item.to,
			}

			if (!checkLastAcars) {
				await this.acarsService.create(acarsParams);
			} else {
				const dateAcarsFromBrowser = dayjs(item.timestamp);
				const dateLastAcars = dayjs(checkLastAcars.timestamp);

				if (item.text.length > 0 && dateAcarsFromBrowser.isAfter(dateLastAcars) && checkLastAcars.text.slice(25) !== acarsParams.text.slice(25)) {
					await this.acarsService.create(acarsParams);
				}
			}
		}
	}
}
