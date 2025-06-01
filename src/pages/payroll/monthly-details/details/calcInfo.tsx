import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { IMonthlyDetailsTableData } from '../../_config/columns/columns.type';

const CalcInfo: React.FC<{ data: IMonthlyDetailsTableData }> = ({ data }) => {
	return (
		<div className='flex gap-4'>
			<Card className='w-96 overflow-hidden shadow-sm'>
				<CardContent className='p-4'>
					<h2 className='mb-3 flex justify-between rounded-md px-2 py-1 font-semibold'>Gross Salary</h2>

					<div className='text-sm'>
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Salary</span>
							<span>{data.total_salary}</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Present Days</span>
							<span>{data.present_days}</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Late Days</span>
							<span>{data.late_days}</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Week Days</span>
							<span>{data.week_days}</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Absents Days</span>
							<span>{data.absent_days}</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Total Days</span>
							<span>{data.total_days}</span>
						</p>

						<p className='mt-3 flex justify-between rounded-md bg-gray-300 px-2 py-1'>
							<span>Salary/Day</span>
							<span>{Number(data.daily_salary).toFixed(2)}</span>
						</p>

						<p className='mt-3 flex justify-between rounded-md bg-gray-300 px-2 py-1'>
							<span>Gross Salary</span>
							<span>{Number(data.gross_salary).toFixed(2)}</span>
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className='w-96 overflow-hidden shadow-sm'>
				<CardContent className='p-4'>
					<h2 className='mb-3 flex justify-between rounded-md px-2 py-1 font-semibold'>
						Calculation Information
					</h2>

					<div className='text-sm'>
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Provident Fund</span>
							<span>900</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Late Deduction</span>
							<span>900</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Disciplinary Deduction</span>
							<span>900</span>
						</p>
						<Separator className='bg-border' />
						<p className='flex justify-between rounded-md px-2 py-1'>
							<span>Salary Advance</span>
							<span>900</span>
						</p>

						<p className='mt-3 flex justify-between rounded-md bg-gray-300 px-2 py-1'>
							<span>Total</span>
							<span>900</span>
						</p>

						<p className='mt-3 flex justify-between rounded-md bg-gray-300 px-2 py-1'>
							<span>Net Payable</span>
							<span>900</span>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CalcInfo;
