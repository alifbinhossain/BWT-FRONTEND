import { ColumnDef, Row } from '@tanstack/react-table';
import { number } from 'zod';

import PageAssign from '@/components/buttons/page-assign';
import ResetPassword from '@/components/buttons/reset-password';
import StatusButton from '@/components/buttons/status';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import {
	IBoxTableData,
	IBranchTableData,
	IBrandTableData,
	ICategoryTableData,
	IFloorTableData,
	IGroupTableData,
	IProductTableData,
	IPurchaseDetails,
	IPurchaseEntryTableData,
	IPurchaseTableData,
	IRackTableData,
	IRoomTableData,
	ISizeTableData,
	IStockTableData,
	IVendorTableData,
	IWarehouseTableData,
} from './columns.type';

// Group Columns
export const groupColumns = (): ColumnDef<IGroupTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Category Columns
export const categoryColumns = (): ColumnDef<ICategoryTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'group_name',
		header: 'Group',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Brand Columns
export const brandColumns = (): ColumnDef<IBrandTableData>[] => [
	{
		accessorKey: 'brand_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Size Columns
export const sizeColumns = (): ColumnDef<ISizeTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Vendor Columns
export const vendorColumns = (): ColumnDef<IVendorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'brand_name',
		header: 'Brand',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'company_name',
		header: 'Company',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
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

// Product Columns
export const productColumns = (): ColumnDef<IProductTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'category_name',
		header: 'Category',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'brand_name',
		header: 'Brand',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'size_name',
		header: 'Size',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warranty_days',
		header: 'Warranty Days',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'service_warranty_days',
		header: 'Service Warranty',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'is_maintaining_stock',
		header: 'Maintaining Stock',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusButton value={info.getValue() as boolean} />;
		},
	},
];

// Purchase Columns
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
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'branch_name',
		header: 'Branch',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
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
		cell: (info) => info.getValue(),
	},
];
// Purchase Entry Columns
export const purchaseEntryColumns = (): ColumnDef<IPurchaseEntryTableData>[] => [
	{
		accessorKey: 'stock_id',
		header: 'Stock',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'serial_no',
		header: 'Serial No',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'price_per_unit',
		header: 'Price Per Unit',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'discount',
		header: 'Discount',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Stock Columns
export const stockColumns = (): ColumnDef<IStockTableData>[] => [
	{
		accessorKey: 'stock_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warehouse_1',
		header: 'Warehouse 1',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warehouse_2',
		header: 'Warehouse 2',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warehouse_3',
		header: 'Warehouse 3',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Branch Columns
export const branchColumns = (): ColumnDef<IBranchTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Warehouse Columns
export const warehouseColumns = (): ColumnDef<IWarehouseTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'branch_name',
		header: 'Branch',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Room Columns
export const roomColumns = (): ColumnDef<IRoomTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Warehouse',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Rack Columns
export const rackColumns = (): ColumnDef<IRackTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'room_name',
		header: 'Room',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Floor Columns
export const floorColumns = (): ColumnDef<IFloorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'rack_name',
		header: 'Rack',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Box Columns
export const boxColumns = (): ColumnDef<IBoxTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'floor_name',
		header: 'Rack',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
