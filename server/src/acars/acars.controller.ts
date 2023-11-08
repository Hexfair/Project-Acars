import { Controller, Get, Post, Body } from '@nestjs/common';
import { AcarsService } from './acars.service';
import { GetMoreAcarsDto, SearchAcarsDto } from './acars.dto';
//=========================================================================================================================

@Controller('acars')
export class AcarsController {
	constructor(private readonly acarsService: AcarsService) { }

	@Get()
	findAll() {
		return this.acarsService.findAll();
	}

	@Post('more')
	getMoreAcars(@Body() getMoreAcarsDto: GetMoreAcarsDto) {
		return this.acarsService.getMoreAcars(getMoreAcarsDto);
	}

	@Post('search')
	searchByText(@Body() searchAcarsDto: SearchAcarsDto) {
		return this.acarsService.searchByText(searchAcarsDto);
	}
}
