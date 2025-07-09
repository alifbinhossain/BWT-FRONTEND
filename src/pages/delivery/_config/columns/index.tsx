import { Product } from '@/pages/work/_config/utils/component';
import { ProductName } from '@/pages/work/_config/utils/function';
import { ColumnDef } from '@tanstack/react-table';



import StatusButton from '@/components/buttons/status';
import { CustomLink } from '@/components/others/link';
import { Switch } from '@/components/ui/switch';



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
export const challanColumns = (
	handelDeliveryStatusChange?: (row: any) => void,
	haveDeliveryAccess?: boolean
): ColumnDef<IChallanTableData>[] => [
	{
		accessorKey: 'is_delivery_complete',
		header: () => (
			<>
				Delivery <br />
				Complete
			</>
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
		accessorKey: 'challan_no',
		header: 'Challan No',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return (
				<CustomLink
					url={`/delivery/challan/details/${uuid}`}
					label={info.getValue() as string}
					openInNewTab={true}
				/>
			);
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
	{
		accessorKey: 'courier_branch',
		header: 'Courier Branch',
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
			const uuid = info.row.original.info_uuid;
			return (
				<CustomLink url={`/work/info/details/${uuid}`} label={info.getValue() as string} openInNewTab={true} />
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
		header: 'Quantity',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'bill_amount',
		header: 'Bill Amount',
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
];