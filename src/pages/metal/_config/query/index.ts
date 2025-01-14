//*Teeth Molding

import useTQuery from '@/hooks/useTQuery';

import { metalQK } from './queryKeys';

// * PRODUCTION
export const useMetalTMProduction = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTMProduction(),
		url: '/zipper/sfg/by/teeth_molding_prod?item_name=metal',
	});

//* Trx Log
export const useMetalTMTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTMTrxLog(),
		url: '/zipper/sfg-transaction/by/teeth_molding_prod?item_name=metal',
	});

export const useMetalTMTrxLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTMTrxLogByUUID(uuid),
		url: `/zipper/sfg-transaction/${uuid}`,
		enabled: !!uuid,
	});

//* Production Log
export const useMetalTMProductionLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTMProductionLog(),
		url: '/zipper/sfg-production/by/teeth_molding?item_name=metal',
	});
export const useMetalTMProductionLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTMProductionLogByUUID(uuid),
		url: `/zipper/sfg-production/${uuid}`,
		enabled: !!uuid,
	});
//* Tape Log

export const useMetalTMTapeLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTMTapeLog(),
		url: '/zipper/dyed-tape-transaction/by/metal',
	});

export const useMetalTMTapeLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTMTapeLogByUUID(uuid),
		url: `/zipper/dyed-tape-transaction/by/metal_teeth_molding/${uuid}`,
		enabled: !!uuid,
	});

// * RM
export const useMetalTMRM = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTMRM(),
		url: '/material/stock/by/single-field/m_teeth_molding',
	});
export const useMetalTMRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTMRMByUUID(uuid),
		url: `/material/stock/by/single-field/m_teeth_molding${uuid}`,
		enabled: !!uuid,
	});

//* RM Log
export const useMetalTMRMLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTMRMLog(),
		url: '/material/used/by/m_teeth_molding',
	});
export const useMetalTMRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTMRMLogByUUID(uuid),
		url: `/material/used/by/m_teeth_molding${uuid}`,
		enabled: !!uuid,
	});
//* order against RM Log
export const useOrderAgainstMetalTMRMLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.orderAgainstMetalTMRMLog(),
		url: '/zipper/material-trx-against-order/by/m_teeth_molding',
	});
export const useOrderAgainstMetalTMRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.orderAgainstMetalTMRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/m_teeth_molding${uuid}`,
		enabled: !!uuid,
	});
//* Teeth Coloring

// * PRODUCTION
export const useMetalTCProduction = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTCProduction(),
		url: '/zipper/sfg/by/teeth_coloring_prod?item_name=metal',
	});

//* Trx Log
export const useMetalTCTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTCTrxLog(),
		url: '/zipper/sfg-transaction/by/teeth_coloring_prod?item_name=metal',
	});

export const useMetalTCTrxLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTCTrxLogByUUID(uuid),
		url: `/zipper/sfg-transaction/${uuid}`,
		enabled: !!uuid,
	});

//* Production Log
export const useMetalTCProductionLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTCProductionLog(),
		url: '/zipper/sfg-production/by/teeth_coloring?item_name=metal',
	});
export const useMetalTCProductionLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTCProductionLogByUUID(uuid),
		url: `/zipper/sfg-production/${uuid}`,
		enabled: !!uuid,
	});

// * RM
export const useMetalTCRM = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTCRM(),
		url: '/material/stock/by/multi-field/teeth_assembling_and_polishing,plating_and_iron',
	});
export const useMetalTCRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTCRMByUUID(uuid),
		url: `/material/stock/by/multi-field/teeth_assembling_and_polishing,plating_and_iron${uuid}`,
		enabled: !!uuid,
	});
//* RM Log
export const useMetalTCRMLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalTCRMLog(),
		url: '/material/used/multi-section/by/teeth_assembling_and_polishing,plating_and_iron',
	});
export const useMetalTCRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalTCRMLogByUUID(uuid),
		url: `/material/used/multi-section/by/teeth_assembling_and_polishing,plating_and_iron${uuid}`,
		enabled: !!uuid,
	});
//* order against RM Log
export const useOrderAgainstMetalTCRMLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.orderAgainstMetalTCRMLog(),
		url: '/zipper/material-trx-against-order/multiple/by/teeth_assembling_and_polishing,plating_and_iron',
	});
export const useOrderAgainstMetalTCRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.orderAgainstMetalTCRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/multiple/by/teeth_assembling_and_polishing,plating_and_iron${uuid}`,
		enabled: !!uuid,
	});
//* Finishing
// * RM
export const useMetalFinishingRM = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalFinishingRM(),
		url: '/material/stock/by/multi-field/m_gapping,m_teeth_cleaning,m_sealing,m_stopper',
	});
export const useMetalFinishingRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalFinishingRMByUUID(uuid),
		url: `/material/stock/by/multi-field/m_gapping,m_teeth_cleaning,m_sealing,m_stopper/${uuid}`,
		enabled: !!uuid,
	});
//* RM Log
export const useMetalFinishingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalFinishingRMLog(),
		url: '/material/used/multi-section/by/m_gapping,m_teeth_cleaning,m_sealing,m_stopper',
	});
export const useMetalFinishingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.metalFinishingRMLogByUUID(uuid),
		url: `/material/used/multi-section/by/m_gapping,m_teeth_cleaning,m_sealing,m_stopper/${uuid}`,
		enabled: !!uuid,
	});
//* order against RM Log
export const useOrderAgainstMetalFinishingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.orderAgainstMetalFinishingRMLog(),
		url: '/zipper/material-trx-against-order/multiple/by/m_gapping,m_teeth_cleaning,m_sealing,m_stopper',
	});
export const useOrderAgainstMetalFinishingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: metalQK.orderAgainstMetalFinishingRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/multiple/by/m_gapping,m_teeth_cleaning,m_sealing,m_stopper${uuid}`,
		enabled: !!uuid,
	});

// * Finishing production log
export const useMetalFinishingProdLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalFinishingProdLog(),
		url: '/zipper/sfg-production/by/finishing?item_name=metal',
	});

// * Finishing transaction log
export const useMetalFinishingTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: metalQK.metalFinishingTrxLog(),
		url: '/zipper/sfg-transaction/by/finishing_prod?item_name=metal',
	});
