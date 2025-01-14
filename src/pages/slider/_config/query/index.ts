import useTQuery from '@/hooks/useTQuery';

import { sliderQK } from './queryKeys';

// * RM
export const useSliderAssemblyRM = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyRM(),
		url: '/material/stock/by/single-field/slider_assembly',
	});

export const useSliderAssemblyRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyRMByUUID(uuid),
		url: `/material/stock/by/single-field/slider_assembly${uuid}`,
		enabled: !!uuid,
	});

// * RM Log
export const useSliderAssemblyRMLog = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyRMLog(),
		url: '/material/used/by/slider_assembly',
	});
export const useSliderAssemblyRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyRMLogByUUID(uuid),
		url: `/material/used/by/slider_assembly${uuid}`,
		enabled: !!uuid,
	});

// * Slider/Dashboard --> (Info)
export const useSliderDashboardInfo = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDashboardInfo(),
		url: '/slider/stock',
	});

export const useSliderDashboardInfoByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDashboardInfoByUUID(uuid),
		url: `/slider/stock/${uuid}`,
		enabled: !!uuid,
	});

// * Die Casting --> (STOCK)
export const useSliderDieCastingStock = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingStock(),
		url: '/slider/die-casting',
	});

// * Die Casting --> (STOCK BY ORDER NUMBERS)
export const useSliderDieCastingStockByOrderNumbers = <T>(orderNumbers = []) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingStockByOrderNumbers(orderNumbers),
		url: `/slider/die-casting/for/slider-stock-multi/${orderNumbers.join(',')}`,
		enabled: !!orderNumbers,
	});

// * Die Casting --> (PRODUCTION)
export const useSliderDieCastingProduction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingProduction(),
		url: '/slider/die-casting-production',
	});

export const useSliderDieCastingProductionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingProductionByUUID(uuid),
		url: `/slider/die-casting-production/${uuid}`,
		enabled: !!uuid,
	});

// * Die Casting --> (TRANSFER)
export const useSliderDieCastingTransfer = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingTransfer(),
		url: '/slider/die-casting-transfer',
	});

// * Die Casting --> (TRANSFER STOCK + ORDER)
export const useSliderDiecastingTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDiecastingTrxLog(),
		url: '/slider/die-casting-trx-log',
	});

// * Die Casting --> (TRANSFER -> Against Stock)
export const useSliderDieCastingTransferAgainstStock = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingByStock(),
		url: '/slider/trx-against-stock',
	});

export const useSliderDieCastingTransferAgainstStockByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingByStockByUUID(uuid),
		url: `/slider/trx-against-stock/${uuid}`,
		enabled: !!uuid,
	});

// * Die Casting --> (TRANSFER -> Against Order)
export const useSliderDieCastingTransferAgainstOrder = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingByOrder(),
		url: '/slider/die-casting-transaction',
	});

export const useSliderDieCastingTransferAgainstOrderByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingByOrderByUUID(uuid),
		url: `/slider/die-casting-transaction/${uuid}`,
		enabled: !!uuid,
	});

// * Order Against RM Log
export const useOrderAgainstSliderAssemblyRMLog = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.orderAgainstSliderAssemblyRMLog(),
		url: '/zipper/material-trx-against-order/by/slider_assembly',
	});
export const useOrderAgainstSliderAssemblyRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.orderAgainstSliderAssemblyRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/slider_assembly${uuid}`,
		enabled: !!uuid,
	});

// * Die Casting
// * RM
export const useSliderDieCastingRM = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingRM(),
		url: '/material/stock/by/single-field/die_casting',
	});
export const useSliderDieCastingRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingRMByUUID(uuid),
		url: `/material/stock/by/single-field/die_casting${uuid}`,
		enabled: !!uuid,
	});

// * RM Log
export const useSliderDieCastingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingRMLog(),
		url: '/material/used/by/die_casting',
	});
export const useSliderDieCastingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderDieCastingRMLogByUUID(uuid),
		url: `/material/used/by/die_casting${uuid}`,
		enabled: !!uuid,
	});

// * Order Against RM Log
export const useOrderAgainstDieCastingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.orderAgainstDieCastingRMLog(),
		url: '/zipper/material-trx-against-order/by/die_casting',
	});
export const useOrderAgainstDieCastingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.orderAgainstDieCastingRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/die_casting${uuid}`,
	});

