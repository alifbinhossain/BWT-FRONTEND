// src/components/multi-select.tsx

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDown, WandSparkles, XCircle, XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva('m-1 transition-transform ease-in-out hover:scale-105 duration-200', {
	variants: {
		variant: {
			default: 'border-input text-base-content bg-base-300 hover:bg-base-300/80',
			secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
			destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
			inverted: 'inverted',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof multiSelectVariants> {
	/**
	 * An array of option objects to be displayed in the multi-select component.
	 * Each option object has a label, value, and an optional icon.
	 */
	options: {
		/** The text to display for the option. */
		label: string;
		/** The unique value associated with the option. */
		value: string;
		/** Optional icon component to display alongside the option. */
		icon?: React.ComponentType<{ className?: string }>;
	}[];

	/**
	 * Callback function triggered when the selected values change.
	 * Receives an array of the new selected values.
	 */
	onValueChange: (value: string[]) => void;

	/** The default selected values when the component mounts (for uncontrolled mode). */
	defaultValue?: string[];

	/** The controlled value of the multi-select (overrides internal state if provided). */
	value?: string[]; // NEW: Add this for controlled mode

	/**
	 * Placeholder text to be displayed when no values are selected.
	 * Optional, defaults to "Select options".
	 */
	placeholder?: string;

	/**
	 * Maximum number of items to display. Extra selected items will be summarized.
	 * Optional, defaults to 3.
	 */
	maxCount?: number;

	/**
	 * The modality of the popover. When set to true, interaction with outside elements
	 * will be disabled and only popover content will be visible to screen readers.
	 * Optional, defaults to false.
	 */
	modalPopover?: boolean;

	/**
	 * If true, renders the multi-select component as a child of another component.
	 * Optional, defaults to false.
	 */
	asChild?: boolean;

	/**
	 * Additional class names to apply custom styles to the multi-select component.
	 * Optional, can be used to add custom styles.
	 */
	className?: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
	(
		{
			options,
			onValueChange,
			variant,
			defaultValue = [],
			value: controlledValue, // NEW: Destructure the new prop
			placeholder = 'Select options',
			maxCount = 3,
			modalPopover = false,
			asChild = false,
			className,
			...props
		},
		ref
	) => {
		const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

		// NEW: Determine if we're in controlled mode (value prop provided) or uncontrolled
		const isControlled = controlledValue !== undefined;
		const selectedValues = isControlled ? controlledValue : internalValue;

		// NEW: Helper to update value (calls onValueChange and updates internal state if uncontrolled)
		const setSelectedValues = (newValue: string[]) => {
			if (!isControlled) {
				setInternalValue(newValue);
			}
			onValueChange(newValue);
		};

		// NEW: Sync internal state if defaultValue changes (for uncontrolled mode only)
		React.useEffect(() => {
			if (!isControlled) {
				setInternalValue(defaultValue);
			}
		}, [defaultValue, isControlled]);

		const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				setIsPopoverOpen(true);
			} else if (event.key === 'Backspace' && !event.currentTarget.value) {
				const newSelectedValues = [...selectedValues];
				newSelectedValues.pop();
				setSelectedValues(newSelectedValues);
			}
		};

		const toggleOption = (option: string) => {
			const newSelectedValues = selectedValues.includes(option)
				? selectedValues.filter((value) => value !== option)
				: [...selectedValues, option];
			setSelectedValues(newSelectedValues);
		};

		const handleClear = () => {
			setSelectedValues([]);
		};

		const handleTogglePopover = () => {
			setIsPopoverOpen((prev) => !prev);
		};

		const clearExtraOptions = () => {
			const newSelectedValues = selectedValues?.slice(0, maxCount);
			setSelectedValues(newSelectedValues);
		};

		const toggleAll = () => {
			if (selectedValues?.length === options.length) {
				handleClear();
			} else {
				const allValues = options.map((option) => option.value);
				setSelectedValues(allValues);
			}
		};

		// The rest of the JSX remains unchanged (it now uses `selectedValues` which is either controlled or internal)
		return (
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						{...props}
						onClick={handleTogglePopover}
						className={cn(
							'bg-gradient flex h-auto min-h-10 w-full items-center justify-between rounded-md border border-input p-1 hover:bg-inherit active:scale-100 disabled:border-destructive disabled:from-destructive/80 disabled:to-destructive/80 disabled:text-destructive disabled:opacity-50',
							className
						)}
					>
						{selectedValues?.length > 0 ? (
							<div className='flex w-full items-center justify-between'>
								<div className='flex flex-wrap items-center'>
									{selectedValues.slice(0, maxCount).map((value) => {
										const option = options.find((o) => o.value === value);
										const IconComponent = option?.icon;
										return (
											<Badge
												key={value}
												className={cn(
													multiSelectVariants({
														variant,
													})
												)}
											>
												{IconComponent && <IconComponent className='mr-2 h-4 w-4' />}
												{option?.label}
												<XCircle
													className='ml-2 h-4 w-4 cursor-pointer'
													onClick={(event) => {
														event.stopPropagation();
														toggleOption(value);
													}}
												/>
											</Badge>
										);
									})}
									{selectedValues.length > maxCount && (
										<Badge
											className={cn(
												'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
												multiSelectVariants({ variant })
											)}
										>
											{`+ ${selectedValues.length - maxCount} more`}
											<XCircle
												className='ml-2 h-4 w-4 cursor-pointer'
												onClick={(event) => {
													event.stopPropagation();
													clearExtraOptions();
												}}
											/>
										</Badge>
									)}
								</div>
								<div className='flex items-center justify-between'>
									<XIcon
										className='mx-2 h-4 cursor-pointer text-muted-foreground'
										onClick={(event) => {
											event.stopPropagation();
											handleClear();
										}}
									/>
									<Separator orientation='vertical' className='flex h-full min-h-6' />
									<ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
								</div>
							</div>
						) : (
							<div className='mx-auto flex w-full items-center justify-between'>
								<span className='mx-3 text-sm text-muted-foreground'>{placeholder}</span>
								<ChevronDown className='mx-2 h-4 cursor-pointer text-muted-foreground' />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start' onEscapeKeyDown={() => setIsPopoverOpen(false)}>
					<Command>
						<CommandInput placeholder='Search...' onKeyDown={handleInputKeyDown} />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								<CommandItem key='all' onSelect={toggleAll} className='cursor-pointer'>
									<div
										className={cn(
											'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
											selectedValues?.length === options.length
												? 'bg-primary text-primary-foreground'
												: 'opacity-50 [&_svg]:invisible'
										)}
									>
										<CheckIcon className='h-4 w-4' />
									</div>
									<span>(Select All)</span>
								</CommandItem>
								{options.map((option) => {
									const isSelected = selectedValues?.includes(option.value);
									return (
										<CommandItem
											key={option.value}
											onSelect={() => toggleOption(option.value)}
											className='cursor-pointer'
										>
											<div
												className={cn(
													'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
													isSelected
														? 'bg-primary text-primary-foreground'
														: 'opacity-50 [&_svg]:invisible'
												)}
											>
												<CheckIcon className='h-4 w-4' />
											</div>
											{option.icon && (
												<option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
											)}
											<span>{option.label}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								<div className='flex items-center justify-between'>
									{selectedValues?.length > 0 && (
										<>
											<CommandItem
												onSelect={handleClear}
												className='flex-1 cursor-pointer justify-center'
											>
												Clear
											</CommandItem>
											<Separator orientation='vertical' className='flex h-full min-h-6' />
										</>
									)}
									<CommandItem
										onSelect={() => setIsPopoverOpen(false)}
										className='max-w-full flex-1 cursor-pointer justify-center'
									>
										Close
									</CommandItem>
								</div>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		);
	}
);

MultiSelect.displayName = 'MultiSelect';
