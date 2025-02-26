import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import {
	IDiagnosisTableData,
	IInfoTableData,
	IOrderTableData,
	IProblemsTableData,
	IProcessTableData,
	ISectionTableData,
} from './columns.type';

//* Problems Columns
export const problemsColumns = (): ColumnDef<IProblemsTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'category',
		header: 'Category',
		enableColumnFilter: false,
	},
];
//* Info Columns
export const infoColumns = (): ColumnDef<IInfoTableData>[] => [
	{
		accessorKey: 'info_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/work/info/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'user_name',
		header: 'Customer',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_product_received',
		header: 'Product Received',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'received_date',
		header: 'Receive Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
//* Order Columns
export const orderColumns = ({
	actionTrxAccess,
	handleAgainstTrx,
}: {
	actionTrxAccess?: boolean;
	handleAgainstTrx?: (row: Row<any>) => void;
} = {}): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_diagnosis_need',
		header: 'Diagnosis Need',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'order_id',
		header: 'ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
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
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'problems_name',
		header: 'Problem',
		enableColumnFilter: false,
		cell: (info) => {
			const value = info.row.original.problems_name as string[];
			return (
				<div className='flex flex-wrap gap-1'>
					{value?.map((item, index) => (
						<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
							{item.replace(/_/g, ' ')}
						</span>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => {
			return row.accessories
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Accessories',
		enableColumnFilter: false,
		cell: (info) => {
			const value = info.row.original.accessories as string[];
			return (
				<div className='flex flex-wrap gap-1'>
					{value?.map((item, index) => (
						<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
							{item.replace(/_/g, ' ')}
						</span>
					))}
				</div>
			);
		},
	},
	{
		id: 'action_trx',
		header: 'Section Transfer',
		cell: (info) => <Transfer onClick={() => handleAgainstTrx?.(info.row)} />,
		size: 40,
		meta: {
			hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
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
//* Diagnosis Columns
export const diagnosisColumns = ({
	actionTrxAccess,
	handleAgainstTrx,
}: {
	actionTrxAccess: boolean;
	handleAgainstTrx: (row: Row<any>) => void;
}): ColumnDef<IDiagnosisTableData>[] => [
	{
		accessorKey: 'diagnosis_id',
		header: 'Diagnosis ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'order_id',
		header: 'Order ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.order_uuid;
			return <LinkOnly uri={`/work/order/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'problems_name',
		header: 'Diagnosis Problem',
		enableColumnFilter: false,
		cell: (info) => {
			const value = info.row.original.problems_name as string[];
			return (
				<div className='flex flex-wrap gap-1'>
					{value?.map((item, index) => (
						<span key={index} className='rounded-[10px] bg-accent px-2 py-1 capitalize text-white'>
							{item.replace(/_/g, ' ')}
						</span>
					))}
				</div>
			);
		},
	},
	{
		accessorKey: 'problem_statement',
		header: 'Diagnosis Problem Statement',
		enableColumnFilter: false,
	},

	{
		accessorKey: 'status',
		header: 'Diagnosis Status',
		enableColumnFilter: false,
		cell: (info) => {
			const status = info.getValue() as string;
			const bgColorClass =
				{
					accepted: 'bg-success',
					rejected: 'bg-red-500',
					not_repairable: 'bg-gray-500',
					pending: 'bg-warning',
				}[status.toLowerCase()] || '';

			return <span className={`rounded px-2 py-1 capitalize text-white ${bgColorClass}`}>{status}</span>;
		},
	},
	{
		accessorKey: 'status_update_date',
		header: 'Diagnosis Status Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'proposed_cost',
		header: 'Proposed Cost',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_proceed_to_repair',
		header: 'Proceed to Repair',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		id: 'action_trx',
		header: 'Section Transfer',
		cell: (info) => (
			<Transfer onClick={() => handleAgainstTrx(info.row)} disabled={!info.row.original.is_proceed_to_repair} />
		),
		size: 40,
		meta: {
			hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
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
//*Process Columns
export const processColumns = (): ColumnDef<IProcessTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'section_name',
		header: 'Section',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'process_id',
		header: 'Process ID',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'status',
		header: 'Process Status',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<>
					<StatusButton value={info.getValue() as boolean} />
					{info.row.original.status_update_date ? (
						<DateTime date={new Date(info.row.original.status_update_date)} isTime={false} />
					) : (
						''
					)}
				</>
			);
		},
	},
	{
		accessorKey: 'status_update_date',
		header: 'Status Update Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'is_transferred_for_qc',
		header: 'Transfer QC',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'is_ready_for_delivery',
		header: 'Ready for Delivery',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'problems_name',
		header: 'Process Problem',
		enableColumnFilter: false,
		cell: (info) => {
			const value = info.row.original.problems_name as string[];
			if (value?.length === 0) {
				return <></>;
			}
			return (
				<div className='flex flex-wrap gap-1'>
					{value?.map((item, index) => <span key={index}>{item?.replace(/_/g, ' ')}</span>)}
					<br />
				</div>
			);
		},
	},
	{
		accessorKey: 'problem_statement',
		header: 'Process Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'engineer_name',
		header: 'Engineer',
		enableColumnFilter: false,
	},
];
