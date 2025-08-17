import { IStatus } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';

import PageAssign from '@/components/buttons/page-assign';
import ResetPassword from '@/components/buttons/reset-password';
import StatusButton from '@/components/buttons/status';
import { Button } from '@/components/ui/button';
import DateTime from '@/components/ui/date-time';
import ReactSelect from '@/components/ui/react-select';
import StatusBadge from '@/components/ui/status-badge';
import { Switch } from '@/components/ui/switch';

import { cn } from '@/lib/utils';

import AttendanceCard from '../_components/attendance-card';
import { formatDecimalHours } from '../utils';
import {
	DateAccessor,
	DateAccessorDepartment,
	IDepartmentReportTableData,
	IDepartmentTableData,
	IDesignationTableData,
	IDeviceListTableData,
	IEmployeeTableData,
	IIndividualReportTableData,
	IManualEntryTableData,
	IMonthlyReportTableData,
	IUserTableData,
} from './columns.type';

// Department Columns
export const departmentColumns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'department',
		header: 'Department',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Designation Columns
export const designationColumns = (): ColumnDef<IDesignationTableData>[] => [
	{
		accessorKey: 'designation',
		header: 'Designation',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// User Columns
export function userColumns({
	pageAssignAccess,
	resetPasswordAccess,
	statusAccess,
	ratingChangeAccess,
	handleStatus,
	handleResetPassword,
	handlePageAssign,
	handlePriceRating,
	handleRating,
}: {
	statusAccess: boolean;
	resetPasswordAccess: boolean;
	pageAssignAccess: boolean;
	ratingChangeAccess: boolean;
	handleStatus: (row: Row<any>) => void;
	handleResetPassword: (row: Row<any>) => void;
	handlePageAssign: (row: Row<any>) => void;
	handlePriceRating: (row: Row<any>, value: number) => void;
	handleRating: (row: Row<any>, value: number) => void;
}): ColumnDef<IUserTableData>[] {
	const rating = [
		{
			value: 1,
			label: 1,
		},
		{
			value: 2,
			label: 2,
		},
		{
			value: 3,
			label: 3,
		},
		{
			value: 4,
			label: 4,
		},
		{
			value: 5,
			label: 5,
		},
	];
	return [
		{
			accessorKey: 'status',
			header: 'Status',
			enableColumnFilter: false,
			cell: (info) => {
				return (
					<Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />
				);
			},
			size: 40,
			meta: {
				hidden: !statusAccess,
			},
		},
		{
			accessorKey: 'user_type',
			header: 'Type',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'business_type',
			header: 'Business Type',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'rating',
			header: 'Rating',
			enableColumnFilter: false,
			cell: (info) => (
				<ReactSelect
					value={rating?.find((item) => item.value === info.getValue())}
					options={rating}
					menuPortalTarget={document.body}
					styles={{
						menuPortal: (base) => ({ ...base, zIndex: 999 }),
					}}
					isClearable={false}
					onChange={(value: any) => handleRating(info.row, value.value as number)}
					isDisabled={!ratingChangeAccess}
				/>
			),
		},
		{
			accessorKey: 'price',
			header: 'Price Rating',
			enableColumnFilter: false,
			cell: (info) => (
				<ReactSelect
					value={rating?.find((item) => item.value === info.getValue())}
					options={rating}
					isClearable={false}
					menuPortalTarget={document.body}
					styles={{
						menuPortal: (base) => ({ ...base, zIndex: 999 }),
					}}
					onChange={(value: any) => handlePriceRating(info.row, value.value as number)}
					isDisabled={!ratingChangeAccess}
				/>
			),
		},
		{
			accessorKey: 'name',
			header: 'Name',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'phone',
			header: 'Phone',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'email',
			header: 'Email',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'where_they_find_us',
			header: 'How They Find Us',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'department',
			header: 'Department',
			enableColumnFilter: false,
			cell: (info) => {
				const { department, designation } = info.row.original;

				return (
					<div className='flex flex-col'>
						<span className='capitalize'>{department}</span>
						<span className='text-xs capitalize text-gray-400'>{designation}</span>
					</div>
				);
			},
		},

		{
			accessorKey: 'reset_pass_actions',
			id: 'reset_pass_actions',
			header: 'Reset \nPassword',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <ResetPassword onClick={() => handleResetPassword(info.row)} />,
			size: 40,
			meta: {
				hidden: !resetPasswordAccess,
				disableFullFilter: true,
			},
		},

		{
			accessorKey: 'page_assign_actions',
			id: 'page_assign_actions',
			header: 'Page \nAssign',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <PageAssign onClick={() => handlePageAssign(info.row)} />,
			size: 40,
			meta: {
				hidden: !pageAssignAccess,
				disableFullFilter: true,
			},
		},
	];
}
export function employeeColumns({
	pageAssignAccess,
	resetPasswordAccess,
	statusAccess,
	handleStatus,
	handleResetPassword,
	handlePageAssign,
}: {
	statusAccess: boolean;
	resetPasswordAccess: boolean;
	pageAssignAccess: boolean;
	handleStatus: (row: Row<any>) => void;
	handleResetPassword: (row: Row<any>) => void;
	handlePageAssign: (row: Row<any>) => void;
}): ColumnDef<IEmployeeTableData>[] {
	return [
		{
			accessorKey: 'status',
			header: 'Status',
			enableColumnFilter: false,
			cell: (info) => {
				return (
					<Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />
				);
			},
			size: 40,
			meta: {
				hidden: !statusAccess,
			},
		},
		{
			accessorKey: 'name',
			header: 'Name',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'phone',
			header: 'Phone',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'email',
			header: 'Email',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'department',
			header: 'Department',
			enableColumnFilter: false,
			cell: (info) => {
				const { department_name, designation_name } = info.row.original;

				return (
					<div className='flex flex-col'>
						<span className='capitalize'>{department_name}</span>
						<span className='text-xs capitalize text-gray-400'>{designation_name}</span>
					</div>
				);
			},
		},

		{
			accessorKey: 'reset_pass_actions',
			id: 'reset_pass_actions',
			header: 'Reset \nPassword',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <ResetPassword onClick={() => handleResetPassword(info.row)} />,
			size: 40,
			meta: {
				hidden: !resetPasswordAccess,
				disableFullFilter: true,
			},
		},

		{
			accessorKey: 'page_assign_actions',
			id: 'page_assign_actions',
			header: 'Page \nAssign',
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <PageAssign onClick={() => handlePageAssign(info.row)} />,
			size: 40,
			meta: {
				hidden: !pageAssignAccess,
				disableFullFilter: true,
			},
		},
	];
}
// Field Visit Columns
export const fieldVisitColumns = ({
	selectedFieldVisit,
	setSelectedFieldVisit,
}: {
	selectedFieldVisit: IManualEntryTableData | undefined;
	setSelectedFieldVisit: React.Dispatch<React.SetStateAction<IManualEntryTableData | undefined>>;
}): ColumnDef<IManualEntryTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => (
			<span
				onClick={() => setSelectedFieldVisit(info.row.original)}
				className={cn(
					'cursor-pointer',
					selectedFieldVisit?.uuid === info.row.original.uuid
						? 'font-medium text-accent underline'
						: 'font-semibold text-primary underline'
				)}
			>
				{info.getValue<string>()}
			</span>
		),
	},
	{
		accessorKey: 'entry_time',
		header: 'Entry Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'approval',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusBadge status={info.getValue<string>() as IStatus} />;
		},
	},
];

