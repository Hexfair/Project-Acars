import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
//=========================================================================================================================

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	findAll() {
		return 'Работает';
	}

	@Post()
	fromBrowserRequest(@Body() html: string): Promise<void> {
		return this.appService.onRunParser(html);
	}
}
