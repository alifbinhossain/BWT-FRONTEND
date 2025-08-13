import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DateTime from '@/components/ui/date-time';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { Column, TableProps } from './type';

const TableWithoutTitleBackground: React.FC<TableProps> = ({
	data,
	title,
	columns,
	tableClassName,
	headerClassName,
}) => {
	const renderCellContent = (column: Column, value: any, rowData: any, rowIndex: number) => {
		switch (column.type) {
			case 'text':
				return value[column.accessoriesKey];
			case 'date':
				const dateValue = value[column.accessoriesKey];
				return dateValue ? <DateTime date={new Date(dateValue)} /> : '-';
			case 'profile':
				return (
					<div className='flex items-center gap-2'>
						<Avatar className='size-10'>
							<AvatarImage src={value.avatar || '/placeholder-user.jpg'} alt='Employee' />
							<AvatarFallback className='text-xs'>
								{value[column.accessoriesKey]?.slice(0, 2).toUpperCase() || 'UN'}
							</AvatarFallback>
						</Avatar>
						<span className='text-sm'>{value[column.accessoriesKey]}</span>
					</div>
				);
			case 'custom':
				return column.component
					? column.component(value, rowData, rowIndex)
					: value[column.accessoriesKey] || value.cell || '-';
			default:
				return value[column.accessoriesKey];
		}
	};

	// Determine className: string or function(rowData)
	const getCellClassName = (column: Column, rowData: any) => {
		if (typeof column.className === 'function') {
			return column.className(rowData);
		}
		return column.className || '';
	};

	return (
		<div className='space-y-4'>
			{data && (
				<div className='space-y-3'>
					{title && <h2 className='font-semibold'>{title}</h2>}
					<div className={cn('overflow-x-auto rounded-md border', tableClassName)}>
						<Table>
							<TableHeader className={cn('bg-base-200', headerClassName)}>
								<TableRow className='h-8'>
									{columns?.map((column, index) => (
										<TableHead
											key={`${column.accessoriesKey}-${index}`}
											className={column.headerClassName}
										>
											{column.header}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody className='bg-white'>
								{data.map((rowData, rowIndex) => (
									<TableRow
										key={rowIndex}
										className={cn('h-11', rowIndex % 2 === 0 ? '' : 'bg-base')}
									>
										{columns.map((column, colIndex) => (
											<TableCell
												key={`${column.accessoriesKey}-${colIndex}`}
												className={getCellClassName(column, rowData)}
											>
												{renderCellContent(column, rowData, rowData, rowIndex)}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			)}
		</div>
	);
};

export default TableWithoutTitleBackground;


