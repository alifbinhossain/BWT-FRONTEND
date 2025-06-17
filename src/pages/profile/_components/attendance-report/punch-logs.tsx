import { IPunchLogTableData } from '@/pages/hr/_config/columns/columns.type';
import { useHrPunchLogsByEmployeeUUID } from '@/pages/hr/_config/query';
import { punchLogColumns } from '@/pages/hr/punch-log/_config/columns';

import DataTableEntry from '@/components/core/data-table/entry';

const PunchLogs: React.FC<{
	employeeId: string;
}> = ({ employeeId }) => {
	const { data, isLoading } = useHrPunchLogsByEmployeeUUID<IPunchLogTableData[]>(employeeId);

	const columns = punchLogColumns();

	return (
		<div>
			<DataTableEntry
				title='Punch Logs'
				data={data || []}
				columns={columns}
				isLoading={isLoading}
				enableDefaultColumns={false}
			/>
		</div>
	);
};

export default PunchLogs;
