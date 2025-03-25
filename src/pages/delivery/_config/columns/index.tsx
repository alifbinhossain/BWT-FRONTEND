import { ColumnDef } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import { LinkOnly } from '@/components/others/link';

import { IChallanEntryTableData, IChallanTableData, ICourierTableData, IVehicleTableData } from './columns.type';

//* Vehicle Columns
export const vehicleColumns = (): ColumnDef<IVehicleTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'no',
		header: 'No',
		enableColumnFilter: false,
	},
];
//* Courier Columns
export const courierColumns = (): ColumnDef<ICourierTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'branch',
		header: 'Branch',
		enableColumnFilter: false,
	},
];
//* Challan Columns
export const challanColumns = (): ColumnDef<IChallanTableData>[] => [
	{
		accessorKey: 'is_delivery_complete',
		header: 'Delivery Complete',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'challan_no',
		header: 'Challan No',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return <LinkOnly uri={`/delivery/challan/details/${uuid}`} title={info.getValue() as string} />;
		},
	},
	{
		accessorKey: 'customer_name',
		header: 'Customer',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'challan_type',
		header: 'Challan Type',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'customer_name',
		header: 'Customer',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'vehicle_name',
		header: 'Vehicle',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'courier_name',
		header: 'Courier',
		enableColumnFilter: false,
	},
];

//* Challan Entry Columns
export const challanEntryColumns = (): ColumnDef<IChallanEntryTableData>[] => [
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
];
