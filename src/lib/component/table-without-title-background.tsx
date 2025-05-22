import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DateTime from '@/components/ui/date-time';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { TableProps } from './type';

const TableWithoutTitleBackground: React.FC<TableProps> = ({ data, title, columns }) => {
	return (
		<div className='space-y-4'>
			{data && (
				<div className='space-y-3'>
					{title && <h2 className='font-semibold'>{title}</h2>}
					<div className='overflow-x-auto rounded-md border'>
						<Table>
							<TableHeader className='bg-base-200'>
								<TableRow className='h-8'>
									{columns?.map((column) => {
										return <TableHead>{column.header}</TableHead>;
									})}
								</TableRow>
							</TableHeader>
							<TableBody className='bg-white'>
								{data?.map((value: any, index: number) => (
									<TableRow key={index} className={cn('h-11', index % 2 === 0 ? '' : 'bg-base')}>
										{columns?.map((column) => {
											console.log(column);
											if (column.type === 'text') {
												return (
													<TableCell key={column.accessoriesKey}>
														{value[column.accessoriesKey]}
													</TableCell>
												);
											}
											if (column.type === 'date') {
												return (
													<TableCell key={column.accessoriesKey}>
														<DateTime date={new Date(value[column.accessoriesKey])} />
													</TableCell>
												);
											}
											if (column.type === 'profile') {
												return (
													<TableCell key={column.accessoriesKey}>
														<div className='flex items-center gap-2'>
															<Avatar className='size-10'>
																<AvatarImage
																	src='/placeholder-user.jpg'
																	alt='Employee'
																/>
																<AvatarFallback className='text-xs'>ASM</AvatarFallback>
															</Avatar>
															<span className='text-sm'>
																{value[column.accessoriesKey]}
															</span>
														</div>
													</TableCell>
												);
											}
											return null;
										})}
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
