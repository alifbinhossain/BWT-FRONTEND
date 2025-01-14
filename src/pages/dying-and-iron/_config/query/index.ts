import useTQuery from '@/hooks/useTQuery';

import { dyeingQK } from './queryKeys';

//* RM
export const useDyeingRM = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.dyeingRM(),
		url: `/material/stock/by/single-field/dying_and_iron`,
	});
export const useDyeingRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.dyeingRMByUUID(uuid),
		url: `/material/stock/by/single-field/dying_and_iron/${uuid}`,
		enabled: !!uuid,
	});

//* RM Log
export const useDyeingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.dyeingRMLog(),
		url: `/material/used/by/dying_and_iron`,
	});
export const useDyeingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.dyeingRMLogByUUID(uuid),
		url: `/material/used/by/dying_and_iron${uuid}`,
		enabled: !!uuid,
	});

// * Info
export const useDyeingSwatch = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.swatch(),
		url: '/zipper/sfg-swatch',
	});

export const useDyeingSwatchByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.swatchByUUID(uuid),
		url: `/zipper/sfg-swatch/${uuid}`,
		enabled: !!uuid,
	});

// * Planning_sno
export const useDyeingPlanning = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.planning(),
		url: '/zipper/planning',
	});

export const useDyeingPlanningByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.planningByUUID(uuid),
		url: `/zipper/planning/${uuid}`,
		enabled: !!uuid,
	});

// * Batch
export const useDyeingBatch = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.batch(),
		url: '/zipper/batch',
	});

export const useDyeingBatchByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.batchByUUID(uuid),
		url: `/zipper/batch/${uuid}`,
		enabled: !!uuid,
	});

// * Thread Batch
export const useDyeingThreadBatch = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.threadBatch(),
		url: '/thread/batch',
	});

export const useDyeingThreadBatchByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.threadBatchByUUID(uuid),
		url: `/thread/batch/${uuid}`,
		enabled: !!uuid,
	});

//* Thread Batch Entry
export const useDyeingThreadBatchEntry = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.threadBatchEntry(),
		url: '/thread/batch-entry',
	});

export const useDyeingThreadBatchEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.threadBatchEntryByUUID(uuid),
		url: `/thread/batch-entry${uuid}`,
		enabled: !!uuid,
	});

//* Order Against RM Log
export const useOrderAgainstDyeingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.orderAgainstDyeingRMLog(),
		url: `/zipper/material-trx-against-order/by/dying_and_iron`,
	});
export const useOrderAgainstDyeingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.orderAgainstDyeingRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/dying_and_iron${uuid}`,
		enabled: !!uuid,
	});

//Dyeing Transfer
export const useDyeingTransfer = <T>() =>
	useTQuery<T>({
		queryKey: dyeingQK.dyeingTransfer(),
		url: '/zipper/dyed-tape-transaction',
	});
export const useDyeingTransferByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: dyeingQK.dyeingTransferByUUID(uuid),
		url: `/zipper/dyed-tape-transaction${uuid}`,
		enabled: !!uuid,
	});
