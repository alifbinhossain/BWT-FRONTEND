import useTQuery from '@/hooks/useTQuery';

import { vislonQK } from './queryKeys';

// * RM
export const useVislonTMRM = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.VislonTMRM(),
		url: '/material/stock/by/single-field/v_teeth_molding',
	});
export const useVislonTMRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vislonQK.VislonTMRMByUUID(uuid),
		url: `/material/stock/by/single-field/v_teeth_molding${uuid}`,
		enabled: !!uuid,
	});

//* RM Log
export const useVislonTMRMLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.VislonTMRMLog(),
		url: '/material/used/by/v_teeth_molding',
	});
export const useVislonTMRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vislonQK.VislonTMRMLogByUUID(uuid),
		url: `/material/used/by/v_teeth_molding${uuid}`,
		enabled: !!uuid,
	});

//* order against RM Log
export const useOrderAgainstVislonTMRMLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.orderAgainstVislonTMRMLog(),
		url: '/zipper/material-trx-against-order/by/v_teeth_molding',
	});
export const useOrderAgainstVislonTMRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vislonQK.orderAgainstVislonTMRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/v_teeth_molding${uuid}`,
		enabled: !!uuid,
	});

// * Production & Transaction combined data
export const useVislonTMP = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.vislonTMP(),
		url: '/zipper/sfg/by/teeth_molding_prod?item_name=vislon',
	});

// * Production Entry by UUID
export const useVislonTMPEntryByUUID = <T>(uuid: string) => {
	return useTQuery<T>({
		queryKey: vislonQK.vislonTMPEntryByUUID(uuid),
		url: `/zipper/sfg-production/${uuid}`,
		enabled: !!uuid,
	});
};

// * Transaction Entry by UUID
export const useVislonTMTEntryByUUID = <T>(uuid: string) => {
	return useTQuery<T>({
		queryKey: vislonQK.vislonTMTEntryByUUID(uuid),
		url: `/zipper/sfg-transaction/${uuid}`,
		enabled: !!uuid,
	});
};

// * Production Log
export const useVislonTMPLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.vislonTMPLog(),
		url: '/zipper/sfg-production/by/teeth_molding?item_name=vislon',
	});

// * Transaction Log
export const useVislonTMTLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.vislonTMTLog(),
		url: '/zipper/sfg-transaction/by/teeth_molding_prod?item_name=vislon',
	});

//* Tape Log
export const useVislonTMTapeLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.vislonTMTapeLog(),
		url: '/zipper/dyed-tape-transaction/by/vislon',
	});
export const useVislonTMTapeLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vislonQK.vislonTMTapeLogByUUID(uuid),
		url: `/zipper/dyed-tape-transaction/by/vislon_teeth_molding/${uuid}`,
		enabled: !!uuid,
	});

// * RM
export const useVislonFinishingRM = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.VislonFinishingRM(),
		url: '/material/stock/by/multi-field/v_gapping,v_teeth_cleaning,v_sealing,v_t_cutting,v_stopper',
	});
export const useVislonFinishingRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vislonQK.VislonFinishingRMByUUID(uuid),
		url: `/material/stock/by/multi-field/v_gapping,v_teeth_cleaning,v_sealing,v_t_cutting,v_stopper/${uuid}`,
		enabled: !!uuid,
	});
//* RM Log
export const useVislonFinishingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.VislonFinishingRMLog(),
		url: '/material/used/multi-section/by/v_gapping,v_teeth_cleaning,v_sealing,v_t_cutting,v_stopper',
	});
export const useVislonFinishingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vislonQK.VislonFinishingRMLogByUUID(uuid),
		url: `/material/used/multi-section/by/v_gapping,v_teeth_cleaning,v_sealing,v_t_cutting,v_stopper/${uuid}`,
		enabled: !!uuid,
	});
//* order against RM Log
export const useOrderAgainstVislonFinishingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.orderAgainstVislonFinishingRMLog(),
		url: '/zipper/material-trx-against-order/multiple/by/v_gapping,v_teeth_cleaning,v_sealing,v_t_cutting,v_stopper',
	});
export const useOrderAgainstVislonFinishingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vislonQK.orderAgainstVislonFinishingRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/multiple/by/v_gapping,v_teeth_cleaning,v_sealing,v_t_cutting,v_stopper${uuid}`,
		enabled: !!uuid,
	});

// * Finishing Production & Transaction combined data
export const useVislonFinishingProd = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.vislonFinishingProd(),
		url: '/zipper/sfg/by/finishing_prod?item_name=vislon',
	});

// * Finishing production log
export const useVislonFinishingProdLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.vislonFinishingProdLog(),
		url: '/zipper/sfg-production/by/finishing?item_name=vislon',
	});

// * Finishing transaction log
export const useVislonFinishingTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: vislonQK.vislonFinishingTrxLog(),
		url: '/zipper/sfg-transaction/by/finishing_prod?item_name=vislon',
	});
