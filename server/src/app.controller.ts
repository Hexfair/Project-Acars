import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
//=========================================================================================================================

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Post()
	fetchFromBrowser(@Body() data: any): Promise<void> {
		return this.appService.fetchFromBrowser(data);
	}
}
