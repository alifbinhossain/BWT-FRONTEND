'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { BarChart3, CalendarIcon, Clock, Eye, RotateCcw, Search } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Bar, CartesianGrid, ComposedChart, Line, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { colors } from '@/config/tailwind';
import { cn } from '@/lib/utils';

interface IChartData {
	date: Date;
	expectedHours: number;
	hoursWorked: number;
}

export default function WorkHoursChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(2025, 4, 31), // May 31, 2025
		to: new Date(2025, 5, 15), // June 15, 2025
	});
	const [selectedDateRange, setSelectedDateRange] = useState({ start: 0, end: 14 });
	const [chartVisibility, setChartVisibility] = useState({
		expectedHours: true,
		hoursWorked: true,
		hoursWorkedLine: true,
	});

	// Chart data following the exact IChartData interface
	const allChartData: IChartData[] = [
		{ date: new Date(2025, 5, 1), expectedHours: 10, hoursWorked: 8 },
		{ date: new Date(2025, 5, 2), expectedHours: 12, hoursWorked: 8 },
		{ date: new Date(2025, 5, 3), expectedHours: 12, hoursWorked: 8 },
		{ date: new Date(2025, 5, 4), expectedHours: 9, hoursWorked: 8 },
		{ date: new Date(2025, 5, 5), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 6), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 7), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 8), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 9), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 10), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 11), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 12), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 13), expectedHours: 0, hoursWorked: 0 },
		{ date: new Date(2025, 5, 14), expectedHours: 8, hoursWorked: 6 },
		{ date: new Date(2025, 5, 15), expectedHours: 8, hoursWorked: 7 },
	];

	// Transform data for chart display with formatted dates
	const transformedChartData = allChartData.slice(selectedDateRange.start, selectedDateRange.end + 1).map((item) => ({
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

	const handleDateRangePreset = (preset: string) => {
		switch (preset) {
			case 'week1':
				setSelectedDateRange({ start: 0, end: 6 });
				break;
			case 'week2':
				setSelectedDateRange({ start: 7, end: 14 });
				break;
			case 'all':
				setSelectedDateRange({ start: 0, end: 14 });
				break;
		}
	};

	const handleSearch = () => {
		console.log('Searching for date range:', dateRange);
		if (dateRange?.from && dateRange?.to) {
			const filteredData = allChartData.filter(
				(item) => item.date >= dateRange.from! && item.date <= dateRange.to!
			);
			console.log('Filtered data:', filteredData);
		}
	};

	const handleReset = () => {
		setSelectedDateRange({ start: 0, end: 14 });
		setDateRange({
			from: new Date(2025, 4, 31),
			to: new Date(2025, 5, 15),
		});
		setChartVisibility({
			expectedHours: true,
			hoursWorked: true,
			hoursWorkedLine: true,
		});
	};

	// Calculate statistics from current data
	const currentData = allChartData.slice(selectedDateRange.start, selectedDateRange.end + 1);
	const totalExpectedHours = currentData.reduce((sum, item) => sum + item.expectedHours, 0);
	const totalWorkedHours = currentData.reduce((sum, item) => sum + item.hoursWorked, 0);
	const efficiency = totalExpectedHours > 0 ? Math.round((totalWorkedHours / totalExpectedHours) * 100) : 0;

	return (
		<div className='w-full space-y-6 p-6'>
			{/* Header */}
			<div className='text-left'>
				<h1 className='text-2xl font-semibold text-slate-800'>Work Hours Dashboard</h1>
				<p className='mt-1 text-sm text-slate-500'>
					Track your productivity with interactive controls • {efficiency}% efficiency
				</p>
			</div>

			{/* Clean Controls Section */}
			<Card className='border shadow-sm'>
				<CardContent className='p-6'>
					<div className='flex flex-col gap-6 lg:flex-row'>
						{/* Date Range Section */}
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-2'>
								<CalendarIcon className='size-4 text-accent' />
								<span className='text-sm font-medium text-slate-700'>Date Range Filter</span>
							</div>
							<div className='flex gap-2'>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant='outline'
											className={cn(
												'flex-1 justify-start border-slate-300 text-left font-normal',
												!dateRange && 'text-muted-foreground'
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4' />
											{dateRange?.from ? (
												dateRange.to ? (
													<>
														{format(dateRange.from, 'dd-MMM-yyyy')} to{' '}
														{format(dateRange.to, 'dd-MMM-yyyy')}
													</>
												) : (
													format(dateRange.from, 'dd-MMM-yyyy')
												)
											) : (
												<span>Pick a date range</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											initialFocus
											mode='range'
											defaultMonth={dateRange?.from}
											selected={dateRange}
											onSelect={setDateRange}
											numberOfMonths={2}
										/>
									</PopoverContent>
								</Popover>
								<Button variant={'accent'} onClick={handleSearch}>
									<Search className='mr-2 size-4' />
									Search
								</Button>
							</div>
						</div>

						<Separator orientation='vertical' className='hidden h-16 lg:block' />

						{/* Chart Visibility Section */}
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-2'>
								<Eye className='h-4 w-4 text-accent' />
								<span className='text-sm font-medium text-slate-700'>Chart Visibility</span>
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

						<Separator orientation='vertical' className='hidden h-16 lg:block' />

						{/* Quick Actions Section */}
						<div className='flex-1'>
							<div className='mb-3 flex items-center gap-2'>
								<BarChart3 className='h-4 w-4 text-slate-600' />
								<span className='text-sm font-medium text-slate-700'>Quick Actions</span>
							</div>
							<div className='flex gap-2'>
								<Select onValueChange={handleDateRangePreset}>
									<SelectTrigger className='flex-1'>
										<SelectValue placeholder='Select Period' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='week1'>Week 1</SelectItem>
										<SelectItem value='week2'>Week 2</SelectItem>
										<SelectItem value='all'>All Days</SelectItem>
									</SelectContent>
								</Select>
								<Button variant='default' onClick={handleReset}>
									<RotateCcw className='mr-2 size-4' />
									Reset
								</Button>
							</div>
						</div>
					</div>

					{/* Statistics Row */}
					<div className='mt-6 flex items-center justify-between border-t border-slate-200 pt-4'>
						<div className='flex items-center gap-6 text-sm'>
							<div className='flex items-center gap-2'>
								<Clock className='h-4 w-4 text-slate-500' />
								<span className='text-slate-600'>
									Period: {selectedDateRange.end - selectedDateRange.start + 1} days
								</span>
							</div>
							<div className='flex items-center gap-4'>
								<Badge variant='outline' className='border-teal-200 text-teal-700'>
									Expected: {totalExpectedHours}h
								</Badge>
								<Badge variant='outline' className='border-cyan-200 text-cyan-700'>
									Worked: {totalWorkedHours}h
								</Badge>
								<Badge variant='outline' className='border-slate-200 text-slate-700'>
									Efficiency: {efficiency}%
								</Badge>
							</div>
						</div>
						<div className='text-xs text-slate-500'>
							{format(currentData[0]?.date || new Date(), 'dd MMM yyyy')} -{' '}
							{format(currentData[currentData.length - 1]?.date || new Date(), 'dd MMM yyyy')}
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
