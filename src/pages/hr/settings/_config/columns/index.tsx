import { ColumnDef, Row } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';
import { Switch } from '@/components/ui/switch';

import {
	IDepartmentTableData,
	IDesignationTableData,
	IEmployeeTypeTableData,
	IHolidayTableData,
	ISpecialDaysTableData,
	IWorkplaceTableData,
} from './columns.type';

/// Department Columns
export const departmentColumns = (
	statusAccess: boolean,
	handleStatus: (row: Row<any>) => void
): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !statusAccess,
		},
	},
	{
		accessorKey: 'name',
		header: 'Department',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'hierarchy',
		header: 'Hierarchy',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Designation Columns
export const designationColumns = (): ColumnDef<IDesignationTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'designation',
		header: 'Designation',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'hierarchy',
		header: 'Hierarchy',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

//* Employee Types
export const employeeTypeColumns = (
	statusAccess: boolean,
	handleStatus: (row: Row<any>) => void
): ColumnDef<IEmployeeTypeTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: !statusAccess,
		},
	},
	{
		accessorKey: 'name',
		header: 'Employee Type',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

//* holidays
export const holidayColumns = (): ColumnDef<IHolidayTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'date',
		header: 'Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
//* special days
export const specialDaysColumns = (): ColumnDef<ISpecialDaysTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'from_date',
		header: 'From Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'to_date',
		header: 'To Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
];
//* Sub Departments
export type ISubDepartmentTableData = {
	uuid: string;
	name: string;
	hierarchy: number;
	status: boolean;
	created_at: string;
	updated_at: string;
	remarks: string;
};
export const subDepartmentColumns = (
	statusAccess: boolean,
	handleStatus: (row: Row<any>) => void
): ColumnDef<ISubDepartmentTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: statusAccess,
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'hierarchy',
		header: 'Hierarchy',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];
//* WorkPlace
export const workplaceColumns = (
	statusAccess: boolean,
	handleStatus: (row: Row<any>) => void
): ColumnDef<IWorkplaceTableData>[] => [
	{
		accessorKey: 'index',
		header: 'SL',
		enableColumnFilter: false,
		cell: (info) => info.row.index + 1,
		size: 10,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'hierarchy',
		header: 'Hierarchy',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />;
		},
		size: 40,
		meta: {
			hidden: statusAccess,
		},
	},
];
