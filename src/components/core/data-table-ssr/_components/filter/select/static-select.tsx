import { ITableFilterOptionSSR, ITableFilterOptionSSRSelectStatic } from '@/types';
import useTableFilter from '@/hooks/useTableFilter';

import ReactSelect from '@/components/ui/react-select';

function StaticSelect<T>({
	accessor,
	label,
	isPin,
	options,
}: ITableFilterOptionSSR<T> & ITableFilterOptionSSRSelectStatic & { isPin?: boolean }) {
	const { addFilter, filters } = useTableFilter();

	return (
		<ReactSelect
			options={options}
			menuPortalTarget={isPin ? document.body : undefined}
			styles={{ menuPortal: (base) => ({ ...base, zIndex: 999999999999999 }) }}
			name={label}
			id={label}
			onChange={(option: any) => {
				addFilter(accessor as string, option?.value as string);
			}}
			value={
				(options?.find(
					(option) => option.value === filters?.find((filter) => filter.name === accessor)?.value
				) as any) || null
			}
		/>
	);
}

export default StaticSelect;