export const manualEntryColumns = (): ColumnDef<IManualEntryTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'entry_time',
		header: 'Entry Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isDate={false} />,
	},
	{
		accessorKey: 'exit_time',
		header: 'Exit Time',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isDate={false} />,
	},
	{
		accessorKey: 'approval',
		header: 'Status',
		enableColumnFilter: false,
		cell: (info) => {
			return <StatusBadge status={info.getValue<string>() as IStatus} />;
		},
	},
];

export const deviceListColumns = ({
	handleDevices,
}: {
	handleDevices: (row: Row<any>) => void;
}): ColumnDef<IDeviceListTableData>[] => [
	{
		accessorKey: 'identifier',
		header: 'Identifier',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'location',
		header: 'Location',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'connection_status',
		header: 'Connection Status',
		enableColumnFilter: false,
		cell: (info) => <StatusButton value={info.getValue() as boolean} />,
	},
	{
		accessorKey: 'phone_number',
		header: 'Phone Number',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		enableColumnFilter: false,
		cell: (info) => info.getValue<string>(),
	},
	{
		accessorKey: 'employee',
		header: 'Employees',
		enableColumnFilter: false,
		cell: (info) => <Button onClick={() => handleDevices(info.row)}>Assign Employee</Button>,
	},
];

//? Report ?//

