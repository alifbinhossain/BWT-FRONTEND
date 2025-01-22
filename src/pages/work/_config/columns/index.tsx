import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { IJobTableData, IProblemsTableData, ISectionTableData } from './columns.type';

//* Problems Columns
export const problemsColumns = (): ColumnDef<IProblemsTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];
//* Job Columns
export const jobColumns = (): ColumnDef<IJobTableData>[] => [
	{
		accessorKey: 'order_id',
		header: 'ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'user_name',
		header: 'Customer',
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
		accessorKey: 'serial_no',
		header: 'Serial No',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'problems_name',
		header: 'Problem',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'accessories',
		header: 'Accessories',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_product_received',
		header: 'Product Received',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'receive_date',
		header: 'Receive Date',
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
//* Section Columns
export const sectionColumns = (): ColumnDef<ISectionTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];
