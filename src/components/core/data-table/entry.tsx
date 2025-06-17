import { TableProvider } from '@/context';
import { ITableProviderProps } from '@/context/TableContext';

const DataTableEntry = <TData, TValue>(
	props: Pick<
		ITableProviderProps<TData, TValue>,
		| 'title'
		| 'columns'
		| 'data'
		| 'toolbarOptions'
		| 'defaultVisibleColumns'
		| 'otherToolBarComponents'
		| 'handleRefetch'
		| 'enableDefaultColumns'
		| 'isLoading'
	>
) => {
	return <TableProvider isEntry enableRowSelection={false} {...props} />;
};

export default DataTableEntry;
