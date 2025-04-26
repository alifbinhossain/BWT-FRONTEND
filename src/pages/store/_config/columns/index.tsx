import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { IFormSelectOption } from '@/components/core/form/types';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import {
	IBoxTableData,
	IBranchTableData,
	IBrandTableData,
	ICategoryTableData,
	IFloorTableData,
	IGroupTableData,
	IInternalTransferTableData,
	IModelTableData,
	IProductTableData,
	IPurchaseEntryTableData,
	IPurchaseReturnEntryTableData,
	IPurchaseReturnTableData,
	IPurchaseTableData,
	IRackTableData,
	IRoomTableData,
	ISizeTableData,
	IStockTableData,
	ITransferTableData,
	IVendorTableData,
	IWarehouseTableData,
} from './columns.type';

//* Group Columns
export const groupColumns = (): ColumnDef<IGroupTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];

//* Category Columns
export const categoryColumns = (): ColumnDef<ICategoryTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'group_name',
		header: 'Group',
		enableColumnFilter: false,
	},
];

//* Brand Columns
export const brandColumns = (): ColumnDef<IBrandTableData>[] => [
	{
		accessorKey: 'brand_id',
		header: 'ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];
//* Model Columns
export const modelColumns = (): ColumnDef<IModelTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'brand_name',
		header: 'Brand',
		enableColumnFilter: false,
	},
];

//* Size Columns
export const sizeColumns = (): ColumnDef<ISizeTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];

//* Vendor Columns
export const vendorColumns = (): ColumnDef<IVendorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_name',
		header: 'Model',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'company_name',
		header: 'Company',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_active',
		header: 'Active',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusButton value={info.getValue() as boolean} />;
		},
	},
];

//* Product Columns
export const productColumns = ({
	actionTrxAccess,
	actionOrderAgainstTrxAccess,
	warehouse,
	handleAgainstTrx,
	handleOrderAgainstWarehouse1Trx,
	handleOrderAgainstWarehouse2Trx,
	handleOrderAgainstWarehouse3Trx,
	handleOrderAgainstWarehouse4Trx,
	handleOrderAgainstWarehouse5Trx,
	handleOrderAgainstWarehouse6Trx,
	handleOrderAgainstWarehouse7Trx,
	handleOrderAgainstWarehouse8Trx,
	handleOrderAgainstWarehouse9Trx,
	handleOrderAgainstWarehouse10Trx,
	handleOrderAgainstWarehouse11Trx,
	handleOrderAgainstWarehouse12Trx,
}: {
	actionTrxAccess: boolean;
	actionOrderAgainstTrxAccess: boolean;
	warehouse: { label: string; value: string; assigned: string }[] | undefined;
	handleAgainstTrx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse1Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse2Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse3Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse4Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse5Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse6Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse7Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse8Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse9Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse10Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse11Trx: (row: Row<any>) => void;
	handleOrderAgainstWarehouse12Trx: (row: Row<any>) => void;
}): ColumnDef<IProductTableData>[] => [
	{
		accessorKey: 'is_maintaining_stock',
		header: 'Maintaining Stock',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusButton value={info.getValue() as boolean} />;
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'category_name',
		header: 'Category',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_name',
		header: 'Model',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'size_name',
		header: 'Size',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warranty_days',
		header: 'Warranty Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'service_warranty_days',
		header: 'Service Warranty',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: false,
	},
	{
		id: 'action_trx',
		header: 'Internal Transfer',
		cell: (info) => <Transfer onClick={() => handleAgainstTrx(info.row)} />,
		size: 40,
		meta: {
			hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
	},
	{
		accessorKey: 'warehouse_1',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_1')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse1Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_2',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_2')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse2Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_3',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_3')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse3Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_4',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_4')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse4Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_5',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_5')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse5Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_6',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_6')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse6Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_7',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_7')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse7Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_8',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_8')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse8Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_9',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_9')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse9Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_10',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_10')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse10Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_11',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_11')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse11Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'warehouse_12',
		header: `${warehouse?.find((item) => item.assigned === 'warehouse_12')?.label}`,
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex items-center gap-2'>
					<span>{info.getValue() as string}</span>
					<Transfer
						onClick={() => handleOrderAgainstWarehouse12Trx(info.row)}
						disabled={!actionOrderAgainstTrxAccess}
					/>
				</div>
			);
		},
	},
];

