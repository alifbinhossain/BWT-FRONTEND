const otherQK = {
	all: () => ['other'],

	//* HR
	hr: () => [...otherQK.all(), 'hr'],

	//* Department
	department: () => [...otherQK.all(), 'department'],

	//* Designation
	designation: () => [...otherQK.all(), 'designation'],

	//* Group
	group: () => [...otherQK.all(), 'group'],

	//* Brand
	brand: () => [...otherQK.all(), 'brand'],

	//* Model
	model: () => [...otherQK.all(), 'model'],
	modelByQuery: (query: string) => [...otherQK.all(), 'model', query],

	//* Size
	size: () => [...otherQK.all(), 'size'],

	//* Category
	category: () => [...otherQK.all(), 'category'],

	//* Branch
	branch: () => [...otherQK.all(), 'branch'],

	//* Product
	product: () => [...otherQK.all(), 'product'],

	//* Vendor
	vendor: () => [...otherQK.all(), 'vendor'],

	//* Stock
	stock: () => [...otherQK.all(), 'stock'],

	//* purchase
	purchase: () => [...otherQK.all(), 'purchase'],

	//* Warehouse
	warehouse: () => [...otherQK.all(), 'warehouse'],
	warehouseByQuery: (query: string) => [...otherQK.all(), 'warehouse', query],

	//* Room
	room: () => [...otherQK.all(), 'room'],

	//* Rack
	rack: () => [...otherQK.all(), 'rack'],

	//* Floor
	floor: () => [...otherQK.all(), 'floor'],

	//* Box
	box: () => [...otherQK.all(), 'box'],

	//* Problem
	problem: (query: string) => [...otherQK.all(), 'problem', query],

	//*Section
	section: () => [...otherQK.all(), 'section'],

	//* User
	user: () => [...otherQK.all(), 'user'],
	userByQuery: (query: string) => [...otherQK.all(), 'byUserQuery', query],

	//* Vehicle
	vehicle: () => [...otherQK.all(), 'vehicle'],

	//*courier
	courier: () => [...otherQK.all(), 'courier'],

	//* Order
	order: () => [...otherQK.all(), 'order'],

	//* Accessories
	accessories: () => [...otherQK.all(), 'accessories'],

	//* Zone
	zone: () => [...otherQK.all(), 'zone'],

	//* Work Place
	workPlace: () => [...otherQK.all(), 'workPlace'],

	//* Sub Department
	subDepartment: () => [...otherQK.all(), 'subDepartment'],

	//* Leave Policy
	leavePolicy: () => [...otherQK.all(), 'leavePolicy'],

	//* Employment Type
	employmentType: () => [...otherQK.all(), 'employmentType'],

	//* Shift Group
	shiftGroup: () => [...otherQK.all(), 'shiftGroup'],
	//*leave category
	leaveCategory: (query?: string) => [...otherQK.all(), 'leaveCategory', query],

	//* Employees
	employees: (query?: string) => [...otherQK.all(), 'employees', query],

	//* Device List
	deviceList: () => [...otherQK.all(), 'device-list'],
};

export default otherQK;
