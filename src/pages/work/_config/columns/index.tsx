import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { IDiagnosisTableData, IJobTableData, IProblemsTableData } from './columns.type';

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
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'user_uuid',
		header: 'User',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_uuid',
		header: 'Model',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'size_uuid',
		header: 'Size',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'serial_no',
		header: 'Serial No',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'problem_uuid',
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
		accessorKey: 'warehouse_uuid',
		header: 'Warehouse',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'rack_uuid',
		header: 'Rack',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'floor_uuid',
		header: 'Floor',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'box_uuid',
		header: 'Box',
		enableColumnFilter: false,
	},
];
//* Section Columns
export const sectionColumns = (): ColumnDef<IProblemsTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];
