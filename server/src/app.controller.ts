import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Acars } from './acars/acars.entity';
//=========================================================================================================================

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	findAll() {
		return 'Работает';
	}

	@Post()
	fromBrowserRequest(@Body() html: string): Promise<Acars> {
		return this.appService.onRunParser(html);
	}
}
