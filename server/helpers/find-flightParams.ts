const regexp1 = /\/ID\w{4,6}\,\w{5,7}\,[a-zA-Z]{3}\w{6}\d{3}\//i;
const regexp2 = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[.]\d{3}Z/i;
const regexp3 = /\/AF[a-zA-Z]{4}[,][a-zA-Z]{4}\//i;

// /AFETAD,KBGR/
export const findFlightParams = (text: string) => {
	const textWithoutSpace = text.replace(/\s/, '');
	const checkReg1 = textWithoutSpace.match(regexp1);
	const checkReg2 = textWithoutSpace.match(regexp2);
	const checkReg3 = textWithoutSpace.match(regexp3);

	const obj = {
		callsign: 'n/a',
		program: 'n/a',
		timestamp: undefined,
		from: 'n/a',
		to: 'n/a'
	};

	if (checkReg1) {
		const arr = checkReg1[0].slice(1, -1).split(',');
		obj.callsign = arr[1];
		obj.program = arr[2];
	}

	if (checkReg2) {
		obj.timestamp = checkReg2[0];
	}

	if (textWithoutSpace.includes('MDINI') && checkReg3) {
		const arr = checkReg1[0].slice(3, -1).split(',');
		obj.from = arr[1];
		obj.to = arr[2];
	}

	return obj;
}

// 2023-10-25T17:16:51.044Z AE145B GES:90 2 .66157A 	- #MDINI/ID66157A,RCH600,PVM6255Z1295/MR0,0/AFETAD,KBGR/TD251717,1845E176