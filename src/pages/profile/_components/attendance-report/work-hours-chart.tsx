'use client';

import { useState } from 'react';
import { useHrEmployeeAttendanceReportByEmployeeUUID } from '@/pages/hr/_config/query';
import { format, subDays } from 'date-fns';
import { BarChart3, CalendarIcon, Clock, Eye, RotateCcw, TrendingUp } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Separator } from '@/components/ui/separator';

import { colors } from '@/config/tailwind';
import { cn } from '@/lib/utils';

import { IAttendanceReportTableData } from './_config/columns/columns.type';

interface IChartData {
	date: Date;
	expectedHours: number;
	hoursWorked: number;
}

export default function WorkHoursChart({ employeeId }: { employeeId: string }) {
	const defaultDateRange: DateRange = {
		from: subDays(new Date(), 30),
		to: new Date(),
	};
	const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);

	const { data, isLoading } = useHrEmployeeAttendanceReportByEmployeeUUID<IAttendanceReportTableData[]>(
		employeeId,
		`from_date=${format(dateRange.from!, 'yyyy-MM-dd')}&to_date=${format(dateRange.to!, 'yyyy-MM-dd')}`
	);

	// const [selectedDateRange, setSelectedDateRange] = useState({ start: 0, end: 14 });
	const [chartVisibility, setChartVisibility] = useState({
		expectedHours: true,
		hoursWorked: true,
		hoursWorkedLine: true,
	});

	if (isLoading) return <div>Loading...</div>;

	// Chart data following the exact IChartData interface
	const allChartData: IChartData[] =
		data?.map((item) => ({
			expectedHours: item.expected_hours,
			hoursWorked: item.hours_worked,
			date: new Date(item.punch_date),
		})) || ({} as any);

	// Transform data for chart display with formatted dates
	const transformedChartData = allChartData.map((item) => ({
		...item,
		dateFormatted: format(item.date, 'dd MMM'),
		dateKey: format(item.date, 'yyyy-MM-dd'),
	}));

	const chartConfig = {
		expectedHours: {
			label: 'Expected Hours',
			color: colors.CHART_3, // Light teal to match the image
		},
		hoursWorked: {
			label: 'Hours Worked',
			color: colors.CHART_2, // Darker teal to match the image
		},
		hoursWorkedLine: {
			label: 'Hours Worked',
			color: colors.DESTRUCTIVE, // Red line
		},
	};

	const toggleChartElement = (element: keyof typeof chartVisibility) => {
		setChartVisibility((prev) => ({
			...prev,
			[element]: !prev[element],
		}));
	};

	const handleReset = () => {
		setDateRange(defaultDateRange);
		setChartVisibility({
			expectedHours: true,
			hoursWorked: true,
			hoursWorkedLine: true,
		});
	};

	// Calculate statistics from current data
	const totalExpectedHours = transformedChartData.reduce((sum, item) => sum + item.expectedHours, 0);
	const totalWorkedHours = transformedChartData.reduce((sum, item) => sum + item.hoursWorked, 0);
	const efficiency = totalExpectedHours > 0 ? Math.round((totalWorkedHours / totalExpectedHours) * 100) : 0;

	return (
		<div className='w-full space-y-6'>
			{/* Compact Header */}
			<div className='rounded-lg border p-4'>
				<div className='flex flex-col justify-between gap-4 lg:flex-row lg:items-center'>
					<div className='flex items-center gap-3'>
						<div className='rounded-lg bg-accent p-2'>
							<BarChart3 className='h-5 w-5 text-white' />
						</div>
						<div>
							<h1 className='text-xl font-semibold text-slate-800'>Work Hours Dashboard</h1>
							<p className='text-sm text-slate-600'>Track productivity and performance metrics</p>
						</div>
					</div>
					<div className='flex flex-wrap items-center gap-2 lg:gap-4'>
						<div className='flex items-center gap-3'>
							<Badge variant='outline' className='border-teal-200 bg-teal-50 text-teal-700'>
								<Clock className='mr-1 size-3' />
								{totalExpectedHours}h Expected
							</Badge>
							<Badge variant='outline' className='border-cyan-200 bg-cyan-50 text-cyan-700'>
								<TrendingUp className='mr-1 size-3' />
								{totalWorkedHours}h Worked
							</Badge>
							<Badge
								variant='outline'
								className={cn(
									'font-medium',
									efficiency >= 80
										? 'border-green-200 bg-green-50 text-green-700'
										: efficiency >= 60
											? 'border-yellow-200 bg-yellow-50 text-yellow-700'
											: 'border-red-200 bg-red-50 text-red-700'
								)}
							>
								{efficiency}% Efficiency
							</Badge>
						</div>
						<Button variant='secondary' size='xs' onClick={handleReset}>
							<RotateCcw className='size-4' />
							Reset
						</Button>
					</div>
				</div>
			</div>

			{/* Controls Section */}
			<Card className='border-slate-200 shadow-sm'>
				<CardContent className='p-4'>
					<div className='flex flex-col gap-4 lg:flex-row'>
						{/* Date Range Section */}
						<div>
							<div className='mb-2 flex items-center gap-2'>
								<CalendarIcon className='h-4 w-4 text-cyan-600' />
								<span className='text-sm font-medium text-slate-700'>Date Range</span>
							</div>
							<div className='flex gap-2'>
								<DateRangePicker
									className='h-9 w-80 justify-start'
									initialDateFrom={dateRange?.from}
									initialDateTo={dateRange?.to}
									align={'center'}
									onUpdate={({ range }) => {
										setDateRange(range);
									}}
									onClear={() => {
										setDateRange(defaultDateRange);
									}}
								/>
							</div>
						</div>

						<Separator orientation='vertical' className='hidden h-16 lg:block' />

						{/* Chart Visibility Section */}
						<div className='flex-1'>
							<div className='mb-2 flex items-center gap-2'>
								<Eye className='h-4 w-4 text-teal-600' />
								<span className='text-sm font-medium text-slate-700'>Chart Elements</span>
							</div>
							<div className='flex gap-3'>
								<Button
									variant={chartVisibility.expectedHours ? 'default' : 'outline'}
									size='sm'
									onClick={() => toggleChartElement('expectedHours')}
									className={cn(
										'flex items-center gap-2',
										chartVisibility.expectedHours
											? 'bg-chart-3 text-white hover:bg-teal-600'
											: 'border-slate-200 text-slate-700 hover:bg-slate-50'
									)}
								>
									<div
										className={cn(
											'h-2 w-3 rounded-sm',
											chartVisibility.expectedHours ? 'bg-white' : 'bg-chart-3'
										)}
									/>
									Expected
								</Button>

								<Button
									variant={chartVisibility.hoursWorked ? 'default' : 'outline'}
									size='sm'
									onClick={() => toggleChartElement('hoursWorked')}
									className={cn(
										'flex items-center gap-2',
										chartVisibility.hoursWorked
											? 'bg-chart-2 text-white hover:bg-teal-700'
											: 'border-slate-200 text-slate-700 hover:bg-slate-50'
									)}
								>
									<div
										className={cn(
											'h-2 w-3 rounded-sm',
											chartVisibility.hoursWorked ? 'bg-white' : 'bg-chart-2'
										)}
									/>
									Worked
								</Button>

								<Button
									variant={chartVisibility.hoursWorkedLine ? 'default' : 'outline'}
									size='sm'
									onClick={() => toggleChartElement('hoursWorkedLine')}
									className={cn(
										'flex items-center gap-2',
										chartVisibility.hoursWorkedLine
											? 'bg-destructive text-white hover:bg-red-600'
											: 'border-slate-200 text-slate-700 hover:bg-slate-50'
									)}
								>
									<div
										className={cn(
											'h-2 w-3 rounded-sm',
											chartVisibility.hoursWorkedLine ? 'bg-white' : 'bg-destructive'
										)}
									/>
									Trend
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Full Width Chart */}
			<Card className='border shadow-sm'>
				<CardContent className='p-6'>
					{/* Chart Legend */}
					<div className='mb-4 flex items-center justify-between'>
						<div className='flex items-center gap-6 text-sm'>
							{chartVisibility.expectedHours && (
								<div className='flex items-center gap-2'>
									<div className='h-3 w-4 rounded-sm bg-chart-3' />
									<span className='text-slate-600'>Expected Hours</span>
								</div>
							)}
							{chartVisibility.hoursWorked && (
								<div className='flex items-center gap-2'>
									<div className='h-3 w-4 rounded-sm bg-chart-2' />
									<span className='text-slate-600'>Hours Worked</span>
								</div>
							)}
							{chartVisibility.hoursWorkedLine && (
								<div className='flex items-center gap-2'>
									<div className='h-1 w-4 rounded-sm bg-destructive' />
									<span className='text-slate-600'>Trend Line</span>
								</div>
							)}
						</div>
					</div>

					<ChartContainer config={chartConfig} className='h-[400px] w-full'>
						<ComposedChart
							accessibilityLayer
							data={transformedChartData}
							margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
						>
							<CartesianGrid />
							<XAxis
								dataKey='dateFormatted'
								axisLine={true}
								tickLine={true}
								tick={{ fontSize: 12, fill: '#64748b' }}
								angle={-45}
								textAnchor='end'
								height={60}
							/>
							<YAxis
								axisLine={true}
								tickLine={true}
								tick={{ fontSize: 12, fill: '#64748b' }}
								domain={[0, 14]}
								width={40}
								label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
							/>

							{chartVisibility.expectedHours && (
								<Bar
									dataKey='expectedHours'
									fill='var(--color-expectedHours)'
									radius={[2, 2, 0, 0]}
									maxBarSize={40}
								/>
							)}

							{chartVisibility.hoursWorked && (
								<Bar
									dataKey='hoursWorked'
									fill='var(--color-hoursWorked)'
									radius={[2, 2, 0, 0]}
									maxBarSize={40}
								/>
							)}

							{chartVisibility.hoursWorkedLine && (
								<Line
									type='monotone'
									dataKey='hoursWorked'
									stroke='var(--color-hoursWorkedLine)'
									strokeWidth={2}
									dot={{ fill: 'var(--color-hoursWorkedLine)', strokeWidth: 0, r: 4 }}
									connectNulls={false}
								/>
							)}

							<ChartTooltip
								content={
									<ChartTooltipContent
										formatter={(value, name) => [
											`${value} hours`,
											name === 'expectedHours' ? ' - Expected Hours' : ' - Hours Worked',
										]}
										labelFormatter={(label) => `Date: ${label}`}
									/>
								}
							/>
						</ComposedChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
