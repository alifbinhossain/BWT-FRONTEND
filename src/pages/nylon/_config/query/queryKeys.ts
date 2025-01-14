export const nylonQK = {
	all: () => ['nylon'],
	metallicFinish: () => [...nylonQK.all(), 'metallic-finish'],

	// * Metallic Finishing
	// * Production
	nylonMFProduction: () => [...nylonQK.metallicFinish(), 'production'],

	// * Production Log
	nylonMFProductionLog: () => [...nylonQK.metallicFinish(), 'production-log'],
	nylonMFProductionLogByUUID: (uuid: string) => [...nylonQK.nylonMFProductionLog(), uuid],

	// * Trx Log
	nylonMFTrxLog: () => [...nylonQK.metallicFinish(), 'trx-log'],
	nylonMFTrxLogByUUID: (uuid: string) => [...nylonQK.nylonMFTrxLog(), uuid],

	// * RM
	nylonMetallicFinishingRM: () => [...nylonQK.all(), 'rm'],
	nylonMetallicFinishingRMByUUID: (uuid: string) => [...nylonQK.nylonMetallicFinishingRM(), uuid],

	//* RM Log
	nylonMetallicFinishingRMLog: () => [...nylonQK.all(), 'rm-log'],
	nylonMetallicFinishingRMLogByUUID: (uuid: string) => [...nylonQK.nylonMetallicFinishingRMLog(), uuid],

	// * Order Against nylonFinishing RM Log * //
	orderAgainstNylonFinishingRMLog: () => [...nylonQK.all(), 'nylonFinishing/order-against-rm-log'],
	orderAgainstNylonFinishingRMLogByUUID: (uuid: string) => [...nylonQK.orderAgainstNylonFinishingRMLog(), uuid],

	//*Tape Log
	nylonMetallicTapeLog: () => [...nylonQK.all(), 'metallic-tape-log'],
	nylonMetallicTapeLogByUUID: (uuid: string) => [...nylonQK.nylonMetallicTapeLog(), uuid],

	//*Plastic Finishing
	//*Tape Log
	nylonPlasticFinishingTapeLog: () => [...nylonQK.all(), 'plastic-tape-log'],
	nylonPlasticFinishingTapeLogByUUID: (uuid: string) => [...nylonQK.nylonPlasticFinishingTapeLog(), uuid],

	//* Production Log
	nylonPlasticFinishingProductionLog: () => [...nylonQK.all(), 'tm-production-log'],
	nylonPlasticFinishingProductionLogByUUID: (uuid: string) => [...nylonQK.all(), 'tm-production-log', uuid],
	//* Trx Log
	nylonPlasticFinishingTrxLog: () => [...nylonQK.all(), 'tm-trx-log'],
	nylonPlasticFinishingTrxLogByUUID: (uuid: string) => [...nylonQK.nylonPlasticFinishingTrxLog(), uuid],

	// * PRODUCTION
	nylonPlasticProduction: () => [...nylonQK.all(), 'tm-production'],
};