//* Individual Report
export const individualReportColumns = (dateAccessor: string[]): ColumnDef<IIndividualReportTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'shift',
		header: 'Shift',
		enableColumnFilter: false,
		size: 180,
		cell: (info) => {
			const { shift_details } = info.row.original;

			return (
				<div className='space-y-1'>
					<span>{shift_details.name}</span>
					<div className='flex w-fit items-center gap-2 rounded-md border bg-slate-200 px-2'>
						<DateTime date={shift_details.start_time as Date} isTime={true} isDate={false} />
						-
						<DateTime date={shift_details.end_time as Date} isTime={true} isDate={false} />
					</div>
				</div>
			);
		},
	},
	...dateAccessor.map((date) => ({
		accessorKey: date,
		header: `${date} (${format(date, 'EEE')})`,
		enableColumnFilter: false,
		size: 210,
		cell: (info: any) => {
			const { entry_time, exit_time, status, hours_worked, expected_hours, late_hours, early_exit_hours } =
				info.getValue() as DateAccessor;

			return (
				<AttendanceCard
					status={status}
					entry_time={entry_time}
					exit_time={exit_time}
					late_hours={late_hours as number}
					early_exit_hours={early_exit_hours as number}
					hours_worked={hours_worked as number}
					expected_hours={expected_hours as number}
				/>
			);
		},
	})),
];

//* Department Report
export const departmentReportColumns = (dateAccessor: string[]): ColumnDef<IDepartmentReportTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'designation_name',
		header: 'Designation',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'workplace_name',
		header: 'Workplace',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'employment_type_name',
		header: 'Employment Type',
		enableColumnFilter: false,
	},
	...dateAccessor.map((date) => ({
		accessorKey: date,
		header: `${date} (${format(date, 'EEE')})`,
		enableColumnFilter: false,
		size: 210,
		cell: (info: any) => {
			const { entry_time, exit_time, status, hours_worked, expected_hours, late_hours, early_exit_hours } =
				info.getValue() as DateAccessorDepartment;

			return (
				<AttendanceCard
					status={status}
					entry_time={entry_time}
					exit_time={exit_time}
					late_hours={late_hours as number}
					early_exit_hours={early_exit_hours as number}
					hours_worked={hours_worked as number}
					expected_hours={expected_hours as number}
				/>
			);
		},
	})),
	{
		accessorKey: 'present_days',
		header: 'Present',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{info.getValue() as number}</p>,
	},
	{
		accessorKey: 'absent_days',
		header: 'Absent',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{info.getValue() as number}</p>,
	},
	{
		accessorKey: 'leave_days',
		header: 'Leave',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{info.getValue() as number}</p>,
	},
	{
		accessorKey: 'late_days',
		header: 'Late',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{info.getValue() as number}</p>,
	},
	{
		accessorKey: 'early_leaves',
		header: 'Early Exit',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{info.getValue() as number}</p>,
	},
	{
		accessorKey: 'total_expected_hours',
		header: 'Expected Hours',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{formatDecimalHours(info.getValue() as number)}</p>,
	},
	{
		accessorKey: 'total_hours_worked',
		header: 'Actual Hours',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{formatDecimalHours(info.getValue() as number)}</p>,
	},
	{
		accessorKey: 'total_hour_difference',
		header: 'Difference Hours',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{formatDecimalHours(info.getValue() as number)}</p>,
	},
	{
		accessorKey: 'average_hours_worked',
		header: 'Average Hours',
		enableColumnFilter: false,
		cell: (info) => <p className='w-full text-center'>{formatDecimalHours(info.getValue() as number)}</p>,
	},
];

//* Monthly Report
export const monthlyReportColumns = (): ColumnDef<IMonthlyReportTableData>[] => [
	{
		accessorKey: 'employee_name',
		header: 'Employee',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'designation_name',
		header: 'Designation',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'department_name',
		header: 'Department',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'workplace_name',
		header: 'Workplace',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'employment_type_name',
		header: 'Employment Type',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'total_days',
		header: 'Total Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'working_days',
		header: 'Working Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'present_days',
		header: 'Present Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'absent_days',
		header: 'Absent Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'leave_days',
		header: 'Leave Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'off_days',
		header: 'Off Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'general_holidays',
		header: 'General Holidays',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'special_holidays',
		header: 'Special Holidays',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'late_days',
		header: 'Late Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'early_exit_days',
		header: 'Early Exit Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'approved_lates',
		header: 'Approved Lates',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'field_visit_days',
		header: 'Field Visit Days',
		enableColumnFilter: false,
	},
	{
		accessorKey: 'expected_hours',
		header: 'Expected Hours',
		enableColumnFilter: false,
		cell: (info) => formatDecimalHours(info.getValue() as number),
	},
	{
		accessorKey: 'total_late_hours',
		header: 'Total Late Hours',
		enableColumnFilter: false,
		cell: (info) => formatDecimalHours(info.getValue() as number),
	},
	{
		accessorKey: 'working_hours',
		header: 'Working Hours',
		enableColumnFilter: false,
		cell: (info) => formatDecimalHours(info.getValue() as number),
	},
	{
		accessorKey: 'difference_hours',
		header: 'Difference Hours',
		enableColumnFilter: false,
		cell: (info) => formatDecimalHours(info.getValue() as number),
	},
];
