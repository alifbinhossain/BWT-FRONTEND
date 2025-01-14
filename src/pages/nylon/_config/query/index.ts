//* Metallic Finishing

import useTQuery from '@/hooks/useTQuery';

import { nylonQK } from './queryKeys';

// * Production
export const useNylonMFProduction = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMFProduction(),
		url: '/zipper/sfg/by/finishing?item_name=nylon&nylon_stopper=metallic',
	});

//* Production Log
export const useNylonMFProductionLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMFProductionLog(),
		url: '/zipper/sfg-production/by/finishing?item_name=nylon&nylon_stopper=metallic',
	});

export const useNylonMFProductionLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMFProductionLogByUUID(uuid),
		url: `/zipper/sfg-production/${uuid}`,
		enabled: !!uuid,
	});

//* Trx Log
export const useNylonMFTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMFTrxLog(),
		url: '/zipper/sfg-transaction/by/finishing_prod?item_name=nylon&nylon_stopper=metallic',
	});

export const useNylonMFTrxLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMFTrxLogByUUID(uuid),
		url: `/zipper/sfg-transaction/${uuid}`,
		enabled: !!uuid,
	});

// * RM
export const useNylonMetallicFinishingRM = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMetallicFinishingRM(),
		url: '/material/stock/by/multi-field/n_t_cutting,n_stopper',
	});
export const useNylonMetallicFinishingRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMetallicFinishingRMByUUID(uuid),
		url: `/material/stock/by/multi-field/n_t_cutting,n_stopper/${uuid}`,
	});

//* RM Log
export const useNylonMetallicFinishingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMetallicFinishingRMLog(),
		url: '/material/used/multi-section/by/n_t_cutting,n_stopper',
	});
export const useNylonMetallicFinishingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMetallicFinishingRMLogByUUID(uuid),
		url: `/material/used/multi-section/by/n_t_cutting,n_stopper/${uuid}`,
		enabled: !!uuid,
	});

// * Order Against RM Log
export const useOrderAgainstNylonMetallicFinishingRMLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.orderAgainstNylonFinishingRMLog(),
		url: '/zipper/material-trx-against-order/multiple/by/n_t_cutting,n_stopper',
	});
export const useOrderAgainstNylonMetallicFinishingRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.orderAgainstNylonFinishingRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/multiple/by/n_t_cutting,n_stopper${uuid}`,
		enabled: !!uuid,
	});

// * Tape Log
export const useNylonMetallicFinishingTapeLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMetallicTapeLog(),
		url: '/zipper/dyed-tape-transaction/by/nylon?nylon_stopper=metallic',
	});
export const useNylonMetallicFinishingTapeLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonMetallicTapeLogByUUID(uuid),
		url: `/zipper/dyed-tape-transaction/by/nylon_metallic_finishing/${uuid}`,
		enabled: !!uuid,
	});

//*Plastic Finishing
//*Tape Log
export const useNylonPlasticFinishingTapeLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonPlasticFinishingTapeLog(),
		url: '/zipper/dyed-tape-transaction/by/nylon?nylon_stopper=plastic',
	});
export const useNylonPlasticFinishingTapeLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonPlasticFinishingTapeLogByUUID(uuid),
		url: `/zipper/dyed-tape-transaction/by/nylon_plastic_finishing/${uuid}`,
		enabled: !!uuid,
	});

//* Production Log
export const useNylonPlasticFinishingProductionLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonPlasticFinishingProductionLog(),
		url: '/zipper/sfg-production/by/finishing?item_name=nylon&stopper_type=plastic stopper',
	});
export const useNylonPlasticFinishingProductionLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonPlasticFinishingProductionLogByUUID(uuid),
		url: `/zipper/sfg-production/${uuid}`,
		enabled: !!uuid,
	});

//* Trx Log
export const useNylonPlasticFinishingTrxLog = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonPlasticFinishingTrxLog(),
		url: '/zipper/sfg-transaction/by/finishing_prod?item_name=nylon&stopper_type=plastic stopper',
	});

export const useNylonPlasticFinishingTrxLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: nylonQK.nylonPlasticFinishingTrxLogByUUID(uuid),
		url: `/zipper/sfg-transaction/${uuid}`,
		enabled: !!uuid,
	});

// * PRODUCTION
export const useNylonPlasticFinishingProduction = <T>() =>
	useTQuery<T>({
		queryKey: nylonQK.nylonPlasticProduction(),
		url: '/zipper/sfg/by/finishing?item_name=nylon&nylon_stopper=plastic',
	});
