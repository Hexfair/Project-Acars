import * as cheerio from 'cheerio';
//=========================================================================================================================

let cheerioAPI: cheerio.CheerioAPI;

export const htmlParser = (html: string) => {
	cheerioAPI = cheerio.load(html);
	const elems = cheerioAPI('.tabulator-row');

	elems.length > 0 && console.log(`Получены данные с сайта - всего ${elems.length} строк`);
	return elems;
}

export const elemsParser = (item: cheerio.Element) => {
	const hex = cheerioAPI(item).find('div[tabulator-field="ICAO"]').text().trim();
	const reg = cheerioAPI(item).find('div[tabulator-field="Rego"]').text().trim();
	const type = cheerioAPI(item).find('div[tabulator-field="Type"]').text().trim();
	const text = cheerioAPI(item).find('div[tabulator-field="Raw"]').text().trim();
	const timestamp = cheerioAPI(item).find('div[tabulator-field="Timestamp"]').text().trim();
	const description = cheerioAPI(item).find('div[tabulator-field="Desc"]').text().trim();

	return { hex, reg, type, text, timestamp, description }
}

