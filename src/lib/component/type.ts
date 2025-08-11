import { ReactNode } from 'react';

export interface Column {
	accessoriesKey: string;
	header: string;
	type: 'text' | 'date' | 'profile' | 'custom' | 'timing';
	className?: string;
	headerClassName?: string;
	component?: (value: any, rowData: any, index: number) => ReactNode;
}

export interface TableProps {
	data: any[];
	title?: string;
	columns: Column[];
	tableClassName?: string;
	headerClassName?: string;
}
