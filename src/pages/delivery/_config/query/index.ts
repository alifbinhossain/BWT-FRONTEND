import useTQuery from '@/hooks/useTQuery';

import { deliveryQK } from './queryKeys';

// * vehicle
export const useDeliveryVehicles = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQK.vehicle(),
		url: '/delivery/vehicle',
	});

export const useDeliveryVehicleByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQK.vehicleByUUID(uuid),
		url: `/delivery/vehicle/${uuid}`,
		enabled: !!uuid,
	});
// * courier
export const useDeliveryCourier = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQK.courier(),
		url: '/delivery/courier',
	});

export const useDeliveryCourierByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQK.courierByUUID(uuid),
		url: `/delivery/courier/${uuid}`,
		enabled: !!uuid,
	});

// * challan
export const useDeliveryChallan = <T>() =>
	useTQuery<T>({
		queryKey: deliveryQK.challan(),
		url: '/delivery/challan',
	});

export const useDeliveryChallanByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: deliveryQK.challanByUUID(uuid),
		url: `/delivery/challan-details/by/challan/${uuid}`,
		enabled: !!uuid,
	});
