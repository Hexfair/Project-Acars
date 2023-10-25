import { IsString } from "class-validator";
//=========================================================================================================================

export class CreateAcarsDto {
	@IsString()
	text: string;

	@IsString()
	timestamp: string;

	@IsString()
	callsign: string;

	@IsString()
	program: string;

	@IsString()
	from: string;

	@IsString()
	to: string;
}
