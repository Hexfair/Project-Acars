import { IsString } from "class-validator";
//=========================================================================================================================

export class CreateAcarsDto {
	@IsString()
	text: string;

	@IsString()
	timestamp: string;
}
