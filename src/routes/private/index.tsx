import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './Hr';
import StoreRoutes from './store';
import WorkRoutes from './work';

const privateRoutes: IRoute[] = [...HrRoutes, ...StoreRoutes, ...WorkRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
