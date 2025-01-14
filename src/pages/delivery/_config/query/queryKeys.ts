export const deliveryQk = {
	all: () => ['delivery'],

	// *Packing List
	deliveryPackingList: () => [...deliveryQk.all(), 'packing-list'],
	deliveryPackingListByUUID: (uuid: string) => [...deliveryQk.deliveryPackingList(), uuid],
	deliveryPackingListDetailsByUUID: (uuid: string) => [...deliveryQk.all(), 'packing-list', 'details', uuid],

	deliveryPackingListByOrderInfoUUID: (order_info_uuid: string) => [
		...deliveryQk.all(),
		'packing-list',
		'order',
		order_info_uuid,
	],

	deliveryPackingListEntryByPackingListUUIDS: (packing_list_uuids: string[]) => [
		...deliveryQk.all(),
		'packing-list',
		'entry',
		...packing_list_uuids,
	],

	deliveryChallanEntryForPackingListByPackingListUUIDS: (packing_list_uuids: string[]) => [
		...deliveryQk.all(),
		'challan',
		'entry',
		...packing_list_uuids,
	],

	// *Packing List Entry
	deliveryPackingListEntry: () => [...deliveryQk.all(), 'packing-list', 'entry'],
	deliveryPackingListEntryByUUID: (uuid: string) => [...deliveryQk.deliveryPackingListEntry(), uuid],

	// *RM
	deliveryRM: () => [...deliveryQk.all(), 'rm'],
	deliveryRMByUUID: (uuid: string) => [...deliveryQk.deliveryRM(), uuid],

	// *RM Log
	deliveryRMLog: () => [...deliveryQk.all(), 'rm-log'],
	deliveryRMLogByUUID: (uuid: string) => [...deliveryQk.deliveryRMLog(), uuid],

	// *  Order Against Delivery RM Log * //
	orderAgainstDeliveryRMLog: () => [...deliveryQk.all(), 'order-against-rm-log'],
	orderAgainstDeliveryRMLogByUUID: (uuid: string) => [...deliveryQk.orderAgainstDeliveryRMLog(), uuid],
};

export const challanQK = {
	all: () => ['challan'],

	//Challan
	deliveryChallan: () => [...challanQK.all(), 'delivery-challan'],
	deliveryChallanByUUID: (uuid: string) => [...challanQK.deliveryChallan(), uuid],
	deliveryChallanDetailsByUUID: (uuid: string) => [...challanQK.all(), 'delivery-challan', 'details', uuid],

	// Challan Entry
	deliveryChallanEntry: () => [...challanQK.all(), 'delivery-challan-entry'],
	deliveryChallanEntryByUUID: (uuid: string) => [...challanQK.deliveryChallanEntry(), uuid],
	deliveryChallanEntryByChallanUUID: (challanUUID: string) => [
		...challanQK.all(),
		'delivery-challan-entry',
		challanUUID,
	],
};
