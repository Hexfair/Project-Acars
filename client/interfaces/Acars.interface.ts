import { IAircraft } from "./Aircraft.interface";
//===========================================================================================================

export interface IAcars {
	id: number,
	text: string,
	timestamp: Date,
	callsign: string,
	mission: string,
	from: string,
	to: string,
	createdAt: Date,
	aircraft: IAircraft,
}
