const regexp1 = /\/ID\w{4,6}\,\w{5,7}\,[a-zA-Z]{3}\w{6}\d{3}\//i;
const regexp2 = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[.]\d{3}Z/i;

export const findFlightParams = (text: string) => {
	const textWithoutSpace = text.replace(/\s/, '');
	const checkReg1 = textWithoutSpace.match(regexp1);
	const checkReg2 = textWithoutSpace.match(regexp2);

	const obj = {
		callsign: 'n/a',
		program: 'n/a',
		timestamp: undefined
	};

	if (checkReg1) {
		const arr = checkReg1[0].slice(1, -1).split(',');
		obj.callsign = arr[1];
		obj.program = arr[2];
	}

	if (checkReg2) {
		obj.timestamp = checkReg2[0];
	}

	return obj;
}