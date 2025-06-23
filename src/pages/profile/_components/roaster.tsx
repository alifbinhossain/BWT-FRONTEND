import React from 'react';
import { getDaysInMonth, getMonth } from 'date-fns';
import useAuth from '@/hooks/useAuth';

import { Separator } from '@/components/ui/separator';

import TableWithoutTitleBackground from '@/lib/component/table-without-title-background';
import { getDateTime } from '@/utils';

import { useHRRoasterByEmployeeUUID } from '../config/query';

const Roaster = () => {
	const daysOfMonth = getDaysInMonth(getDateTime());
	const { user } = useAuth();
	const { data } = useHRRoasterByEmployeeUUID(user?.employee_uuid as string, 5, 2025);
	console.log(data);

	interface timeDetails {
		date: string;
		shift: string;
		timing: string;
	}
	const firstDataTable: timeDetails[] = [];
	const secondDataTable: timeDetails[] = [];
	const thirdDataTable: timeDetails[] = [];
	for (let i = 0; i < Math.floor(daysOfMonth / 3); i++) {
		firstDataTable.push({
			date: `01/05/${i + 1}`,
			shift: 'Morning',
			timing: '08:00 AM - 04:00 PM',
		});
	}
	for (let i = Math.floor(daysOfMonth / 3); i < Math.floor(daysOfMonth / 3) * 2; i++) {
		secondDataTable.push({
			date: `01/05/${i + 1}`,
			shift: 'Morning',
			timing: '08:00 AM - 04:00 PM',
		});
	}
	for (let i = Math.floor(daysOfMonth / 3) * 2; i < Math.floor(daysOfMonth); i++) {
		thirdDataTable.push({
			date: `01/05/${i + 1}`,
			shift: 'Morning',
			timing: '08:00 AM - 04:00 PM',
		});
	}
	const columns = [
		{
			accessoriesKey: 'date',
			header: 'Date',
			type: 'date',
		},
		{
			accessoriesKey: 'shift',
			header: 'Shift',
			type: 'text',
		},
		{
			accessoriesKey: 'timing',
			header: 'Timing',
			type: 'text',
		},
	];
	return (
		<div>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-semibold'>Time details of May 2025</h1>
				<div className='text-2xl'>
					<button className='btn btn-outline text-4xl'>&lt;</button> May 2025
					<button className='btn btn-outline text-4xl'> &gt;</button>
				</div>
			</div>
			<br />
			<Separator />
			<br />
			<div className='grid grid-cols-3 gap-4'>
				<TableWithoutTitleBackground columns={columns} data={firstDataTable} />
				<TableWithoutTitleBackground columns={columns} data={secondDataTable} />
				<TableWithoutTitleBackground columns={columns} data={thirdDataTable} />
			</div>
		</div>
	);
};

export default Roaster;
