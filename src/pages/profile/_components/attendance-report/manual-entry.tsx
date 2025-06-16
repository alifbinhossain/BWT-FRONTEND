import { IManualEntryTableData } from '@/pages/hr/_config/columns/columns.type';
import { useHrManualEntryByEmployeeUUID } from '@/pages/hr/_config/query';

import DataTableEntry from '@/components/core/data-table/entry';

import { manualEntryColumns } from './_config/columns';

const ManualEntry: React.FC<{
	employeeId: string;
}> = ({ employeeId }) => {
	const { data, isLoading } = useHrManualEntryByEmployeeUUID<IManualEntryTableData[]>(employeeId);

	if (isLoading) return <div>Loading...</div>;

	const columns = manualEntryColumns();

	return (
		<div>
			<DataTableEntry title='Manual Entry' data={data || []} columns={columns} />
		</div>
	);
};

export default ManualEntry;
