import { TableProvider } from '@/context';

import { IDataTableEntryProps } from './types';

const DataTableEntry = <TData, TValue>({
	title,
	columns,
	data,
	toolbarOptions,
	defaultVisibleColumns,
}: IDataTableEntryProps<TData, TValue>) => {
	return (
		<TableProvider
			title={title}
			columns={columns}
			defaultVisibleColumns={defaultVisibleColumns}
			data={data}
			enableRowSelection={false}
			toolbarOptions={toolbarOptions}
			isEntry
		/>
	);
};

export default DataTableEntry;
