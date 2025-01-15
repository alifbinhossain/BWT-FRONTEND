
import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './Hr';
import StoreRoutes from './store';

const privateRoutes: IRoute[] = [...HrRoutes, ...StoreRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
