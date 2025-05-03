import { forwardRef } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Select, { components, Props, StylesConfig } from 'react-select';

import { cn } from '@/lib/utils';

import { classNames } from './react-select.style';

const selectStyles: StylesConfig = {
	input: (base) => ({
		...base,
	}),

	multiValueLabel(base) {
		return {
			...base,
			whiteSpace: 'normal',
			overflow: 'visible',
		};
	},
};

export type Ref = any;

const ReactSelect = forwardRef<Ref, Props & { extraControlClassName?: string }>(
	(
		{
			options,
			placeholder,
			isMulti = false,
			isClearable = true,
			isSearchable = true,
			isDisabled = false,
			extraControlClassName,
			...props
		},
		ref
	) => {
		return (
			<Select
				ref={ref}
				unstyled
				classNamePrefix={'react-select-'}
				classNames={classNames(extraControlClassName)}
				styles={selectStyles}
				components={{
					ClearIndicator: (props) => (
						<components.ClearIndicator className='mr-1 border-r border-r-input pr-1' {...props}>
							<X className='size-5 font-medium text-destructive' />
						</components.ClearIndicator>
					),

					MultiValueRemove: (props) => (
						<components.MultiValueRemove {...props}>
							<X className='ml-1 size-4 font-medium text-destructive' />
						</components.MultiValueRemove>
					),

					DropdownIndicator: (props) => (
						<components.DropdownIndicator {...props}>
							<ChevronDown
								className={cn(
									'size-5 transform text-secondary/50 transition-transform duration-300',
									props.selectProps.menuIsOpen && 'rotate-90'
								)}
							/>
						</components.DropdownIndicator>
					),
				}}
				isMulti={isMulti}
				isDisabled={isDisabled}
				isClearable={isClearable}
				isSearchable={isSearchable}
				options={options}
				placeholder={placeholder}
				{...props}
			/>
		);
	}
);

// const ReactSelect: React.FC<Props & { extraControlClassName?: string }> = ({
// 	options,
// 	placeholder,
// 	isMulti = false,
// 	isClearable = true,
// 	isSearchable = true,
// 	isDisabled = false,
// 	extraControlClassName,
// 	...props
// }) => {
// 	return (
// 		<Select
// 			unstyled
// 			classNamePrefix={'react-select-'}
// 			classNames={classNames(extraControlClassName)}
// 			styles={selectStyles}
// 			components={{
// 				ClearIndicator: (props) => (
// 					<components.ClearIndicator
// 						className='mr-1 border-r border-r-input pr-1'
// 						{...props}>
// 						<X className='size-5 font-medium text-destructive' />
// 					</components.ClearIndicator>
// 				),

// 				MultiValueRemove: (props) => (
// 					<components.MultiValueRemove {...props}>
// 						<X className='ml-1 size-4 font-medium text-destructive' />
// 					</components.MultiValueRemove>
// 				),

// 				DropdownIndicator: (props) => (
// 					<components.DropdownIndicator {...props}>
// 						<ChevronDown
// 							className={cn(
// 								'size-5 transform text-secondary/50 transition-transform duration-300',
// 								props.selectProps.menuIsOpen && 'rotate-90'
// 							)}
// 						/>
// 					</components.DropdownIndicator>
// 				),
// 			}}
// 			isMulti={isMulti}
// 			isDisabled={isDisabled}
// 			isClearable={isClearable}
// 			isSearchable={isSearchable}
// 			options={options}
// 			placeholder={placeholder}
// 			{...props}
// 		/>
// 	);
// };

export default ReactSelect;
