import useTQuery from '@/hooks/useTQuery';

import { threadQK } from './queryKeys';

//Count-length
export const useThreadCountLength = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.countLength(),
		url: '/thread/count-length',
	});

export const useThreadCountLengthByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.countLengthByUUID(uuid),
		url: `/thread/count-length/${uuid}`,
		enabled: !!uuid,
	});

//Machine
export const useThreadMachine = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.machine(),
		url: '/public/machine',
	});

export const useThreadMachineByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.machineByUUID(uuid),
		url: `/public/machine/${uuid}`,
		enabled: !!uuid,
	});

//Order-info
export const useThreadOrderInfo = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.orderInfo(),
		url: '/v2/thread/order-info',
	});
export const useThreadOrderInfoByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.orderInfoByUUID(uuid),
		url: `/v2/thread/order-info/${uuid}`,
		enabled: !!uuid,
	});

export const useThreadOrderInfoDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.orderInfoDetailsByUUID(uuid),
		url: `/v2/thread/order-info-details/by/${uuid}`,
		enabled: !!uuid,
	});

//Order-info-entry
export const useThreadOrderInfoEntry = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.orderInfoEntry(),
		url: '/v2/thread/order-entry',
	});
export const useThreadOrderInfoEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.orderInfoEntryByUUID(uuid),
		url: `/v2/thread/order-entry/${uuid}`,
		enabled: !!uuid,
	});

//Swatch
export const useThreadSwatch = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.swatch(),
		url: '/thread/order-swatch',
	});
export const useThreadSwatchByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.swatchByUUID(uuid),
		url: `/thread/order-swatch/${uuid}`,
		enabled: !!uuid,
	});

//*DyesCategory
export const useThreadDyesCategory = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.dyesCategory(),
		url: '/thread/dyes-category',
	});
export const useThreadDyesCategoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.dyesCategoryByUUID(uuid),
		url: `/thread/dyes-category/${uuid}`,
		enabled: !!uuid,
	});

//*Programs
export const useThreadPrograms = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.programs(),
		url: '/thread/programs',
	});
export const useThreadProgramsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.programsByUUID(uuid),
		url: `/thread/programs${uuid}`,
		enabled: !!uuid,
	});

// * Coning
export const useDyeingCone = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.coning(),
		url: '/thread/batch-entry-details',
	});

//* coning production
export const useConeProdByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.ConningProdByUUID(uuid),
		url: `/thread/batch-entry-production/${uuid}`,
		enabled: !!uuid,
	});

//* coning trx
export const useConeTrxByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.ConningTrxByUUID(uuid),
		url: `/thread/batch-entry-trx/${uuid}`,
		enabled: !!uuid,
	});

//* log
export const useConningProdLog = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.ConningProdlog(),
		url: '/thread/batch-entry-production-details',
	});

export const useConningTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.ConningTrxlog(),
		url: '/thread/batch-entry-trx-details',
	});

//* Challan
export const useThreadChallan = <T>() =>
	useTQuery<T>({
		queryKey: threadQK.challan(),
		url: '/thread/challan',
	});

export const useThreadOrderDetailsForChallanByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.challanByUUID(uuid),
		url: `/thread/order-details-for-challan/by/${uuid}`,
		enabled: !!uuid,
	});

export const useThreadChallanDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: threadQK.challanDetailsByUUID(uuid),
		url: `/thread/challan-details/by/${uuid}`,
		enabled: !!uuid,
	});
