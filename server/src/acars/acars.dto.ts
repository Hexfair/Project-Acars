import { IsString } from "class-validator";
//=========================================================================================================================

export class CreateAcarsDto {
	@IsString()
	text: string;

	@IsString()
	timestamp: Date;

	@IsString()
	callsign: string;

	@IsString()
	mission: string;

	@IsString()
	from: string;

	@IsString()
	to: string;
}
