import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcarsService } from './acars.service';

@Controller('acars')
export class AcarsController {
	constructor(private readonly acarsService: AcarsService) { }

	@Get(':id')
	findLastAcars(@Param('id') id: string) {
		return this.acarsService.findLastAcars(id);
	}

	// @Post()
	// create(@Body() createAcarDto: CreateAcarDto) {
	// 	return this.acarsService.create(createAcarDto);
	// }

	// @Get()
	// findAll() {
	// 	return this.acarsService.findAll();
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.acarsService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateAcarDto: UpdateAcarDto) {
	// 	return this.acarsService.update(+id, updateAcarDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.acarsService.remove(+id);
	// }
}
