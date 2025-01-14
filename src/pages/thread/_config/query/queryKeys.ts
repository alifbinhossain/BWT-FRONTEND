export const threadQK = {
	all: () => ['thread'],

	//Count-length
	countLength: () => [...threadQK.all(), 'count-length'],
	countLengthByUUID: (uuid: string) => [...threadQK.countLength(), uuid],

	//Machine
	machine: () => [...threadQK.all(), 'machine'],
	machineByUUID: (uuid: string) => [...threadQK.machine(), uuid],

	//Order-info
	orderInfo: () => [...threadQK.all(), 'order-info'],
	orderInfoByUUID: (uuid: string) => [...threadQK.orderInfo(), uuid],
	orderInfoDetailsByUUID: (uuid: string) => [...threadQK.orderInfo(), 'details', uuid],

	//Order-info-entry
	orderInfoEntry: () => [...threadQK.all(), 'order-info-entry'],
	orderInfoEntryByUUID: (uuid: string) => [...threadQK.orderInfoEntry(), uuid],

	//Swatch
	swatch: () => [...threadQK.all(), 'swatch'],
	swatchByUUID: (uuid: string) => [...threadQK.swatch(), uuid],

	//DyesCategory
	dyesCategory: () => [...threadQK.all(), 'dyes-category'],
	dyesCategoryByUUID: (uuid: string) => [...threadQK.dyesCategory(), uuid],

	//Programs
	programs: () => [...threadQK.all(), 'programs'],
	programsByUUID: (uuid: string) => [...threadQK.programs(), uuid],

	// * Coning
	coning: () => [...threadQK.all(), 'coning'],

	// log
	ConningProdlog: () => [...threadQK.all(), 'conning/prodlog'],
	ConningTrxlog: () => [...threadQK.all(), 'conning/trxlog'],

	// prod entry
	ConningProd: () => [...threadQK.all(), 'conning/prod'],
	ConningProdByUUID: (uuid: string) => [...threadQK.ConningProd(), uuid],

	// trx entry
	ConningTrx: () => [...threadQK.all(), 'conning/trx'],
	ConningTrxByUUID: (uuid: string) => [...threadQK.ConningTrx(), uuid],

	// * Challan
	challan: () => [...threadQK.all(), 'challan'],
	challanByUUID: (uuid: string) => [...threadQK.all(), 'challan', uuid],
	challanDetailsByUUID: (uuid: string) => [...threadQK.challan(), 'details', uuid],
};
