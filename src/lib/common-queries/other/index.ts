import useTQuery from '@/hooks/useTQuery';

import otherQK from './query-keys';

// GET OTHER GROUP
export const useOtherGroup = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.group(),
		url: `/other/group/value/label`,
	});

//GET OTHER BRAND
export const useOtherBrand = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.brand(),
		url: `/other/brand/value/label`,
	});
//GET OTHER SIZE
export const useOtherSize = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.size(),
		url: `/other/size/value/label`,
	});
//GET OTHER CATEGORY
export const useOtherCategory = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.category(),
		url: `/other/category/value/label`,
	});
//GET OTHER PRODUCT
export const useOtherProduct = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.product(),
		url: `/other/product/value/label`,
	});
//GET OTHER STOCK
export const useOtherStock = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.stock(),
		url: `/other/stock/value/label`,
	});

//GET OTHER Branch
export const useOtherBranch = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.branch(),
		url: `/other/branch/value/label`,
	});

//GET OTHER WAREHOUSE
export const useOtherWarehouse = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.warehouse(),
		url: `/other/warehouse/value/label`,
	});

//GET OTHER ROOM
export const useOtherRoom = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.room(),
		url: `/other/room/value/label`,
	});

//GET OTHER RACK
export const useOtherRack = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.rack(),
		url: `/other/rack/value/label`,
	});

//GET OTHER FLOOR
export const useOtherFloor = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.floor(),
		url: `/other/floor/value/label`,
	});

//GET OTHER BOX
export const useOtherBox = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.box(),
		url: `/other/box/value/label`,
	});
