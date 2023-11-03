const regexp = /\/ID\w{4,6}\,\w{5,7}\,[a-zA-Z]{3}\w{6}\d{3}\//i;

// /AFETAD,KBGR/
export const findMission = (text: string) => {
	const textWithoutSpace = text.replace(/\s/, '');
	const checkReg = textWithoutSpace.match(regexp);

	if (checkReg) {
		const arr = checkReg[0].slice(1, -1).split(',');
		return arr[2];
	}

	return 'n/a';
}