import TemplateRoutes from '@/pages/template/_config/routes';
import { IRoute } from '@/types';
import { cloneDeep } from 'lodash';

import HrRoutes from './Hr';

const privateRoutes: IRoute[] = [...HrRoutes, ...TemplateRoutes];

const privateRoutesClone = cloneDeep(privateRoutes);

export { privateRoutes, privateRoutesClone };
