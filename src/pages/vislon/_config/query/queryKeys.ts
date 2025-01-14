export const vislonQK = {
	all: () => ['vislon'],

	//* Teeth Molding
	// * RM
	VislonTMRM: () => [...vislonQK.all(), 'tm-rm'],
	VislonTMRMByUUID: (uuid: string) => [...vislonQK.VislonTMRM(), uuid],

	// * RM Log
	VislonTMRMLog: () => [...vislonQK.all(), 'tm-rm-log'],
	VislonTMRMLogByUUID: (uuid: string) => [...vislonQK.VislonTMRMLog(), uuid],

	// * Order Against vislonTMRMLog * //// * Order Against vislonTM RM Log * //
	orderAgainstVislonTMRMLog: () => [...vislonQK.all(), 'vislon-tm', 'order-against-rm-log'],
	orderAgainstVislonTMRMLogByUUID: (uuid: string) => [...vislonQK.orderAgainstVislonTMRMLog(), uuid],

	// * Vislon Teeth Molding Production combined data
	vislonTMP: () => [...vislonQK.all(), 'vislonTMP'],
	vislonTMPByUUID: (uuid: string) => [...vislonQK.vislonTMP(), uuid],

	// * Vislon Teeth Molding Transaction combined data
	vislonTMT: () => [...vislonQK.all(), 'vislonTMT'],
	vislonTMTByUUID: (uuid: string) => [...vislonQK.vislonTMT(), uuid],

	// * Vislon Teeth Molding Production Entry
	vislonTMPEntry: () => [...vislonQK.all(), 'vislonTMPEntry'],
	vislonTMPEntryByUUID: (uuid: string) => [...vislonQK.vislonTMPEntry(), uuid],

	// * Vislon Teeth Molding Transaction Entry
	vislonTMTEntry: () => [...vislonQK.all(), 'vislonTMTEntry'],
	vislonTMTEntryByUUID: (uuid: string) => [...vislonQK.vislonTMTEntry(), uuid],

	// * Vislon Teeth Molding Production Log
	vislonTMPLog: () => [...vislonQK.all(), 'vislonTMPLog'],
	vislonTMPLogByUUID: (uuid: string) => [...vislonQK.vislonTMPLog(), uuid],

	// * Vislon Teeth Molding Transaction Log
	vislonTMTLog: () => [...vislonQK.all(), 'vislonTMTLog'],
	vislonTMTLogByUUID: (uuid: string) => [...vislonQK.vislonTMTLog(), uuid],

	//* Vislon Teeth Molding Tape Log
	vislonTMTapeLog: () => [...vislonQK.all(), 'vislonTMTapeLog'],
	vislonTMTapeLogByUUID: (uuid: string) => [...vislonQK.vislonTMTapeLog(), uuid],

	// * Finishing
	//*RM
	VislonFinishingRM: () => [...vislonQK.all(), 'fin-rm'],
	VislonFinishingRMByUUID: (uuid: string) => [...vislonQK.VislonFinishingRM(), 'rm', uuid],

	//*RM Log
	VislonFinishingRMLog: () => [...vislonQK.all(), 'fin-rm-log'],
	VislonFinishingRMLogByUUID: (uuid: string) => [...vislonQK.VislonFinishingRMLog(), 'rm-log', uuid],

	// * Order Against vislonFinishing RM Log * //
	orderAgainstVislonFinishingRMLog: () => [...vislonQK.all(), 'vislon-finishing', 'order-against-rm-log'],
	orderAgainstVislonFinishingRMLogByUUID: (uuid: string) => [...vislonQK.orderAgainstVislonFinishingRMLog(), uuid],

	// * finishing  Production & Transaction combined data
	vislonFinishingProd: () => [...vislonQK.all(), 'vislon-finishing', 'prod'],
	vislonFinishingProdByUUID: (uuid: string) => [...vislonQK.vislonFinishingProd(), uuid],

	// * Finishing Production Log
	vislonFinishingProdLog: () => [...vislonQK.all(), 'vislon-finishing', 'prod-log'],

	// * Finishing Transaction Log
	vislonFinishingTrxLog: () => [...vislonQK.all(), 'vislon-finishing', 'trx-log'],
};
