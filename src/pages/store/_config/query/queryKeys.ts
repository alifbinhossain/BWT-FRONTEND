import { IParams } from '@/types';

export const storeQK = {
	all: () => ['store'],

	// department
	department: () => [...storeQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...storeQK.department(), uuid],

	// designation
	designation: () => [...storeQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...storeQK.designation(), uuid],

	// user
	userDefault: () => [...storeQK.all(), 'user'],
	user: ({ start_date, end_date, status }: IParams) => [...storeQK.userDefault(), start_date, end_date, status],
	userByUUID: (uuid: string) => [...storeQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...storeQK.userDefault(), 'can-access', uuid],

	// group
	group: () => [...storeQK.all(), 'group'],
	groupByUUID: (uuid: string) => [...storeQK.group(), uuid],

	// category
	category: () => [...storeQK.all(), 'category'],
	categoryByUUID: (uuid: string) => [...storeQK.category(), uuid],

	//brand
	brand: () => [...storeQK.all(), 'brand'],
	brandByUUID: (uuid: string) => [...storeQK.brand(), uuid],

	//size
	size: () => [...storeQK.all(), 'size'],
	sizeByUUID: (uuid: string) => [...storeQK.size(), uuid],

	// vendor
	vendor: () => [...storeQK.all(), 'vendor'],
	vendorByUUID: (uuid: string) => [...storeQK.vendor(), uuid],

	// product
	product: () => [...storeQK.all(), 'product'],
	productByUUID: (uuid: string) => [...storeQK.product(), uuid],

	// stock
	stock: () => [...storeQK.all(), 'stock'],
	stockByUUID: (uuid: string) => [...storeQK.stock(), uuid],

	//branch
	branch: () => [...storeQK.all(), 'branch'],
	branchByUUID: (uuid: string) => [...storeQK.branch(), uuid],

	//warehouse
	warehouse: () => [...storeQK.all(), 'warehouse'],
	warehouseByUUID: (uuid: string) => [...storeQK.warehouse(), uuid],

	//Rack
	rack: () => [...storeQK.all(), 'rack'],
	rackByUUID: (uuid: string) => [...storeQK.rack(), uuid],

	//room
	room: () => [...storeQK.all(), 'room'],
	roomByUUID: (uuid: string) => [...storeQK.room(), uuid],

	//Floor
	floor: () => [...storeQK.all(), 'floor'],
	floorByUUID: (uuid: string) => [...storeQK.floor(), uuid],

	//Box
	box: () => [...storeQK.all(), 'box'],
	boxByUUID: (uuid: string) => [...storeQK.box(), uuid],

	//Purchase
	purchase: () => [...storeQK.all(), 'purchase'],
	purchaseByUUID: (uuid: string) => [...storeQK.purchase(), uuid],
};
