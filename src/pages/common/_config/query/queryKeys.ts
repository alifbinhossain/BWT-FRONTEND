export const commonQK = {
	all: () => ['common'],

	// * tapeSFG
	tapeSFG: () => [...commonQK.all(), 'tape-sfg'],
	tapeSFGByUUID: (uuid: string) => [...commonQK.tapeSFG(), uuid],

	// * tapeProduction
	tapeProduction: () => [...commonQK.all(), 'tape/production'],
	tapeProductionByUUID: (uuid: string) => [...commonQK.tapeProduction(), uuid],

	// * tapeToCoil
	tapeToCoil: () => [...commonQK.all(), 'tape-to-coil'],
	tapeToCoilByUUID: (uuid: string) => [...commonQK.tapeToCoil(), uuid],

	//* tapeTransferFromStock
	tapeTransfer: () => [...commonQK.all(), 'tape-transfer'],
	tapeTransferByUUID: (uuid: string) => [...commonQK.tapeTransfer(), uuid],

	// * tapeRM
	tapeRM: () => [...commonQK.all(), 'tape-rm'],
	tapeRMByUUID: (uuid: string) => [...commonQK.tapeRM(), uuid],

	// * tapeRequired
	tapeRequired: () => [...commonQK.all(), 'tape-required'],
	tapeRequiredByUUID: (uuid: string) => [...commonQK.tapeRequired(), uuid],

	// * tapeRMLog
	tapeRMLog: () => [...commonQK.all(), 'tape-rm-log'],
	tapeRMLogByUUID: (uuid: string) => [...commonQK.tapeRMLog(), uuid],

	// *  Order Against Tape RM Log * //
	orderAgainstTapeRMLog: () => [...commonQK.all(), 'tape-order-against-rm-log'],
	orderAgainstTapeRMLogByUUID: (uuid: string) => [...commonQK.orderAgainstTapeRMLog(), uuid],

	// * coilSFG
	coilSFG: () => [...commonQK.all(), 'coil-sfg'],
	coilSFGByUUID: (uuid: string) => [...commonQK.coilSFG(), uuid],

	// * coilProduction
	coilProduction: () => [...commonQK.all(), 'coil-production'],
	coilProductionByUUID: (uuid: string) => [...commonQK.coilProduction(), uuid],

	// * coilRM
	coilRM: () => [...commonQK.all(), 'coil-rm'],
	coilRMByUUID: (uuid: string) => [...commonQK.coilRM(), uuid],

	// * coilRMLog
	coilRMLog: () => [...commonQK.all(), 'coil-rm-log'],
	coilRMLogByUUID: (uuid: string) => [...commonQK.coilRMLog(), uuid],

	// * coilToStockLog
	coilToStock: () => [...commonQK.all(), 'coil-to-stock'],
	coilToStockByUUID: (uuid: string) => [...commonQK.coilToStock(), uuid],

	//* coilTransfer
	coilTransfer: () => [...commonQK.all(), 'coil-transfer'],
	coilTransferByUUID: (uuid: string) => [...commonQK.coilTransfer(), uuid],

	// * materialUsed
	materialUsed: () => [...commonQK.all(), 'material-used'],
	materialUsedByUUID: (uuid: string) => [...commonQK.materialUsed(), uuid],

	// * Coil Order Against Coil RM Log * //
	orderAgainstCoilRMLog: () => [...commonQK.all(), 'coil-order-against-rm-log'],
	orderAgainstCoilRMLogByUUID: (uuid: string) => [...commonQK.orderAgainstCoilRMLog(), uuid],

	// * MATERIAL TRX *//
	materialTrx: () => [...commonQK.all(), 'material-trx'],
	materialTrxByUUID: (uuid: string) => [...commonQK.materialTrx(), uuid],

	// * Coil to Dyeing
	coilToDyeing: () => [...commonQK.all(), 'coil-to-dyeing'],
	coilToDyeingByUUID: (uuid: string) => [...commonQK.coilToDyeing(), uuid],

	// * Tape to Dyeing
	tapeToDyeing: () => [...commonQK.all(), 'tape-to-dyeing'],
	tapeToDyeingByUUID: (uuid: string) => [...commonQK.tapeToDyeing(), uuid],
};
