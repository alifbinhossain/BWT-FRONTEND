import TemplateRoutes from '@/pages/template/_config/routes';
import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './Hr';
import StoreRoutes from './store';

const privateRoutes: IRoute[] = [...HrRoutes, ...TemplateRoutes, ...StoreRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
