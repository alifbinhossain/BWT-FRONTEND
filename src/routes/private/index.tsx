import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import DeliveryRoutes from './delivery';
import HrRoutes from './Hr';
import PayrollRoutes from './payroll';
import ProfileRoutes from './profile';
import StoreRoutes from './store';
import WorkRoutes from './work';

const privateRoutes: IRoute[] = [
	...ProfileRoutes,
	...HrRoutes,
	...StoreRoutes,
	...WorkRoutes,
	...DeliveryRoutes,
	...PayrollRoutes,
];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