// * Coloring

// * RM
export const useSliderColoringRM = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderColoringRM(),
		url: '/material/stock/by/single-field/coloring',
	});
export const useSliderColoringRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderColoringRMByUUID(uuid),
		url: `/material/stock/by/single-field/coloring${uuid}`,
		enabled: !!uuid,
	});
// * RM Log
export const useSliderColoringRMLog = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderColoringRMLog(),
		url: '/material/used/by/coloring',
	});
export const useSliderColoringRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderColoringRMLogByUUID(uuid),
		url: `/material/used/by/coloring${uuid}`,
		enabled: !!uuid,
	});
// * Order Against RM Log
export const useOrderAgainstSliderColorRMLog = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.orderAgainstSliderColorRMLog(),
		url: '/zipper/material-trx-against-order/by/coloring',
	});
export const useOrderAgainstSliderColorRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.orderAgainstSliderColorRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/coloring${uuid}`,
		enabled: !!uuid,
	});

// * Slider Assembly
// * Slider Assembly Stock
export const useSliderAssemblyStock = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyStock(),
		url: '/slider/assembly-stock',
	});

// * Slider Assembly Production (Stock)
export const useSliderAssemblyProduction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyProduction(),
		url: '/slider/stock/by/sa_prod',
	});

// * Slider Assembly Production entry
export const useSliderAssemblyProductionEntry = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyProductionEntry(),
		url: `/slider/production`,
	});

export const useSliderAssemblyProductionEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyProductionEntryByUUID(uuid),
		url: `/slider/production/${uuid}`,
		enabled: !!uuid,
	});

// * Slider Assembly Transfer Entry
export const useSliderAssemblyTransferEntry = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyTransferEntry(),
		url: `/slider/transaction`,
	});

export const useSliderAssemblyTransferEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyTransferEntryByUUID(uuid),
		url: `/slider/transaction/${uuid}`,
		enabled: !!uuid,
	});

// * Slider Assembly Log Joined Prduction
export const useSliderAssemblyLogJoinedProduction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyLogjoinedProduction(),
		url: '/slider/assembly-production-log',
	});

// * Slider Assembly Log Prduction
export const useSliderAssemblyLogProduction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyLogProduction(),
		url: '/slider/production/by/sa_prod',
	});

// * slider assembly stock production
export const useSliderAssemblyStockProduction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyStockProduction(),
		url: '/slider/die-casting-to-assembly-stock',
	});

export const useSliderAssemblyStockProductionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyStockProductionByUUID(uuid),
		url: `/slider/die-casting-to-assembly-stock/${uuid}`,
		enabled: !!uuid,
	});

// * slider assembly Log Transaction
export const useSliderAssemblyLogTransaction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyLogTransaction(),
		url: `/slider/transaction/by/sa_prod`,
	});

// * slider assembly stock Transaction
export const useSliderAssemblyStockTransaction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyStockTransaction(),
		url: '/slider/transaction/by/assembly_stock',
	});

export const useSliderAssemblyStockTransactionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: sliderQK.sliderAssemblyStockTransactionByUUID(uuid),
		url: `/slider/transaction/${uuid}`,
		enabled: !!uuid,
	});

// * Slider Coloring log //
// * Slider Coloring Log Prduction
export const useSliderColoringLogProduction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderColoringLogProduction(),
		url: '/slider/production/by/coloring',
	});

// * slider coloring Log Transaction
export const useSliderColoringLogTransaction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderColoringLogTransaction(),
		url: `/slider/transaction/by/coloring_prod`,
	});

// * Slider coloring Production (Stock)
export const useSliderColoringProduction = <T>() =>
	useTQuery<T>({
		queryKey: sliderQK.sliderColoringProduction(),
		url: '/slider/stock/by/coloring_prod',
	});
