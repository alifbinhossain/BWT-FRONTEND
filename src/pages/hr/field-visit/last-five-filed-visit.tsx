import TableWithoutTitleBackground from '@/lib/component/table-without-title-background';
import { Column } from '@/lib/component/type';

import { IFieldVisitEmployee } from '../_config/types';

const LastFiveFieldVisit: React.FC<{ data: IFieldVisitEmployee }> = ({ data }) => {
	const columns: Column[] = [
		{
			accessoriesKey: 'area',
			header: 'Location',
			type: 'text',
		},
		{
			accessoriesKey: 'created_by_name',
			header: 'Applied by',
			type: 'text',
		},
		{
			accessoriesKey: 'entry_time',
			header: 'Entry Time',
			type: 'date',
		},
		{
			accessoriesKey: 'exit_time',
			header: 'Exit Time',
			type: 'date',
		},
		{
			accessoriesKey: 'created_by_name',
			header: 'Applied by',
			type: 'profile',
		},
	];

	return (
		<div className='space-y-4'>
			{data.field_visit && (
				<TableWithoutTitleBackground
					title='Last 5 Field Visits'
					data={data.field_visit || []}
					columns={columns}
				/>
			)}
		</div>
	);
};

export default LastFiveFieldVisit;
