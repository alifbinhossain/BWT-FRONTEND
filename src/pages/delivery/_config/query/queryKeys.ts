export const deliveryQK = {
	all: () => ['delivery'],

	//* vehicle
	vehicle: () => [...deliveryQK.all(), 'vehicle'],
	vehicleByUUID: (uuid: string) => [...deliveryQK.vehicle(), uuid],
	// * courier
	courier: () => [...deliveryQK.all(), 'courier'],
	courierByUUID: (uuid: string) => [...deliveryQK.courier(), uuid],
	// * challan
	challan: () => [...deliveryQK.all(), 'challan'],
	challanByUUID: (uuid: string) => [...deliveryQK.challan(), uuid],
};
