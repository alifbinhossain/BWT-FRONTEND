import { ITableFilterOptionSSR, ITableFilterOptionSSRSelect } from '@/types';

import DynamicSelect from './dynamic-select';
import StaticSelect from './static-select';

function Select<T>(props: ITableFilterOptionSSR<T> & ITableFilterOptionSSRSelect & { isPin?: boolean }) {
	if (props.mode === 'static') {
		return <StaticSelect {...props} />;
	}
	return <DynamicSelect {...props} />;
}

export default Select;
