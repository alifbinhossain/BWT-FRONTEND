import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import {
	IAccessoriesTableData,
	IDiagnosisTableData,
	IInfoTableData,
	IOrderTableData,
	IProblemsTableData,
	IProcessTableData,
	ISectionTableData,
	IZoneTableData,
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
		header: 'Info ID',
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
		accessorKey: 'user_phone',
		header: 'Phone Number',
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
	actionProceedToRepair,
	handleAgainstTrx,
	handleProceedToRepair,
}: {
	actionTrxAccess?: boolean;
	actionProceedToRepair?: boolean;
	handleAgainstTrx?: (row: Row<any>) => void;
	handleProceedToRepair?: (row: Row<any>) => void;
} = {}): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_diagnosis_need',
		header: () => (
			<div className='flex items-center gap-2'>
				<span>
					Diagnosis <br />
					Need
				</span>
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'is_proceed_to_repair',
		header: () => (
			<div className='flex items-center gap-2'>
				<span>
					Proceed to <br />
					Repair
				</span>
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => (
			<Switch checked={info.getValue() as boolean} onCheckedChange={() => handleProceedToRepair?.(info.row)} />
		),
		meta: {
			hidden: !actionProceedToRepair,
			disableFullFilter: true,
		},
	},
	{
		accessorKey: 'order_id',
		header: 'Order ID',
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
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.info_uuid;
			return <LinkOnly uri={`/work/info/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'brand_name',
		header: 'Brand',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_name',
		header: 'Model',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'serial_no',
		header: 'Serial No',
		enableColumnFilter: false,
		size: 30,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => {
			return row.problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Problem',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => {
			return row.accessories_name
				?.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Accessories',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
	},
	{
		id: 'action_trx',
		header: 'Section Transfer',
		cell: (info) => (
			<Transfer onClick={() => handleAgainstTrx?.(info.row)} disabled={!info.row.original.is_proceed_to_repair} />
		),
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
export const QCColumns = ({
	handelDeliveryStatusChange,
	haveDeliveryAccess,
}: {
	handelDeliveryStatusChange?: (row: Row<any>) => void;
	haveDeliveryAccess?: boolean;
} = {}): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_ready_for_delivery',
		header: () => (
			<div className='flex items-center gap-2'>
				<span>
					Ready For <br />
					Delivery
				</span>
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => (
			<Switch
				checked={info.getValue() as boolean}
				onCheckedChange={() => handelDeliveryStatusChange?.(info.row)}
				disabled={!haveDeliveryAccess}
			/>
		),
	},
	{
		accessorKey: 'order_id',
		header: 'Order ID',
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
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.info_uuid;
			return <LinkOnly uri={`/work/info/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'brand_name',
		header: 'Brand',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_name',
		header: 'Model',
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
		accessorFn: (row) => {
			return row.problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Problem',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => {
			return row.accessories_name
				?.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Accessories',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
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
export const RepairingColumns = ({
	handelDeliveryStatusChange,
	haveDeliveryAccess,
	handelQCStatusChange,
	haveQCAccess,
}: {
	handelDeliveryStatusChange?: (row: Row<any>) => void;
	haveDeliveryAccess?: boolean;
	handelQCStatusChange?: (row: Row<any>) => void;
	haveQCAccess?: boolean;
} = {}): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_transferred_for_qc',
		header: () => (
			<div className='flex items-center gap-2'>
				<span>
					Transfer For <br />
					QC
				</span>
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => (
			<Switch
				checked={info.getValue() as boolean}
				onCheckedChange={() => handelQCStatusChange?.(info.row)}
				disabled={!haveQCAccess}
			/>
		),
	},
	{
		accessorKey: 'is_ready_for_delivery',
		header: () => (
			<div className='flex items-center gap-2'>
				<span>
					Ready For <br />
					Delivery
				</span>
			</div>
		),
		enableColumnFilter: false,
		cell: (info) => (
			<Switch
				checked={info.getValue() as boolean}
				onCheckedChange={() => handelDeliveryStatusChange?.(info.row)}
				disabled={!haveDeliveryAccess}
			/>
		),
	},
	{
		accessorKey: 'order_id',
		header: 'Order ID',
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
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.info_uuid;
			return <LinkOnly uri={`/work/info/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'brand_name',
		header: 'Brand',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_name',
		header: 'Model',
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
		accessorFn: (row) => {
			return row.problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Problem',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => {
			return row.accessories_name
				?.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Accessories',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
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
export const ReadyDeliveryColumns = (): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'order_id',
		header: 'Order ID',
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
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.info_uuid;
			return <LinkOnly uri={`/work/info/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'brand_name',
		header: 'Brand',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'model_name',
		header: 'Model',
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
		accessorFn: (row) => {
			return row.problems_name
				?.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Problem',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorFn: (row) => {
			return row.accessories_name
				?.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Accessories',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
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
		accessorFn: (row) => {
			return row.problems_name
				?.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Problem',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
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
		cell: (info) => {
			const status = info.getValue() as string;
			const bgColorClass =
				{
					accepted: 'bg-success',
					rejected: 'bg-red-500',
					not_repairable: 'bg-gray-500',
					pending: 'bg-warning',
				}[status.toLowerCase()] || '';

			return (
				<div>
					<span className={`rounded px-2 py-1 capitalize text-white ${bgColorClass}`}>{status}</span>
					<DateTime
						date={
							info.row.original.status_update_date ? new Date(info.row.original.status_update_date) : null
						}
						isTime={false}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'proposed_cost',
		header: 'Proposed Cost',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_proceed_to_repair',
		header: () => (
			<div className='flex items-center gap-2'>
				<span>
					Proceed to <br />
					Repair
				</span>
			</div>
		),
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
	// {
	// 	accessorKey: 'process_id',
	// 	header: 'Process ID',
	// 	enableColumnFilter: false,
	// },
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
		accessorFn: (row) => {
			return row.problems_name
				?.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Problem',
		enableColumnFilter: false,
		cell: (info) => info.getValue() as string,
	},
	{
		accessorKey: 'problem_statement',
		header: 'Problem Statement',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'engineer_name',
		header: 'Engineer',
		enableColumnFilter: false,
	},
];
export const zoneColumns = (): ColumnDef<IZoneTableData>[] => [
	{
		accessorKey: 'division',
		header: 'Division',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		size: 350,
	},
	{
		accessorKey: 'latitude',
		header: 'latitude',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'longitude',
		header: 'longitude',
		enableColumnFilter: false,
	},
];

//* Accessories Columns
export const accessoriesColumns = (): ColumnDef<IAccessoriesTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
];
