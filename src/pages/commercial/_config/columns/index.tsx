import { ColumnDef } from '@tanstack/react-table';

import HoverCardWrapper from '@/components/others/hover-card-wrapper';

import { IBankTableData } from './columns.type';

export const bankColumns = (): ColumnDef<IBankTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'swift_code',
		header: 'Swift Code',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'routing_no',
		header: 'Routing No',
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'address',
		header: 'Address',
		cell: (info) => info.getValue(),
	},

	{
		accessorKey: 'policy',
		header: 'Policy',
		cell: (info) => <HoverCardWrapper title={info.getValue<string>()} content={info.getValue<string>()} />,
		size: 400,
	},
];
