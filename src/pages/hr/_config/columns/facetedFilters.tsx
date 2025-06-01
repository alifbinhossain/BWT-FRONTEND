import { ITableFacetedFilter, ITableFilterOptionSSR } from '@/types';
import { IFieldVisitEmployee } from '../types';

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
export const filedVisitFilters: ITableFilterOptionSSR<IFieldVisitEmployee>[] = [

	{
		accessor: 'employee_uuid',
		label: 'Employee',
		type: 'select',
		mode: 'dynamic',
		apiUrl: '/other/employee/value/label',
	},
	{
		accessor: 'approval',
		label: 'Status',
		type: 'select',
		mode: 'static',
		isPinned: true,
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
