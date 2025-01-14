import useTQuery from '@/hooks/useTQuery';

import { commercialQK } from './queryKeys';

// * Bank * //
export const useCommercialBank = <T>() =>
	useTQuery<T>({
		queryKey: commercialQK.bank(),
		url: '/commercial/bank',
	});

export const useCommercialBankByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commercialQK.bankByUUID(uuid),
		url: `/commercial/bank/${uuid}`,
		enabled: !!uuid,
	});

// * PI * //
export const useCommercialPI = <T>() =>
	useTQuery<T>({
		queryKey: commercialQK.pi(),
		url: '/commercial/pi-cash?is_cash=false',
	});

export const useCommercialPIByQuery = <T>(query: string) =>
	useTQuery<T>({
		queryKey: commercialQK.piByQuery(query),
		url: `/commercial/pi-cash${query}`,
	});

export const useCommercialPICash = <T>() =>
	useTQuery<T>({
		queryKey: commercialQK.piCash(),
		url: '/commercial/pi-cash?is_cash=true',
	});

export const useCommercialPIByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commercialQK.piByUUID(uuid),
		url: `/commercial/pi-cash/${uuid}`,
		enabled: !!uuid,
	});

export const useCommercialPIDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commercialQK.piDetailsByUUID(uuid),
		url: `/commercial/pi-cash/details/${uuid}`,
		enabled: !!uuid,
	});

export const useCommercialPIDetailsByPiId = <T>(pi_cash_id: string) =>
	useTQuery<T>({
		queryKey: commercialQK.piDetailsByPiID(pi_cash_id),
		url: `/commercial/pi-cash/details/by/pi-cash-id/${pi_cash_id}`,
		enabled: !!pi_cash_id,
	});

// * PI Entry * //
export const useCommercialPIEntry = <T>() =>
	useTQuery<T>({
		queryKey: commercialQK.piEntry(),
		url: '/commercial/pi-cash-entry',
	});

export const useCommercialPIEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commercialQK.piEntryByUUID(uuid),
		url: `/commercial/pi-cash-entry/${uuid}`,
		enabled: !!uuid,
	});

// * PI by orderInfoIds * //
export const useCommercialPIByOrderInfo = <T>(
	orderInfoIds: string,
	partyId: string,
	marketingId: string,
	params: string
) =>
	useTQuery<T>({
		queryKey: commercialQK.piByOrderInfo(orderInfoIds, partyId, marketingId),

		url: params
			? `/commercial/pi-cash/details/by/order-info-ids/${orderInfoIds}/${partyId}/${marketingId}?${params}`
			: `/commercial/pi-cash/details/by/order-info-ids/${orderInfoIds}/${partyId}/${marketingId}`,
		enabled: !!orderInfoIds && orderInfoIds.length > 0 && !!partyId && !!marketingId,
	});

export const useCommercialPThreadByOrderInfo = <T>(
	orderInfoIds: string,
	partyId: string,
	marketingId: string,
	params: string
) =>
	useTQuery<T>({
		queryKey: commercialQK.piThreadByOrderInfo(orderInfoIds, partyId, marketingId),

		url: params
			? `/commercial/pi-cash/thread-details/by/order-info-ids/${orderInfoIds}/${partyId}/${marketingId}?${params}`
			: `/commercial/pi-cash/thread-details/by/order-info-ids/${orderInfoIds}/${partyId}/${marketingId}`,
		enabled: !!orderInfoIds && orderInfoIds.length > 0 && !!partyId && !!marketingId,
	});

// * LC * //
export const useCommercialLC = <T>() =>
	useTQuery<T>({
		queryKey: commercialQK.lc(),
		url: '/commercial/lc',
	});

export const useCommercialLCByQuery = <T>(query: string) =>
	useTQuery<T>({
		queryKey: commercialQK.lcByQuery(query),
		url: `/commercial/lc${query}`,
	});

export const useCommercialLCByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commercialQK.lcByUUID(uuid),
		url: `/commercial/lc/${uuid}`,
		enabled: !!uuid,
	});

export const useCommercialLCPIByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: commercialQK.lcByPi(uuid),
		url: `/commercial/lc-pi-cash/by/${uuid}`,
		enabled: !!uuid,
	});

export const useCommercialLCByNumber = <T>(number: string) =>
	useTQuery<T>({
		queryKey: commercialQK.lcByNumber(number),
		url: `/commercial/lc/by/lc-number/${number}`,
		enabled: !!number,
	});
