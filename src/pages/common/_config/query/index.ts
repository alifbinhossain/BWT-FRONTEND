import useTQuery from '@/hooks/useTQuery';

import { commonQK } from './queryKeys';

// * TAPE * //
// * SFG * //
export const useCommonTapeSFG = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeSFG(),
		url: `/zipper/tape-coil`,
	});
export const useCommonTapeSFGByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.tapeSFGByUUID(uuid),
		url: `/zipper/tape-coil${uuid}`,
		enabled: !!uuid,
	});

// * PRODUCTION * //
export const useCommonTapeProduction = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeProduction(),
		url: `/zipper/tape-coil-production/by/tape`,
	});
export const useCommonTapeProductionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.tapeProductionByUUID(uuid),
		url: `/zipper/tape-coil-production/${uuid}`,
		enabled: !!uuid,
	});

// * TAPE TO COIL * //
export const useCommonTapeToCoil = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeToCoil(),
		url: `/zipper/tape-trx/by/tape`,
	});

export const useCommonTapeToCoilByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.tapeToCoilByUUID(uuid),
		url: `/zipper/tape-trx/${uuid}`,
		enabled: !!uuid,
	});

// * Tape Transfer From Stock
export const useCommonTapeTransfer = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeTransfer(),
		url: `/zipper/dyed-tape-transaction-from-stock`,
	});

export const useCommonTapeTransferByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.tapeTransferByUUID(uuid),
		url: `/zipper/dyed-tape-transaction-from-stock/${uuid}`,
		enabled: !!uuid,
	});

// * RM * //
export const useCommonTapeRM = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeRM(),
		url: `/material/stock/by/single-field/tape_making`,
	});
export const useCommonTapeRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.tapeRMByUUID(uuid),
		url: `/material/stock/by/single-field/tape_making/${uuid}`,
		enabled: !!uuid,
	});

// * RM * //
export const useCommonTapeRequired = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeRequired(),
		url: `/zipper/tape-coil-required`,
	});
export const useCommonTapeRequiredByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.tapeRequiredByUUID(uuid),
		url: `/zipper/tape-coil-required/${uuid}`,
		enabled: !!uuid,
	});

//* RM LOG *//
export const useCommonTapeRMLog = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeRMLog(),
		url: `/material/used/by/tape_making`,
	});
export const useCommonTapeRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.tapeRMLogByUUID(uuid),
		url: `/material/used/by/tape_making${uuid}`,
		enabled: !!uuid,
	});

// * Order Against RM Log * //
export const useCommonOrderAgainstTapeRMLog = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.orderAgainstTapeRMLog(),
		url: `/zipper/material-trx-against-order/by/tape_making`,
	});
export const useCommonOrderAgainstTapeRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.orderAgainstTapeRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/tape_making${uuid}`,
		enabled: !!uuid,
	});

// * COIL * //
// * SFG * //
export const useCommonCoilSFG = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.coilSFG(),
		url: `/zipper/tape-coil/by/nylon`,
	});

export const useCommonCoilSFGByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.coilSFGByUUID(uuid),
		url: `/zipper/tape-coil/by/nylon${uuid}`,
		enabled: !!uuid,
	});

// * Coil to Dyeing
export const useCommonCoilToDyeing = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.coilToDyeing(),
		url: `/zipper/tape-coil-to-dyeing/by/type/nylon`,
	});
export const useCommonCoilToDyeingByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.coilToDyeingByUUID(uuid),
		url: `/zipper/tape-coil-to-dyeing/${uuid}`,
		enabled: !!uuid,
	});

// * Coil To Stock Log * //
export const useCommonCoilToStockLog = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.coilToStock(),
		url: `/zipper/tape-trx/by/coil`,
	});

// * Tape Transfer From Stock
export const useCommonCoilTransfer = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.coilTransfer(),
		url: `/zipper/dyed-tape-transaction-from-stock?item=nylon`,
	});

export const useCommonCoilTransferByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.coilTransferByUUID(uuid),
		url: `/zipper/dyed-tape-transaction-from-stock/${uuid}`,
		enabled: !!uuid,
	});

// * Tape to Dyeing
export const useCommonTapeToDyeing = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.tapeToDyeing(),
		url: `/zipper/tape-coil-to-dyeing/by/type/tape`,
	});

// * PRODUCTION * //
export const useCommonCoilProduction = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.coilProduction(),
		url: `/zipper/tape-coil-production/by/coil`,
	});
export const useCommonCoilProductionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.coilProductionByUUID(uuid),
		url: `/zipper/tape-coil-production/by/coil/${uuid}`,
		enabled: !!uuid,
	});

//* RM *//
export const useCommonCoilRM = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.coilRM(),
		url: `/material/stock/by/single-field/coil_forming`,
	});
export const useCommonCoilRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.coilRMByUUID(uuid),
		url: `/material/stock/by/single-field/coil_forming${uuid}`,
		enabled: !!uuid,
	});

//* RM LOG *//
export const useCommonCoilRMLog = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.coilRMLog(),
		url: `/material/used/by/coil_forming`,
	});
export const useCommonCoilRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.coilRMLogByUUID(uuid),
		url: `/material/used/by/coil_forming${uuid}`,
		enabled: !!uuid,
	});

//* MATERIAL USED *//
export const useCommonMaterialUsed = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.materialUsed(),
		url: `/material/used`,
	});
export const useCommonMaterialUsedByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.materialUsedByUUID(uuid),
		url: `/material/used/${uuid}`,
		enabled: !!uuid,
	});

// * Order Against RM Log * //
export const useCommonOrderAgainstCoilRMLog = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.orderAgainstCoilRMLog(),
		url: `/zipper/material-trx-against-order/by/coil_forming`,
	});
export const useCommonOrderAgainstCoilRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.orderAgainstCoilRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/coil_forming${uuid}`,
		enabled: !!uuid,
	});

// * MATERIAL TRX *//
export const useCommonMaterialTrx = <T>() =>
	useTQuery<T>({
		queryKey: commonQK.materialTrx(),
		url: `/zipper/material-trx-against-order`,
	});
export const useCommonMaterialTrxByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commonQK.materialTrxByUUID(uuid),
		url: `/zipper/material-trx-against-order/${uuid}`,
		enabled: !!uuid,
	});
