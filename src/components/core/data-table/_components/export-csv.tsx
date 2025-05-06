import { format } from 'date-fns';
import { FileSpreadsheet } from 'lucide-react';
import { CSVLink } from 'react-csv';
import useTable from '@/hooks/useTable';

import { buttonVariants } from '@/components/ui/button';

import { getFlatHeader } from '@/utils';

import { TTableExportCSV } from '../types';

const TableExportCSV = ({ start_date, end_date }: TTableExportCSV) => {
	const { table, title, isEntry } = useTable();

	const excludedColumns = new Set(['action', 'actions', 'resetPass']);
	const csvHeaders: any[] = [];
	const csvHeadersId: any[] = [];

	table.getAllLeafColumns().forEach(({ id, getIsVisible, columnDef }) => {
		if (getIsVisible() && !excludedColumns.has(id)) {
			csvHeaders.push(getFlatHeader(columnDef.header));
			csvHeadersId.push(id);
		}
	});
	const filteredRows = table._getFilteredRowModel?.().rows || [];

	// * Generate the CSV data
	const csvData = [
		csvHeaders, // * Header row
		...filteredRows.map((row) => csvHeadersId.map((id) => row.getValue(id))), // * Data rows
	];

	const startTime = format(start_date as Date, 'dd-MM-yyyy');
	const endTime = format(end_date as Date, 'dd-MM-yyyy');
	const filename = `${title.toLowerCase()} - ${startTime} to ${endTime}.csv`;

	return (
		<CSVLink
			aria-label='Export to CSV'
			role='button'
			type='button'
			className={buttonVariants({
				variant: isEntry ? 'gradient-accent' : 'secondary',
				size: 'sm',
				className: 'h-7',
			})}
			data={csvData}
			filename={filename}
		>
			<FileSpreadsheet className='size-4' />
			<span className='hidden lg:block'>Excel</span>
		</CSVLink>
	);
};

export default TableExportCSV;
