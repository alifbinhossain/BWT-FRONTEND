const otherQK = {
	all: () => ['other'],
	//Group
	group: () => [...otherQK.all(), 'group'],

	//Brand
	brand: () => [...otherQK.all(), 'brand'],
	//Size
	size: () => [...otherQK.all(), 'size'],
	//Category
	category: () => [...otherQK.all(), 'category'],

	//Branch
	branch: () => [...otherQK.all(), 'branch'],

	//Product
	product: () => [...otherQK.all(), 'product'],

	//Stock
	stock: () => [...otherQK.all(), 'stock'],

	//Warehouse
	warehouse: () => [...otherQK.all(), 'warehouse'],

	//Room
	room: () => [...otherQK.all(), 'room'],

	//Rack
	rack: () => [...otherQK.all(), 'rack'],

	//Floor
	floor: () => [...otherQK.all(), 'floor'],
	//Box
	box: () => [...otherQK.all(), 'box'],
};

export default otherQK;
