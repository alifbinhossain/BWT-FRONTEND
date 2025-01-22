import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { IDiagnosisTableData, IJobTableData } from './columns.type';

//* Job Columns
export const jobColumns: ColumnDef<IJobTableData>[] = [
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
// id: string;
// uuid: string;
// order_uuid: string;
// engineer_uuid: string;
// problems_uuid: string[];
// problem_statement: string;
// status: boolean;
// status_update_date: string;
// proposed_cost: number;
// is_proceed_to_repair: boolean;
// remarks: string;
// created_by: string;
// created_at: string;
// updated_at: string;
//* Diagnosis Columns
const diagnosisColumns: ColumnDef<IDiagnosisTableData>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'order_uuid',
		header: 'Job ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'engineer_uuid',
		header: 'Engineer',
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
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status_update_date',
		header: 'Status Update Date',
		enableColumnFilter: false,
	},

	{
		accessorKey: 'is_proceed_to_repair',
		header: 'Proceed to Repair',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'proposed_cost',
		header: 'Proposed Cost',
		enableColumnFilter: false,
	},
];
