import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import DeliveryRoutes from './delivery';
import HrRoutes from './Hr';
import ProfileRoutes from './profile';
import StoreRoutes from './store';
import WorkRoutes from './work';

const privateRoutes: IRoute[] = [...ProfileRoutes, ...HrRoutes, ...StoreRoutes, ...WorkRoutes, ...DeliveryRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
