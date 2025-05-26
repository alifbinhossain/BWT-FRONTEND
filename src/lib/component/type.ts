export type ColumnProps = {
	accessoriesKey: string;
	header: string;
	type: any;
	cell?: any;
};
export type TableProps = {
	data: any;
	title?: string;
	columns: ColumnProps[];
};
