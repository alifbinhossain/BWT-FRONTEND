import OrderRoutes from '@/pages/order/_config/routes';
import TemplateRoutes from '@/pages/template/_config/routes';
import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import { DashboardRoutes } from './Dashboard';
import HrRoutes from './Hr';
import StoreRoutes from './Store';

const privateRoutes: IRoute[] = [...DashboardRoutes, ...OrderRoutes, ...StoreRoutes, ...HrRoutes, ...TemplateRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
