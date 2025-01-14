import useTQuery from '@/hooks/useTQuery';

import { challanQK, deliveryQk } from './queryKeys';

// * Challan
export const useDeliveryChallan = <T>() =>
	useTQuery<T>({
		queryKey: challanQK.deliveryChallan(),
		url: '/delivery/challan',
	});

export const useDeliveryChallanByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: challanQK.deliveryChallanByUUID(uuid),
		url: `/delivery/challan/${uuid}`,
		enabled: !!uuid,
	});
export const useDeliveryChallanDetailsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: challanQK.deliveryChallanDetailsByUUID(uuid),
		url: `/delivery/challan/details/${uuid}`,
		enabled: !!uuid,
	});

export const useDeliveryChallanEntry = <T>() =>
	useTQuery<T>({
		queryKey: challanQK.deliveryChallanEntry(),
		url: '/delivery/challan-entry',
	});

export const useDeliveryChallanEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: challanQK.deliveryChallanEntryByUUID(uuid),
		url: `/delivery/challan-entry/${uuid}`,
	});

export const useDeliveryChallanEntryByChallanUUID = <T>(challanUUID: string) =>
	useTQuery<T>({
		queryKey: challanQK.deliveryChallanEntryByChallanUUID(challanUUID),
		url: `/delivery/challan-entry/by/${challanUUID}`,
	});

// * Packing List
export const useDeliveryPackingList = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryPackingList(),
		url: '/delivery/packing-list',
	});

export const useDeliveryPackingListByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryPackingListByUUID(uuid),
		url: `/delivery/packing-list/${uuid}`,
		enabled: !!uuid,
	});

export const useDeliveryPackingListDetailsByUUID = <T>(uuid: string, query?: string) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryPackingListDetailsByUUID(uuid),
		url: `/delivery/packing-list/details/${uuid}?${query}`,
		enabled: !!uuid,
	});
export const useDeliveryPackingListEntryByPackingListUUID = <T>(packing_list_uuids: string[]) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryPackingListEntryByPackingListUUIDS(packing_list_uuids),

		url: `/delivery/packing-list-entry/by/multi-packing-list-uuid/${packing_list_uuids?.join(',')}`,
		enabled: !!packing_list_uuids && packing_list_uuids?.length > 0,
	});

export const useDeliveryChallanEntryForPackingListByPackingListUUID = <T>(packing_list_uuids: string[]) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryChallanEntryForPackingListByPackingListUUIDS(packing_list_uuids),
		url: `/delivery/challan-entry-for-packing-list-multi/by/${packing_list_uuids?.join(',')}`,
		enabled: !!packing_list_uuids && packing_list_uuids?.length > 0,
	});

export const useDeliveryPackingListByOrderInfoUUID = <T>(order_info_uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryPackingListByOrderInfoUUID(order_info_uuid),
		url: `/delivery/order-for-packing-list/${order_info_uuid}`,
		enabled: !!order_info_uuid,
	});

export const useDeliveryPackingListEntry = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryPackingListEntry(),
		url: `/delivery/packing-list-entry`,
	});
export const useDeliveryPackingListEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryPackingListEntryByUUID(uuid),
		url: `/delivery/packing-list-entry/${uuid}`,
		enabled: !!uuid,
	});

// * RM
export const useDeliveryRM = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryRM(),
		url: '/material/stock/by/multi-field/m_qc_and_packing,n_qc_and_packing,v_qc_and_packing,s_qc_and_packing',
	});

export const useDeliveryRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryRMByUUID(uuid),
		url: '/material/stock/by/multi-field/m_qc_and_packing,n_qc_and_packing,v_qc_and_packing,s_qc_and_packing',
	});

// * RM Log
export const useDeliveryRMLog = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryRMLog(),
		url: '/material/used/multi-section/by/m_qc_and_packing,n_qc_and_packing,v_qc_and_packing,s_qc_and_packing',
	});
export const useDeliveryRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQk.deliveryRMLogByUUID(uuid),
		url: '/material/used/multi-section/by/m_qc_and_packing,n_qc_and_packing,v_qc_and_packing,s_qc_and_packing',
	});
// *  Order Against Delivery RM Log * //
export const useOrderAgainstDeliveryRMLog = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQk.orderAgainstDeliveryRMLog(),
		url: '/zipper/material-trx-against-order/multiple/by/m_qc_and_packing,n_qc_and_packing,v_qc_and_packing,s_qc_and_packing',
	});
export const useOrderAgainstDeliveryRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQk.orderAgainstDeliveryRMLogByUUID(uuid),
		url: '/zipper/material-trx-against-order/multiple/by/m_qc_and_packing,n_qc_and_packing,v_qc_and_packing,s_qc_and_packing',
	});
