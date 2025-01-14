import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import { LinkOnly } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { IOrderDetailsEntry, IOrderTableData } from './columns.type';

// Order Columns
export const orderColumns = (): ColumnDef<IOrderTableData>[] => [
	{
		accessorKey: 'is_sample',
		header: 'Sample/Bill/Cash',

		cell: (info) => {
			const { is_sample, is_bill, is_cash } = info.row.original;
			return (
				<div className='flex space-x-1'>
					<StatusButton value={is_sample} />
					<StatusButton value={is_bill} />
					<StatusButton value={is_cash} />
				</div>
			);
		},
	},
	{
		accessorKey: 'order_number',
		header: 'ID',
		cell: (info) => {
			const { uuid } = info.row.original;
			return <LinkOnly uri={`/thread/order-info/${uuid}`} title={info.getValue<string>()} />;
		},
	},
	{
		accessorKey: 'party_name',
		header: 'Party',

		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'factory_name',
		header: 'Factory',

		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'merchandiser_name',
		header: 'Merchandiser',

		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'buyer_name',
		header: 'Buyer',

		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'swatch_status',
		header: 'Swatch Approved',

		cell: (info) => {
			const { order_entry_count, swatch_approval_count } = info.row.original;
			return `${swatch_approval_count} / ${order_entry_count}`;
		},
	},
	{
		accessorKey: 'is_swatches_approved',
		header: 'Status',

		cell: (info) => {
			return (
				<div className='flex space-x-1'>
					<StatusButton value={info.getValue<number>()} />
				</div>
			);
		},
	},
	{
		accessorKey: 'delivery_date',
		header: 'Delivery Date',

		cell: (info) => <DateTime date={info.getValue<Date>()} />,
	},
];

// Order Entry Columns
export const orderEntryColumns = ({
	showPriceAccess,
}: {
	showPriceAccess: boolean;
}): ColumnDef<IOrderDetailsEntry>[] => [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: (info) => info.row.index + 1,
	},
	{
		accessorKey: 'status',
		header: () => (
			<span>
				Status <br /> (Price/Swatch)
			</span>
		),

		cell: (info) => {
			const { company_price, party_price, swatch_approval_date } = info.row.original;
			return (
				<div className='flex items-center justify-start gap-2'>
					<StatusButton value={Number(company_price) > 0 && Number(party_price) > 0 ? 1 : 0} />
					<StatusButton value={swatch_approval_date ? 1 : 0} />
				</div>
			);
		},
	},
	{
		accessorKey: 'style',
		header: 'Style',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'color',
		header: 'Color',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'count_length_name',
		header: 'Count Length',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'bleaching',
		header: 'Bleaching',
		cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'production_quantity',
		header: 'Production QTY',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'pi',
		header: 'PI QTY',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'delivered',
		header: 'Delivered QTY',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_quantity',
		header: 'Short QTY',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'reject_quantity',
		header: 'Reject QTY',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warehouse',
		header: 'Warehouse QTY',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'company_price',
		header: 'Company Price',
		cell: (info) => info.getValue(),
		meta: {
			hidden: !showPriceAccess,
		},
	},
	{
		accessorKey: 'party_price',
		header: 'Party Price',
		cell: (info) => info.getValue(),
		meta: {
			hidden: !showPriceAccess,
		},
	},
	{
		accessorKey: 'swatch_approval_date',
		header: 'Swatch Approval Date',

		cell: (info) => {
			return <DateTime date={info.getValue<Date>()} />;
		},
	},
];
