import { IWarehouseFetch, IWarehouseKey } from './columns.type';

export const getWarehouseAndBranch = (warehouse: IWarehouseFetch, warehouse_id: IWarehouseKey) => {
	const foundWarehouse = warehouse?.find((item) => item.assigned === warehouse_id);
	const name = foundWarehouse?.label;
	const [warehouse_name, branch_name] = name?.split('(') || [];
	return [warehouse_name, branch_name];
};
