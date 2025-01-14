export const commercialQK = {
	all: () => ['commercial'],

	// bank
	bank: () => [...commercialQK.all(), 'bank'],
	bankByUUID: (uuid: string) => [...commercialQK.bank(), uuid],

	// pi
	pi: () => [...commercialQK.all(), 'pi'],
	piByQuery: (query: string) => [...commercialQK.all(), 'piByQuery', query],
	piCash: () => [...commercialQK.all(), 'pi-cash'],
	piByUUID: (uuid: string) => [...commercialQK.pi(), uuid],
	piDetailsByUUID: (uuid: string) => [...commercialQK.pi(), 'details', uuid],
	piDetailsByPiID: (id: string) => [...commercialQK.pi(), 'details-by-id', id],
	piByOrderInfo: (orderUUID: string, partyUUID: string, marketingUUID: string) => [
		...commercialQK.pi(),
		'zipper',
		orderUUID,
		partyUUID,
		marketingUUID,
	],
	piThreadByOrderInfo: (orderUUID: string, partyUUID: string, marketingUUID: string) => [
		...commercialQK.pi(),
		'thread',
		orderUUID,
		partyUUID,
		marketingUUID,
	],

	// pi-entry
	piEntry: () => [...commercialQK.all(), 'pi-entry'],
	piEntryByUUID: (uuid: string) => [...commercialQK.piEntry(), uuid],

	// lc
	lc: () => [...commercialQK.all(), 'lc'],
	lcByQuery: (query: string) => [...commercialQK.all(), 'lcByQuery', query],
	lcByUUID: (uuid: string) => [...commercialQK.lc(), uuid],
	lcByPi: (uuid: string) => [...commercialQK.all(), 'lc-by-pi', uuid],
	lcByNumber: (number: string) => [...commercialQK.all(), 'lc-by-number', number],
};
