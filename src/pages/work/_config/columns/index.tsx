import { ColumnDef, Row } from '@tanstack/react-table';
import { User } from 'lucide-react';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import ColumnImage from '@/components/core/data-table/_views/column-image';
import { CustomLink } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import { Location, OrderImages, Problem, Product, TableForColumn, UserNamePhone } from '../utils/component';
import { LocationName, ProductName } from '../utils/function';
import {
	IAccessoriesTableData,
	IDiagnosisTableData,
	IInfoTableData,
	IOrderTableData,
	IProblemsTableData,
	IProcessTableData,
	ISectionTableData,
	ITransferTableData,
	IZoneTableData,
} from './columns.type';
import {
	IAccessoriesTableData,
	IDiagnosisTableData,
	IInfoTableData,
	IOrderTableData,
	IProblemsTableData,
	IProcessTableData,
	ISectionTableData,
	ITransferTableData,
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
		accessorFn: (row) => row.user_name + ' - ' + row.user_phone,
		header: 'Customer',
		enableColumnFilter: false,
		cell: (info) => {
			const { user_name, user_phone } = info.row.original;

			return (
				<div className='flex items-center gap-2'>
					<UserNamePhone user_name={user_name} phone={user_phone} />
				</div>
			);
		},
	},
	{
		accessorKey: 'branch_name',
		header: 'Branch',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'is_product_received',
		size: 32,
		header: () => (
			<>
				Product <br />
				Received
			</>
		),
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'received_date',
		header: 'Receive Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorFn: (row) => row.delivered_count + '/' + row.order_count,
		header: 'Delivered',
		enableColumnFilter: false,
	},
	// {
	// 	accessorKey: 'user_phone',
	// 	header: 'Phone Number',
	// 	enableColumnFilter: false,
	// },

	{
		accessorKey: 'submitted_by',
		header: 'Submitted By',
		enableColumnFilter: false,
		cell: (info) => <span className='capitalize'>{info.getValue() as string}</span>,
	},
];
//* Order Columns
type IOrderColumns = {
	actionTrxAccess?: boolean;
	actionProceedToRepair?: boolean;
	handleAgainstTrx?: (row: Row<any>) => void;
	handleProceedToRepair?: (row: Row<any>) => void;
	actionDiagnosisNeed?: boolean;
	handelDiagnosisStatusChange?: (row: Row<any>) => void;
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
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		size: 40,
		cell: (info) => {
			const status = info.getValue() as string;
			const bgColorClass =
				{
					accepted: 'bg-success',
					rejected: 'bg-red-500',
					not_repairable: 'bg-gray-500',
					pending: 'bg-warning',
				}[status?.toLowerCase()] || '';

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
		accessorKey: 'diagnosis_proposed_cost',
		header: () => (
			<>
				Proposed <br /> Cost
			</>
		),
		size: 40,
		enableColumnFilter: false,
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
		accessorKey: 'is_transferred_for_qc',
		header: () => (
			<>
				Transfer to <br />
				QC
			</>
		),
		size: 40,
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'is_ready_for_delivery',
		header: () => (
			<>
				Ready for <br />
				Delivery
			</>
		),
		size: 40,
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'bill_amount',
		header: () => (
			<>
				Bill <br /> Amount
			</>
		),
		size: 40,
		enableColumnFilter: false,
	},
	{
		accessorKey: 'ready_for_delivery_date',
		header: () => (
			<>
				Ready For <br /> Delivery Date
			</>
		),
		size: 40,
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
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
			return row.order_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Order Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: (info) => {
			const { image_1, image_2, image_3 } = info.row.original;

			return <OrderImages image_1={image_1} image_2={image_2} image_3={image_3} />;
		},
	},
	{
		accessorFn: (row) => {
			return row.diagnosis_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Diagnosis Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { diagnosis_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={diagnosis_problem_statement} />
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.repairing_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Repairing Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { repairing_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={repairing_problem_statement} />
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.qc_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'QC Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { qc_problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={qc_problem_statement} />;
		},
	},
	{
		accessorFn: (row) => {
			return row.delivery_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Delivery Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { delivery_problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={delivery_problem_statement} />;
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
export const orderColumns = ({
	actionTrxAccess,
	actionProceedToRepair,
	handleAgainstTrx,
	handleProceedToRepair,
	actionDiagnosisNeed,
	handelDiagnosisStatusChange,
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
		cell: (info) => (
			<Switch
				checked={info.getValue() as boolean}
				onCheckedChange={() => handelDiagnosisStatusChange?.(info.row)}
			/>
		),
		meta: {
			hidden: !actionDiagnosisNeed,
			disableFullFilter: true,
		},
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
			const { info_uuid, user_name, user_phone } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<UserNamePhone user_name={user_name} phone={user_phone} />
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
			return row.order_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Order Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: (info) => {
			const { image_1, image_2, image_3 } = info.row.original;

			return <OrderImages image_1={image_1} image_2={image_2} image_3={image_3} />;
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
			const { info_uuid, user_name, user_phone } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<UserNamePhone user_name={user_name} phone={user_phone} />
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
			return row.order_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Order Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: (info) => {
			const { image_1, image_2, image_3 } = info.row.original;

			return <OrderImages image_1={image_1} image_2={image_2} image_3={image_3} />;
		},
	},
	{
		accessorFn: (row) => {
			return row.diagnosis_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Diagnosis Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { diagnosis_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={diagnosis_problem_statement} />
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.repairing_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Repairing Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { repairing_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={repairing_problem_statement} />
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.qc_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'QC Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { qc_problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={qc_problem_statement} />;
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
	actionTrxAccess,
	handleAgainstTrx,
}: {
	handelDeliveryStatusChange?: (row: Row<any>) => void;
	haveDeliveryAccess?: boolean;
	handelQCStatusChange?: (row: Row<any>) => void;
	haveQCAccess?: boolean;
	actionTrxAccess?: boolean;
	handleAgainstTrx?: (row: Row<any>) => void;
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
		size: 80,
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
		size: 80,
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
			const { info_uuid, user_name, user_phone } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<UserNamePhone user_name={user_name} phone={user_phone} />
				</div>
			);
		},
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
			<Transfer
				onClick={() => handleAgainstTrx?.(info?.row)}
				disabled={!info.row.original.is_proceed_to_repair}
			/>
		),
		size: 40,
		meta: {
			hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
	},
	// {
	// 	id: 'action_trx',
	// 	header: () => (
	// 		<>
	// 			Transfer Repairing <br />
	// 			Product
	// 		</>
	// 	),
	// 	cell: (info) => <Transfer onClick={() => handleAgainstTrx?.(info.row)} />,
	// 	size: 40,
	// 	meta: {
	// 		hidden: !actionTrxAccess,
	// 		disableFullFilter: true,
	// 	},
	// },
	{
		accessorFn: (row) => {
			return (
				row.product_transfer
					?.map((item) => item?.product_name + '-' + item?.warehouse_name + '(' + item?.quantity + ')')
					.join(', ') || ''
			);
		},
		header: 'Repairing Item',
		enableColumnFilter: false,
		cell: (info) => {
			const value = info.row.original.product_transfer as ITransferTableData[] | undefined;
			const headers = ['Product', 'Serial', 'Branch', 'Warehouse'];
			const headers = ['Product', 'Serial', 'Branch', 'Warehouse'];
			return <TableForColumn value={value} headers={headers} />;
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
			return row.order_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Order Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: (info) => {
			const { image_1, image_2, image_3 } = info.row.original;

			return <OrderImages image_1={image_1} image_2={image_2} image_3={image_3} />;
		},
	},
	{
		accessorFn: (row) => {
			return row.diagnosis_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Diagnosis Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { diagnosis_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={diagnosis_problem_statement} />
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.repairing_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Repairing Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { repairing_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={repairing_problem_statement} />
			);
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
		accessorKey: 'ready_for_delivery_date',
		header: 'Ready Date',
		size: 40,
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'bill_amount',
		header: 'Bill Amount',
		size: 40,
		enableColumnFilter: false,
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
			const { info_uuid, user_name, user_phone } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<UserNamePhone user_name={user_name} phone={user_phone} />
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
			return row.order_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Order Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={problem_statement} />;
		},
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: (info) => {
			const { image_1, image_2, image_3 } = info.row.original;

			return <OrderImages image_1={image_1} image_2={image_2} image_3={image_3} />;
		},
	},
	{
		accessorFn: (row) => {
			return row.diagnosis_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Diagnosis Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { diagnosis_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={diagnosis_problem_statement} />
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.repairing_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Repairing Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { repairing_problem_statement } = info.row.original;

			return (
				<Problem problems_name={info.getValue() as string} problem_statement={repairing_problem_statement} />
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.qc_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'QC Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { qc_problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={qc_problem_statement} />;
		},
	},
	{
		accessorFn: (row) => {
			return row.delivery_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Delivery Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { delivery_problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={delivery_problem_statement} />;
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
	handleProceedToRepair,
}: {
	actionTrxAccess: boolean;
	handleAgainstTrx: (row: Row<any>) => void;
	handleProceedToRepair: (row: Row<any>) => void;
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
			const { info_uuid, user_name, user_phone } = info.row.original;
			return (
				<div className='flex flex-col gap-2'>
					<CustomLink
						url={`/work/info/details/${info_uuid}`}
						label={info.getValue() as string}
						openInNewTab={true}
					/>
					<UserNamePhone user_name={user_name} phone={user_phone} />
				</div>
			);
		},
	},
	{
		accessorFn: (row) => {
			return row.order_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Order Problem',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { order_problem_statement } = info.row.original;

			return <Problem problems_name={info.getValue() as string} problem_statement={order_problem_statement} />;
		},
	},
	{
		accessorKey: 'images',
		header: 'Images',
		cell: (info) => {
			const { image_1, image_2, image_3 } = info.row.original;

			return <OrderImages image_1={image_1} image_2={image_2} image_3={image_3} />;
		},
	},
	{
		accessorFn: (row) => {
			return row.diagnosis_problems_name
				.map((item) => item)
				.join(', ')
				.replace(/_/g, ' ');
		},
		header: 'Diagnosis Problem',
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
	},
	// {
	// 	id: 'action_trx',
	// 	header: 'Section Transfer',
	// 	cell: (info) => (
	// 		<Transfer onClick={() => handleAgainstTrx(info.row)} disabled={!info.row.original.is_proceed_to_repair} />
	// 	),
	// 	size: 40,
	// 	meta: {
	// 		hidden: !actionTrxAccess,
	// 		disableFullFilter: true,
	// 	},
	// },
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
		header: 'Order Problem',
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
//* Transfer Columns
export const transferColumns = (): ColumnDef<ITransferTableData, unknown>[] => [
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'serial_no',
		header: 'Serial',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'branch_name',
		header: 'Branch',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'warehouse_name',
		header: 'Warehouse',
		enableColumnFilter: false,
	},
];

