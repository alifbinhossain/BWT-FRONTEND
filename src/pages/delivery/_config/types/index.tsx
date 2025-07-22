import { IAddOrUpdateProps } from '@/pages/hr/_config/types';
import { IDefaultAddOrUpdateProps, IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { extend } from 'lodash';

import { ICourierTableData, IVehicleTableData } from '../columns/columns.type';

//* Vehicles

export interface IVehiclesAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: IVehicleTableData | null;
}
//* Courier

export interface ICourierAddOrUpdateProps extends IDefaultAddOrUpdateProps {
	updatedData?: ICourierTableData | null;
}
