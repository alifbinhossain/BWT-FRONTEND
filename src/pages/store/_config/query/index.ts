import useTQuery from '@/hooks/useTQuery';

import { storeQK } from './queryKeys';

// * Group
export const useStoreGroups = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.group(),
		url: '/store/group',
	});

export const useStoreGroupsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.groupByUUID(uuid),
		url: `/store/group/${uuid}`,
		enabled: !!uuid,
	});

//* Category
export const useStoreCategories = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.category(),
		url: '/store/category',
	});

export const useStoreCategoriesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.categoryByUUID(uuid),
		url: `/store/category/${uuid}`,
		enabled: !!uuid,
	});

//*Brand

export const useStoreBrands = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.brand(),
		url: '/store/brand',
	});

export const useStoreBrandsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.brandByUUID(uuid),
		url: `/store/brand/${uuid}`,
		enabled: !!uuid,
	});

//* Model

export const useStoreModels = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.model(),
		url: '/store/model',
	});

export const useStoreModelsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.modelByUUID(uuid),
		url: `/store/model/${uuid}`,
		enabled: !!uuid,
	});

//* Size

export const useStoreSizes = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.size(),
		url: '/store/size',
	});

export const useStoreSizesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.sizeByUUID(uuid),
		url: `/store/size/${uuid}`,
		enabled: !!uuid,
	});

//*Vendor

export const useStoreVendors = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.vendor(),
		url: '/store/vendor',
	});

export const useStoreVendorsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.vendorByUUID(uuid),
		url: `/store/vendor/${uuid}`,
		enabled: !!uuid,
	});

//* Product

export const useStoreProducts = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.product(),
		url: '/store/product',
	});

export const useStoreProductsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.productByUUID(uuid),
		url: `/store/product/${uuid}`,
		enabled: !!uuid,
	});

//* Stock
export const useStoreStocks = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.stock(),
		url: '/store/stock',
	});

export const useStoreStocksByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.stockByUUID(uuid),
		url: `/store/stock/${uuid}`,
		enabled: !!uuid,
	});

//*Branch
export const useStoreBranches = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.branch(),
		url: '/store/branch',
	});

export const useStoreBranchesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.branchByUUID(uuid),
		url: `/store/branch/${uuid}`,
		enabled: !!uuid,
	});

//* Warehouse
export const useStoreWarehouses = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.warehouse(),
		url: '/store/warehouse',
	});

export const useStoreWarehousesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.warehouseByUUID(uuid),
		url: `/store/warehouse/${uuid}`,
		enabled: !!uuid,
	});

//* Room
export const useStoreRooms = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.room(),
		url: '/store/room',
	});

export const useStoreRoomsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.roomByUUID(uuid),
		url: `/store/room/${uuid}`,
		enabled: !!uuid,
	});

//* Rack
export const useStoreRacks = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.rack(),
		url: '/store/rack',
	});

export const useStoreRacksByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.rackByUUID(uuid),
		url: `/store/rack/${uuid}`,
		enabled: !!uuid,
	});

//* Floor
export const useStoreFloors = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.floor(),
		url: '/store/floor',
	});

export const useStoreFloorsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.floorByUUID(uuid),
		url: `/store/floor/${uuid}`,
		enabled: !!uuid,
	});
//* Box
export const useStoreBoxes = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.box(),
		url: '/store/box',
	});

export const useStoreBoxesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.boxByUUID(uuid),
		url: `/store/box/${uuid}`,
		enabled: !!uuid,
	});

//* Purchase
export const useStorePurchases = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.purchase(),
		url: '/store/purchase',
	});

export const useStorePurchasesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.purchaseByUUID(uuid),
		url: `/store/purchase/purchase-entry-details/by/${uuid}`,
		enabled: !!uuid,
	});
export const useStorePurchaseEntry = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.purchaseEntry(),
		url: '/store/purchase-entry',
	});
export const useStorePurchaseEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.purchaseEntryByUUID(uuid),
		url: `/store/purchase-entry/${uuid}`,
		enabled: !!uuid,
	});
//* Purchase Return
export const useStorePurchaseReturn = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.purchaseReturn(),
		url: '/store/purchase-return',
	});

export const useStorePurchaseReturnByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.purchaseReturnByUUID(uuid),
		url: `/store/purchase-return/purchase-return-entry-details/by/${uuid}`,
		enabled: !!uuid,
	});

export const useStorePurchaseReturnEntry = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.purchaseReturnEntry(),
		url: '/store/purchase-return-entry',
	});
export const useStorePurchaseReturnEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.purchaseReturnEntryByUUID(uuid),
		url: `/store/purchase-return-entry/${uuid}`,
		enabled: !!uuid,
	});

//* Internal Transfer
export const useStoreInternalTransfers = <T>() =>
	useTQuery<T>({
		queryKey: storeQK.internalTransfer(),
		url: '/store/internal-transfer',
	});

export const useStoreInternalTransfersByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.internalTransferByUUID(uuid),
		url: `/store/internal-transfer/${uuid}`,
		enabled: !!uuid,
	});

//* Order Transfer
export const useStoreOrderTransfers = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: storeQK.orderTransfer(query),
		url: query ? `/store/product-transfer${query}` : '/store/product-transfer',
	});

export const useStoreOrderTransfersByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: storeQK.orderTransferByUUID(uuid),
		url: `/store/product-transfer/${uuid}`,
		enabled: !!uuid,
	});
