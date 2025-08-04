import { ChevronDown, ChevronsUpDown, ChevronUp, EyeOff, Search, Pin, PinOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { TableColumnHeaderProps } from '../types';
import TableColumnFilter from './filter/column';

export function TableColumnHeader<TData, TValue>({ column, className, isSSR }: TableColumnHeaderProps<TData, TValue>) {
	const title = (column.columnDef.header as string).split('\n');

	if (!column.getCanSort()) {
		return (
			<div className={cn(className, 'flex flex-col items-start')}>
				{title.map((e, index) => (
					<div key={index}>{e}</div>
				))}
			</div>
		);
	}

	return (
		<div className={cn('flex items-center', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button
						aria-label='Sort Column'
						variant='ghost'
						size='sm'
						className='-ml-3 h-7 active:scale-100 data-[state=open]:bg-base-300'
					>
						<span className='flex flex-col items-start'>
							{title.map((e, index) => (
								<div key={index}>{e}</div>
							))}
						</span>
						{column.getIsSorted() === 'desc' ? (
							<ChevronDown className='size-4' />
						) : column.getIsSorted() === 'asc' ? (
							<ChevronUp className='size-4' />
						) : (
							<ChevronsUpDown className='size-4' />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					{!isSSR && (
						<>
							<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
								<ChevronUp className='mr-2 size-3.5 text-muted-foreground/70' />
								Asc
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
								<ChevronDown className='mr-2 size-3.5 text-muted-foreground/70' />
								Desc
							</DropdownMenuItem>

							<DropdownMenuSeparator />
						</>
					)}

					{column.getCanPin() && (
						<DropdownMenuItem
							onClick={() => {
								if (column.getIsPinned() === 'left') {
									column.pin(false);
								} else {
									column.pin('left');
								}
							}}
						>
							{column.getIsPinned() === 'left' ? (
								<PinOff className='mr-2 size-3.5 text-muted-foreground/70' />
							) : (
								<Pin className={'mr-2 size-3.5 text-muted-foreground/70'} />
							)}
							<span>{column.getIsPinned() === 'left' ? 'Unpin' : 'Pin to left'}</span>
						</DropdownMenuItem>
					)}

					{column.getCanHide() && (
						<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
							<EyeOff className='mr-2 size-3.5 text-muted-foreground/70' />
							Hide
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			{column.getCanFilter() ? (
				<Popover>
					<PopoverTrigger>
						<Button aria-label='Column Filter' variant='ghost' size={'icon'}>
							<Search className='size-4' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-fit bg-background p-2'>
						<TableColumnFilter column={column} />
					</PopoverContent>
				</Popover>
			) : null}
		</div>
	);
}
