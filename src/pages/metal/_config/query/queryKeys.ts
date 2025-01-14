export const metalQK = {
	all: () => ['metal'],

	// * Transaction Log
	metalTMTrxLog: () => [...metalQK.all(), 'tm-trx-log'],
	metalTMTrxLogByUUID: (uuid: string) => [...metalQK.all(), 'tm-trx-log', uuid],

	// * PRODUCTION Log
	metalTMProductionLog: () => [...metalQK.all(), 'tm-production-log'],
	metalTMProductionLogByUUID: (uuid: string) => [...metalQK.all(), 'tm-production-log', uuid],

	// * Tape Log
	metalTMTapeLog: () => [...metalQK.all(), 'tm-tape-log'],
	metalTMTapeLogByUUID: (uuid: string) => [...metalQK.all(), 'tm-tape-log', uuid],

	// * PRODUCTION
	metalTMProduction: () => [...metalQK.all(), 'tm-production'],

	// * RM
	metalTMRM: () => [...metalQK.all(), 'tm-rm'],
	metalTMRMByUUID: (uuid: string) => [...metalQK.metalTMRM(), uuid],

	// * RM Log
	metalTMRMLog: () => [...metalQK.all(), 'tm-rm-log'],
	metalTMRMLogByUUID: (uuid: string) => [...metalQK.metalTMRMLog(), uuid],

	// * Order Against Metal TM RM Log * //
	orderAgainstMetalTMRMLog: () => [...metalQK.all(), 'metalTM/order-against-rm-log'],
	orderAgainstMetalTMRMLogByUUID: (uuid: string) => [...metalQK.orderAgainstMetalTMRMLog(), uuid],

	// * Finishing

	//*RM
	metalFinishingRM: () => [...metalQK.all(), 'fin-rm'],
	metalFinishingRMByUUID: (uuid: string) => [...metalQK.metalFinishingRM(), uuid],

	//*RM Log
	metalFinishingRMLog: () => [...metalQK.all(), 'fin-rm-log'],
	metalFinishingRMLogByUUID: (uuid: string) => [...metalQK.metalFinishingRMLog(), uuid],

	// * Order Against metalFinishing RM Log * //
	orderAgainstMetalFinishingRMLog: () => [...metalQK.all(), 'metalFinishing/order-against-rm-log'],
	orderAgainstMetalFinishingRMLogByUUID: (uuid: string) => [...metalQK.orderAgainstMetalFinishingRMLog(), uuid],

	// * Finishing  Production log
	metalFinishingProdLog: () => [...metalQK.all(), 'finishingProdLog'],

	// * Finishing Transaction Log
	metalFinishingTrxLog: () => [...metalQK.all(), 'finishingTrxLog'],

	//* Teeth Coloring
	// * PRODUCTION
	metalTCProduction: () => [...metalQK.all(), 'tc-production'],

	// * Transaction Log
	metalTCTrxLog: () => [...metalQK.all(), 'tc-trx-log'],
	metalTCTrxLogByUUID: (uuid: string) => [...metalQK.all(), 'tc-trx-log', uuid],

	// * PRODUCTION Log
	metalTCProductionLog: () => [...metalQK.all(), 'tc-production-log'],
	metalTCProductionLogByUUID: (uuid: string) => [...metalQK.all(), 'tc-production-log', uuid],

	// * RM
	metalTCRM: () => [...metalQK.all(), 'tc-rm'],
	metalTCRMByUUID: (uuid: string) => [...metalQK.metalTCRM(), uuid],

	// * RM Log
	metalTCRMLog: () => [...metalQK.all(), 'tc-rm-log'],
	metalTCRMLogByUUID: (uuid: string) => [...metalQK.metalTCRMLog(), uuid],
	// * Order Against metalTC RM Log * //
	orderAgainstMetalTCRMLog: () => [...metalQK.all(), 'metalTC/order-against-rm-log'],
	orderAgainstMetalTCRMLogByUUID: (uuid: string) => [...metalQK.orderAgainstMetalTCRMLog(), uuid],
};
