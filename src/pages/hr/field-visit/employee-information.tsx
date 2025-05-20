import { Building, Calendar, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import DateTime from '@/components/ui/date-time';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { IFieldVisitEmployee } from '../_config/types';

const EmployeeInformation: React.FC<{ data: IFieldVisitEmployee }> = ({ data }) => {
	return (
		<div className='space-y-4'>
			<h1 className='font-semibold'>Employee Information</h1>

			{/* Employee Information Section */}
			<Card className='overflow-hidden shadow-sm'>
				<CardContent className='p-4'>
					<div className='flex flex-col space-y-4'>
						{/* Profile Section */}
						<div className='flex items-center gap-3'>
							<Avatar className='size-12 border'>
								<AvatarImage src='/placeholder-user.jpg' alt='Employee' />
								<AvatarFallback className='text-primary'>
									{String(data.name)
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</AvatarFallback>
							</Avatar>
							<div>
								<h2 className='text-lg font-medium'>{data.name}</h2>
								<p className='text-sm text-muted-foreground'>
									{data.designation_name}, {data.department_name}
								</p>
							</div>
						</div>

						<Separator className='bg-border' />

						{/* Info Grid */}
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
							<div className='flex items-center gap-2.5 rounded-md border bg-base px-3 py-2.5'>
								<div className='flex size-10 shrink-0 items-center justify-center rounded-full border bg-white'>
									<User className='h-4 w-4 text-primary' />
								</div>
								<div>
									<p className='text-xs text-muted-foreground'>Shift Group</p>
									<p className='text-sm font-medium'>{data.shift_group_name || 'N/A'}</p>
								</div>
							</div>

							<div className='flex items-center gap-2.5 rounded-md border bg-base px-3 py-2.5'>
								<div className='flex size-10 shrink-0 items-center justify-center rounded-full border bg-white'>
									<Calendar className='h-4 w-4 text-primary' />
								</div>
								<div>
									<p className='text-xs text-muted-foreground'>Employment</p>
									{data.employment_type_name ? (
										<Badge variant='outline' className='mt-0.5 text-xs'>
											{data.employment_type_name}
										</Badge>
									) : (
										<p className='text-sm font-medium'>N/A</p>
									)}
								</div>
							</div>

							<div className='flex items-center gap-2.5 rounded-md border bg-base px-3 py-2.5'>
								<div className='flex size-10 shrink-0 items-center justify-center rounded-full border bg-white'>
									<Building className='h-4 w-4 text-primary' />
								</div>
								<div>
									<p className='text-xs text-muted-foreground'>Workplace</p>
									<p className='text-sm font-medium'>{data.workplace_name || 'N/A'}</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Ultra-Clean Field Visits Section */}
			{data.field_visit && (
				<div className='space-y-3'>
					<h2 className='font-semibold'>Last 5 Field Visits</h2>
					<div className='overflow-x-auto rounded-md border'>
						<Table>
							<TableHeader className='bg-base-200'>
								<TableRow className='h-8'>
									<TableHead>Location</TableHead>
									<TableHead>Entry Time</TableHead>
									<TableHead>Exit Time</TableHead>
									<TableHead>Applied by</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className='bg-white'>
								{data.field_visit.map((visit, index) => (
									<TableRow key={index} className={cn('h-11', index % 2 === 0 ? '' : 'bg-base')}>
										<TableCell>{visit.area}</TableCell>
										<TableCell>
											<DateTime date={new Date(visit.entry_time)} />
										</TableCell>
										<TableCell>
											<DateTime date={new Date(visit.exit_time)} />
										</TableCell>
										<TableCell>
											<div className='flex items-center gap-2'>
												<Avatar className='size-10'>
													<AvatarImage src='/placeholder-user.jpg' alt='Employee' />
													<AvatarFallback className='text-xs'>ASM</AvatarFallback>
												</Avatar>
												<span className='text-sm'>{visit.created_by_name}</span>
											</div>
										</TableCell>
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

export default EmployeeInformation;
