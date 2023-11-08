export const calcCallsign = (item: string): string => {
	if (item.length < 2 || item === 'undefined') {
		return '-'
	} else {
		if (item[0] === '5' && item[1] === "#") {
			return item.slice(2)
		} else {
			return item
		}
	}
}