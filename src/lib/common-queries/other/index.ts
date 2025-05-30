import useTQuery from '@/hooks/useTQuery';

import otherQK from './query-keys';

//* GET OTHER HR
export const useOtherHR = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.hr(),
		url: `/other/hr/value/label`,
	});

//* GET OTHER DEPARTMENT
export const useOtherDepartment = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.department(),
		url: `/other/department/value/label`,
	});

//* GET OTHER SUB DEPARTMENT
export const useOtherSubDepartment = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.subDepartment(),
		url: `/other/sub-department/value/label`,
	});

//* GET OTHER Designation
export const useOtherDesignation = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.designation(),
		url: `/other/designation/value/label`,
	});

//* GET OTHER GROUP
export const useOtherGroup = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.group(),
		url: `/other/group/value/label`,
	});

//* GET OTHER BRAND
export const useOtherBrand = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.brand(),
		url: `/other/brand/value/label`,
	});

//* GET OTHER MODEL
export const useOtherModel = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.model(),
		url: `/other/model/value/label`,
	});

export const useOtherModelByQuery = <T>(query: string) =>
	useTQuery<T>({
		queryKey: otherQK.modelByQuery(query),
		url: `/other/model/value/label?${query}`,
	});

//* GET OTHER SIZE
export const useOtherSize = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.size(),
		url: `/other/size/value/label`,
	});

//* GET OTHER CATEGORY
export const useOtherCategory = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.category(),
		url: `/other/category/value/label`,
	});

//* GET OTHER PRODUCT
export const useOtherProduct = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.product(),
		url: query ? `/other/product/value/label${query}` : `/other/product/value/label`,
	});

//* GET OTHER VENDOR
export const useOtherVendor = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.vendor(),
		url: `/other/vendor/value/label`,
	});

//* GET OTHER STOCK
export const useOtherStock = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.stock(),
		url: `/other/stock/value/label`,
	});

//* GET OTHER BRANCH
export const useOtherBranch = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.branch(),
		url: `/other/branch/value/label`,
	});

//* GET OTHER PURCHASE
export const useOtherPurchase = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.purchase(),
		url: `/other/purchase/value/label`,
	});

//* GET OTHER WAREHOUSE
export const useOtherWarehouse = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.warehouse(),
		url: `/other/warehouse/value/label`,
	});
export const useOtherWarehouseByQuery = <T>(query: string) =>
	useTQuery<T>({
		queryKey: otherQK.warehouseByQuery(query),
		url: `/other/warehouse/value/label?${query}`,
	});

//* GET OTHER ROOM
export const useOtherRoom = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.room(),
		url: `/other/room/value/label`,
	});

//* GET OTHER RACK
export const useOtherRack = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.rack(),
		url: `/other/rack/value/label`,
	});

//* GET OTHER FLOOR
export const useOtherFloor = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.floor(),
		url: `/other/floor/value/label`,
	});

//* GET OTHER BOX
export const useOtherBox = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.box(),
		url: `/other/box/value/label`,
	});

//* GET OTHER PROBLEM
export const useOtherProblem = <T>(query: string) =>
	useTQuery<T>({
		queryKey: otherQK.problem(query),
		url: `/other/problem/value/label?category=${query}`,
	});
//* GET OTHER SECTION
export const useOtherSection = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.section(),
		url: `/other/section/value/label`,
	});

//* GET OTHER USER
export const useOtherUser = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.user(),
		url: `/other/user/value/label`,
	});
export const useOtherUserByQuery = <T>(query: string) =>
	useTQuery<T>({
		queryKey: otherQK.userByQuery(query),
		url: `/other/user/value/label${query}`,
	});
//* GET OTHER VEHICLE
export const useOtherVehicle = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.vehicle(),
		url: `/other/vehicle/value/label`,
	});
//* GET OTHER COURIER
export const useOtherCourier = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.courier(),
		url: `/other/courier/value/label`,
	});

//* GET OTHER ORDER
export const useOtherOrder = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.order(),
		url: `/other/order/value/label`,
	});
//* GET OTHER Accessories
export const useOtherAccessories = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.accessories(),
		url: `/other/accessory/value/label`,
	});

//* GET OTHER ZONE
export const useOtherZone = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.zone(),
		url: `/other/zone/value/label`,
	});

//* GET OTHER WORKPLACE
export const useOtherWorkplace = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.workPlace(),
		url: `/other/workplace/value/label`,
	});

//* GET OTHER EMPLOYMENT TYPE
export const useOtherEmploymentType = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.employmentType(),
		url: `/other/employment-type/value/label`,
	});

//* GET OTHER SHIFT GROUP
export const useOtherShiftGroup = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.shiftGroup(),
		url: `/other/shift-group/value/label`,
	});

//* GET OTHER LEAVE POLICY
export const useOtherLeavePolicy = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.leavePolicy(query),
		url: query ? `/other/leave-policy/value/label?${query}` : `/other/leave-policy/value/label`,
	});

//* GET OTHER LEAVE EMPLOYEE
export const useOtherEmployees = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.employees(query),
		url: query ? `/other/employee/value/label?${query}` : `/other/employee/value/label`,
		enabled: query ? !!query : true,
	});
//* GET OTHER LEAVE CATEGORY
export const useOtherLeaveCategory = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.leaveCategory(query),
		url: query ? `/other/leave-category/value/label?${query}` : `/other/leave-category/value/label`,
		enabled: query ? !!query : true,
	});

//* GET OTHER DEVICE LIST
export const useOtherDeviceList = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.deviceList(),
		url: `${query ? `/other/device-list/value/label?${query}` : `/other/device-list/value/label`}`,
		enabled: query ? !!query : true,
	});
//* GET OTHER SHIFTS
export const useOtherShifts = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.shifts(query),
		url: `${query ? `/other/shifts/value/label?${query}` : `/other/shift/value/label`}`,
		enabled: query ? !!query : true,
	});
//* GET OTHER ROASTER 
export const useOtherRoaster = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: otherQK.roaster(query),
		url: `${query ? `/other/roaster/value/label?${query}` : `/other/roaster/value/label`}`,
		enabled: query ? !!query : true,
	});


//* GET OTHER LINE MANAGERS
export const useOtherLineManager = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.lineManager(),
		url: `/other/employee/value/label?is_line_manager=true`,
	});

//* GET OTHER HR MANAGERS
export const useOtherHrManager = <T>() =>
	useTQuery<T>({
		queryKey: otherQK.hrManager(),
		url: `/other/employee/value/label?is_hr=true`,
	});
