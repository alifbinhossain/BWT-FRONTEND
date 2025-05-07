import { ColumnDef, Row } from '@tanstack/react-table';
import { MessageSquareMore, Pin, User } from 'lucide-react';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import { CustomLink } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { Location, Problem, Product } from '../utils/component';
import { LocationName, ProductName } from '../utils/function';
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
			const { uuid } = info.row.original;
			return (
				<CustomLink url={`/work/info/details/${uuid}`} label={info.getValue() as string} openInNewTab={true} />
			);
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
type IOrderColumns = {
	actionTrxAccess?: boolean;
	actionProceedToRepair?: boolean;
	handleAgainstTrx?: (row: Row<any>) => void;
	handleProceedToRepair?: (row: Row<any>) => void;
};
export const orderColumnsForDetails = ({
	actionTrxAccess,
	actionProceedToRepair,
	handleAgainstTrx,
	handleProceedToRepair,
}: IOrderColumns = {}): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_diagnosis_need',
		header: () => (
			<>
				Diagnosis <br />
				Need
			</>
		),
		size: 40,
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'is_proceed_to_repair',
		header: () => (
			<>
				Proceed to <br />
				Repair
			</>
		),
		size: 40,
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'order_id',
		header: 'Order ID',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			const info_uuid = info.row.original.info_uuid;
			return (
				<CustomLink
					url={`/work/info/details/${info_uuid}/order/details/${uuid}`}
					label={info.getValue() as string}
					openInNewTab={true}
				/>
			);
		},
	},
	{
		accessorFn: (row) => ProductName(row),
		id: 'product',
		header: 'Product',
		enableColumnFilter: false,
		cell: (info) => {
			const { brand_name, model_name, serial_no } = info.row.original;
			return <Product brand_name={brand_name} model_name={model_name} serial_no={serial_no} />;
		},
	},
	{
		accessorKey: 'quantity',
		header: 'QTY',
		size: 40,
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
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
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
		header: () => (
			<>
				Section <br />
				Transfer
			</>
		),
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
		accessorFn: (row) => LocationName(row),
		id: 'location',
		header: 'Location',
		enableColumnFilter: false,
		size: 170,
		cell: (info) => {
			const { branch_name, warehouse_name, rack_name, floor_name, box_name } = info.row.original;
			console.log(info.row.original);
			return (
				<Location
					branch_name={branch_name}
					warehouse_name={warehouse_name}
					rack_name={rack_name}
					floor_name={floor_name}
					box_name={box_name}
				/>
			);
		},
	},
];
export const orderColumns = ({
	actionTrxAccess,
	actionProceedToRepair,
	handleAgainstTrx,
	handleProceedToRepair,
}: IOrderColumns = {}): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_diagnosis_need',
		header: () => (
			<>
				Diagnosis <br />
				Need
			</>
		),
		size: 40,
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'is_proceed_to_repair',
		header: () => (
			<>
				Proceed to <br />
				Repair
			</>
		),
		size: 40,
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
				<CustomLink
					url={`/work/info/details/${info_uuid}/order/details/${uuid}`}
					label={info.getValue() as string}
					openInNewTab={true}
				/>
			);
		},
	},
	{
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const { info_uuid, user_name } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<div className='flex gap-2'>
						<User size={14} />
						{user_name}
					</div>
				</div>
			);
		},
	},
	{
		accessorFn: (row) => ProductName(row),
		id: 'product',
		header: 'Product',
		size: 170,
		enableColumnFilter: false,
		cell: (info) => {
			const { brand_name, model_name, serial_no } = info.row.original;
			return <Product brand_name={brand_name} model_name={model_name} serial_no={serial_no} />;
		},
	},
	{
		accessorKey: 'quantity',
		header: 'QTY',
		size: 40,
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
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
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
		header: () => (
			<>
				Section <br />
				Transfer
			</>
		),
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
		accessorFn: (row) => LocationName(row),
		id: 'location',
		header: 'Location',
		enableColumnFilter: false,
		size: 170,
		cell: (info) => {
			const { branch_name, warehouse_name, rack_name, floor_name, box_name } = info.row.original;
			return (
				<Location
					branch_name={branch_name}
					warehouse_name={warehouse_name}
					rack_name={rack_name}
					floor_name={floor_name}
					box_name={box_name}
				/>
			);
		},
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
			<div className='flex items-center gap-1'>
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
				<CustomLink
					url={`/work/info/details/${info_uuid}/order/details/${uuid}`}
					label={info.getValue() as string}
					openInNewTab={true}
				/>
			);
		},
	},
	{
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const { info_uuid, user_name } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<div className='flex gap-2'>
						<User size={14} />
						{user_name}
					</div>
				</div>
			);
		},
	},
	{
		accessorFn: (row) => ProductName(row),
		id: 'product',
		header: 'Product',
		enableColumnFilter: false,
		cell: (info) => {
			const { brand_name, model_name, serial_no } = info.row.original;
			return <Product brand_name={brand_name} model_name={model_name} serial_no={serial_no} />;
		},
	},
	{
		accessorKey: 'quantity',
		header: 'QTY',
		size: 40,
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
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
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
		accessorFn: (row) => LocationName(row),
		id: 'location',
		header: 'Location',
		enableColumnFilter: false,
		size: 170,
		cell: (info) => {
			const { branch_name, warehouse_name, rack_name, floor_name, box_name } = info.row.original;
			return (
				<Location
					branch_name={branch_name}
					warehouse_name={warehouse_name}
					rack_name={rack_name}
					floor_name={floor_name}
					box_name={box_name}
				/>
			);
		},
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
			<div className='flex items-center gap-1'>
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
			<div className='flex items-center gap-1'>
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
				<CustomLink
					url={`/work/info/details/${info_uuid}/order/details/${uuid}`}
					label={info.getValue() as string}
					openInNewTab={true}
				/>
			);
		},
	},
	{
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const { info_uuid, user_name } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<div className='flex gap-2'>
						<User size={14} />
						{user_name}
					</div>
				</div>
			);
		},
	},
	{
		accessorFn: (row) => ProductName(row),
		id: 'product',
		header: 'Product',
		enableColumnFilter: false,
		cell: (info) => {
			const { brand_name, model_name, serial_no } = info.row.original;
			return <Product brand_name={brand_name} model_name={model_name} serial_no={serial_no} />;
		},
	},
	{
		accessorKey: 'quantity',
		header: 'QTY',
		size: 40,
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
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
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
		accessorFn: (row) => LocationName(row),
		id: 'location',
		header: 'Location',
		enableColumnFilter: false,
		size: 170,
		cell: (info) => {
			const { branch_name, warehouse_name, rack_name, floor_name, box_name } = info.row.original;
			return (
				<Location
					branch_name={branch_name}
					warehouse_name={warehouse_name}
					rack_name={rack_name}
					floor_name={floor_name}
					box_name={box_name}
				/>
			);
		},
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
				<CustomLink
					url={`/work/info/details/${info_uuid}/order/details/${uuid}`}
					label={info.getValue() as string}
					openInNewTab={true}
				/>
			);
		},
	},
	{
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const { info_uuid, user_name } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<div className='flex gap-2'>
						<User size={14} />
						{user_name}
					</div>
				</div>
			);
		},
	},
	{
		accessorFn: (row) => ProductName(row),
		id: 'product',
		header: 'Product',
		enableColumnFilter: false,
		cell: (info) => {
			const { brand_name, model_name, serial_no } = info.row.original;
			return <Product brand_name={brand_name} model_name={model_name} serial_no={serial_no} />;
		},
	},
	{
		accessorKey: 'quantity',
		header: 'QTY',
		size: 40,
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
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
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
		accessorFn: (row) => LocationName(row),
		id: 'location',
		header: 'Location',
		enableColumnFilter: false,
		size: 170,
		cell: (info) => {
			const { branch_name, warehouse_name, rack_name, floor_name, box_name } = info.row.original;
			return (
				<Location
					branch_name={branch_name}
					warehouse_name={warehouse_name}
					rack_name={rack_name}
					floor_name={floor_name}
					box_name={box_name}
				/>
			);
		},
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
				<CustomLink
					url={`/work/info/details/${info_uuid}/order/details/${uuid}`}
					label={info.getValue() as string}
					openInNewTab={true}
				/>
			);
		},
	},
	{
		accessorKey: 'info_id',
		header: 'Info ID',
		enableColumnFilter: false,
		cell: (info) => {
			const { info_uuid, user_name } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<div className='flex gap-2'>
						<User size={14} />
						{user_name}
					</div>
				</div>
			);
		},
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
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
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
			<div className='flex items-center gap-1'>
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
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
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
