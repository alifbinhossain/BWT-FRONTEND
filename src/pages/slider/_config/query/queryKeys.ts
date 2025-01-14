export const sliderQK = {
	all: () => ['slider'],
	// *Slider Assembly

	// * RM
	sliderAssemblyRM: () => [...sliderQK.all(), 'assembly-rm'],
	sliderAssemblyRMByUUID: (uuid: string) => [...sliderQK.sliderAssemblyRM(), uuid],

	// * RM Log
	sliderAssemblyRMLog: () => [...sliderQK.all(), 'assembly-rm-log'],
	sliderAssemblyRMLogByUUID: (uuid: string) => [...sliderQK.sliderAssemblyRMLog(), uuid],

	//* Slider/Dashboard--> (INFO)
	sliderDashboardInfo: () => [...sliderQK.all(), 'dashboard-info'],
	sliderDashboardInfoByUUID: (uuid: string) => [...sliderQK.sliderDashboardInfo(), uuid],

	//* Die Casting --> (STOCK)
	sliderDieCastingStock: () => [...sliderQK.all(), 'dc-stock'],
	sliderDieCastingStockByUUID: (uuid: string) => [...sliderQK.sliderDieCastingStock(), uuid],
	sliderDieCastingStockByOrderNumbers: (numbers: string[]) => [...sliderQK.sliderDieCastingStock(), ...numbers],

	//* Die Casting --> (TRANSFER)
	sliderDieCastingTransfer: () => [...sliderQK.all(), 'dc-transfer'],
	sliderDieCastingTransferByUUID: (uuid: string) => [...sliderQK.sliderDieCastingStock(), uuid],

	sliderDiecastingTrxLog: () => [...sliderQK.all(), 'dc-trx-log'],

	// * Die Casting --> (BY STOCK)
	sliderDieCastingByStock: () => [...sliderQK.all(), 'dc-by-stock'],
	sliderDieCastingByStockByUUID: (uuid: string) => [...sliderQK.sliderDieCastingByStock(), uuid],

	// * Die Casting --> (BY ORDER)
	sliderDieCastingByOrder: () => [...sliderQK.all(), 'dc-by-order'],
	sliderDieCastingByOrderByUUID: (uuid: string) => [...sliderQK.sliderDieCastingByOrder(), uuid],

	//* Die Casting --> (PRODUCTION)
	sliderDieCastingProduction: () => [...sliderQK.all(), 'dc-production'],
	sliderDieCastingProductionByUUID: (uuid: string) => [...sliderQK.sliderDieCastingProduction(), uuid],

	// * Order Against sliderAssembly RM Log * //
	orderAgainstSliderAssemblyRMLog: () => [...sliderQK.all(), 'sliderAssembly/order-against-rm-log'],
	orderAgainstSliderAssemblyRMLogByUUID: (uuid: string) => [...sliderQK.orderAgainstSliderAssemblyRMLog(), uuid],

	//* Die Casting
	// * RM
	sliderDieCastingRM: () => [...sliderQK.all(), 'dc-rm'],
	sliderDieCastingRMByUUID: (uuid: string) => [...sliderQK.sliderDieCastingRM(), uuid],

	// * RM Log
	sliderDieCastingRMLog: () => [...sliderQK.all(), 'dc-rm-log'],
	sliderDieCastingRMLogByUUID: (uuid: string) => [...sliderQK.sliderDieCastingRMLog(), uuid],
	// * Order Against dieCasting RM Log * //
	orderAgainstDieCastingRMLog: () => [...sliderQK.all(), 'dieCasting/order-against-rm-log'],
	orderAgainstDieCastingRMLogByUUID: (uuid: string) => [...sliderQK.orderAgainstDieCastingRMLog(), uuid],

	//* Coloring
	// * RM
	sliderColoringRM: () => [...sliderQK.all(), 'c-rm'],
	sliderColoringRMByUUID: (uuid: string) => [...sliderQK.sliderColoringRM(), uuid],

	// * RM Log
	sliderColoringRMLog: () => [...sliderQK.all(), 'c-rm-log'],
	sliderColoringRMLogByUUID: (uuid: string) => [...sliderQK.sliderColoringRMLog(), uuid],
	// * Order Against sliderColor RM Log * //
	orderAgainstSliderColorRMLog: () => [...sliderQK.all(), 'sliderFinishing/order-against-rm-log'],
	orderAgainstSliderColorRMLogByUUID: (uuid: string) => [...sliderQK.orderAgainstSliderColorRMLog(), uuid],

	// * Slider Assembly Stock
	sliderAssemblyStock: () => [...sliderQK.all(), 'assembly-stock'],
	sliderAssemblyStockByUUID: (uuid: string) => [...sliderQK.sliderAssemblyStock(), uuid],

	// * Slider Assembly Production
	sliderAssemblyProduction: () => [...sliderQK.all(), 'assembly-production'],
	sliderAssemblyProductionByUUID: (uuid: string) => [...sliderQK.sliderAssemblyProduction(), uuid],

	// * Slider Assembly Production Entry
	sliderAssemblyProductionEntry: () => [...sliderQK.all(), 'assembly-production-entry'],
	sliderAssemblyProductionEntryByUUID: (uuid: string) => [...sliderQK.sliderAssemblyProductionEntry(), uuid],

	// * Slider Assembly Transfer Entry
	sliderAssemblyTransferEntry: () => [...sliderQK.all(), 'assembly-transfer-entry'],
	sliderAssemblyTransferEntryByUUID: (uuid: string) => [...sliderQK.sliderAssemblyTransferEntry(), uuid],

	// * Slider Assembly Log Joined Production
	sliderAssemblyLogjoinedProduction: () => [...sliderQK.all(), 'assembly-joined-log-production'],

	// * Slider Assembly Log Production
	sliderAssemblyLogProduction: () => [...sliderQK.all(), 'assembly-log-production'],
	sliderAssemblyLogProductionByUUID: (uuid: string) => [...sliderQK.sliderAssemblyLogProduction(), uuid],
	// * Slider Assembly Log Transaction
	sliderAssemblyLogTransaction: () => [...sliderQK.all(), 'assembly-log-transaction'],
	sliderAssemblyLogTransactionByUUID: (uuid: string) => [...sliderQK.sliderAssemblyLogTransaction(), uuid],

	// * Slider Assembly Stock Transaction
	sliderAssemblyStockTransaction: () => [...sliderQK.all(), 'assembly-stock-transaction'],
	sliderAssemblyStockTransactionByUUID: (uuid: string) => [...sliderQK.sliderAssemblyStockTransaction(), uuid],

	// * slider assembly stock production
	sliderAssemblyStockProduction: () => [...sliderQK.all(), 'assembly-stock-production'],
	sliderAssemblyStockProductionByUUID: (uuid: string) => [...sliderQK.sliderAssemblyStockProduction(), uuid],

	// * slider coloring log production
	sliderColoringLogProduction: () => [...sliderQK.all(), 'coloring-log-production'],

	// * slider coloring log transaction
	sliderColoringLogTransaction: () => [...sliderQK.all(), 'coloring-log-transaction'],

	// * Slider coloring Production
	sliderColoringProduction: () => [...sliderQK.all(), 'coloring-production'],
	sliderColoringProductionByUUID: (uuid: string) => [...sliderQK.sliderColoringProduction(), uuid],
};
