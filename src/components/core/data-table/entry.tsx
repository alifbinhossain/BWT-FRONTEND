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
	> & { children?: React.ReactNode }
) => {
	const { children, ...rest } = props;
	return (
		<TableProvider isEntry enableRowSelection={false} {...rest}>
			{children}
		</TableProvider>
	);
};

export default DataTableEntry;
