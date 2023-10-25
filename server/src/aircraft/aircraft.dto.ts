import { IsString } from "class-validator";
//=========================================================================================================================

export class CreateAircraftDto {
	@IsString()
	hex: string;

	@IsString()
	reg: string;

	@IsString()
	type: string;

	@IsString()
	description: string;
}