//* Purchase Columns
export const purchaseColumns = (): ColumnDef<IPurchaseTableData>[] => [
	{
		accessorKey: 'purchase_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/store/purchase/${uuid}/details`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'branch_name',
		header: 'Branch',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'date',
		header: 'Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'payment_mode',
		header: 'Payment Mode',
		enableColumnFilter: false,
	},
];
//* Purchase Entry Columns
export const purchaseEntryColumns = (): ColumnDef<IPurchaseEntryTableData>[] => [
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'serial_no',
		header: 'Serial No',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'price_per_unit',
		header: 'Price Per Unit',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'discount',
		header: 'Discount',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Warehouse',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'rack_name',
		header: 'Rack',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'floor_name',
		header: 'Floor',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'box_name',
		header: 'Box',
		enableColumnFilter: false,
	},
];

//* Purchase Return Columns
export const purchaseReturnColumns = (): ColumnDef<IPurchaseReturnTableData>[] => [
	{
		accessorKey: 'purchase_return_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/store/purchase-return/${uuid}/details`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'purchase_id',
		header: 'Purchase ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Warehouse',
		enableColumnFilter: false,
	},
];

//* Purchase Return Entry Columns
export const purchaseReturnEntryColumns = (): ColumnDef<IPurchaseReturnEntryTableData>[] => [
	{
		accessorKey: 'product_name',
		header: 'Product ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'price_per_unit',
		header: 'Price Per Unit',
		enableColumnFilter: false,
	},
];

//* Stock Columns
export const stockColumns = ({
	actionTrxAccess,
	handleAgainstTrx,
}: {
	actionTrxAccess: boolean;
	handleAgainstTrx: (row: Row<any>) => void;
}): ColumnDef<IStockTableData>[] => [
	{
		accessorKey: 'stock_id',
		header: 'ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
	},
	{
		id: 'action_trx',
		header: 'Internal Transfer',
		cell: (info) => <Transfer onClick={() => handleAgainstTrx(info.row)} />,
		size: 40,
		meta: {
			hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
	},
	{
		accessorKey: 'warehouse_1',
		header: 'Warehouse 1',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warehouse_2',
		header: 'Warehouse 2',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warehouse_3',
		header: 'Warehouse 3',
		enableColumnFilter: false,
	},
];

//* Branch Columns
export const branchColumns = (): ColumnDef<IBranchTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: false,
	},
];

//* Warehouse Columns
export const warehouseColumns = (): ColumnDef<IWarehouseTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'assigned',
		header: 'Assigned',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'branch_name',
		header: 'Branch',
		enableColumnFilter: false,
	},
];

//* Internal Transfer Columns
export const internalTransferColumns = (): ColumnDef<IInternalTransferTableData>[] => [
	{
		accessorKey: 'internal_transfer_id',
		header: 'ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'from_warehouse_name',
		header: 'From',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'to_warehouse_name',
		header: 'To',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'rack_name',
		header: 'Rack',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'floor_name',
		header: 'Floor',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'box_name',
		header: 'Box',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
	},
];
//* Transfer Columns
export const transferColumns = (): ColumnDef<ITransferTableData>[] => [
	{
		accessorKey: 'order_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.order_uuid;
			const info_uuid = info.row.original.info_uuid;
			return (
				<LinkOnly
					uri={`/work/info/details/${info_uuid}/order/details/${uuid}`}
					title={info.getValue() as string}
				/>
			);
		},
	},
	{
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.info_uuid;
			return <LinkOnly uri={`/work/info/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Warehouse',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
	},
];
//* Room Columns
export const roomColumns = (): ColumnDef<IRoomTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Warehouse',
		enableColumnFilter: false,
	},
];

//* Rack Columns
export const rackColumns = (): ColumnDef<IRackTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'room_name',
		header: 'Room',
		enableColumnFilter: false,
	},
];

//* Floor Columns
export const floorColumns = (): ColumnDef<IFloorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'rack_name',
		header: 'Rack',
		enableColumnFilter: false,
	},
];

//* Box Columns
export const boxColumns = (): ColumnDef<IBoxTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'floor_name',
		header: 'Rack',
		enableColumnFilter: false,
	},
];
