import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
//=========================================================================================================================
dayjs.extend(utc);
dayjs.extend(customParseFormat)
//=========================================================================================================================

export const calcDate = (item: string): Date => {
	const date = item[item.length - 1] === 'Z'
		? dayjs(item, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
		: dayjs(item, 'HH:mm:ssZ DD-MM-YYYY');

	return new Date(date.toISOString())
}