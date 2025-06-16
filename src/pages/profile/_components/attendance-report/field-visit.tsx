import { IManualEntryTableData } from '@/pages/hr/_config/columns/columns.type';
import { useHrManualEntryByEmployeeUUID } from '@/pages/hr/_config/query';

import DataTableEntry from '@/components/core/data-table/entry';

import { fieldVisitColumns } from './_config/columns';

const FieldVisit: React.FC<{
	employeeId: string;
}> = ({ employeeId }) => {
	const { data, isLoading } = useHrManualEntryByEmployeeUUID<IManualEntryTableData[]>(employeeId, 'field_visit');

	if (isLoading) return <div>Loading...</div>;

	const columns = fieldVisitColumns();

	return (
		<div>
			<DataTableEntry title='Field Visit' data={data || []} columns={columns} />
		</div>
	);
};

export default FieldVisit;
