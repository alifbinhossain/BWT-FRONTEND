import { ITableFacetedFilter, ITableFilterOptionSSR } from '@/types';

import { ILeaveApply } from '../schema';

export const type1FacetedFilters: ITableFacetedFilter[] = [
	{
		id: 'status',
		title: 'Status',
		options: [
			{
				label: 'Success',
				value: 'success',
			},
			{
				label: 'Failed',
				value: 'failed',
			},
		],
	},
];
export const applyLeaveFilters: ITableFilterOptionSSR<ILeaveApply>[] = [
	{
		accessor: 'leave_category_uuid',
		label: 'Category',
		type: 'select',
		mode: 'dynamic',
		apiUrl: '/other/leave-category/value/label',
	},
	{
		accessor: 'employee_uuid',
		label: 'Employee',
		type: 'select',
		mode: 'dynamic',
		apiUrl: '/other/employee/value/label',
	},
	{
		accessor: 'year',
		label: 'Buyer',
		type: 'text',
	},
	{
		accessor: 'approval',
		label: 'Status',
		type: 'select',
		mode: 'static',
		options: [
			{
				label: 'Pending',
				value: 'pending',
			},
			{
				label: 'Approved',
				value: 'approved',
			},
			{
				label: 'Rejected',
				value: 'rejected',
			},
		],
	},
];
