import { IResponse } from '@/types';
import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherOrder } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IStockActionTrx } from '../_config/columns/columns.type';
import { TRANSFER_NULL, TRANSFER_SCHEMA } from '../_config/schema';

interface ITrxProps {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IStockActionTrx | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IStockActionTrx | null>>;
	postData: UseMutationResult<
		IResponse<any>,
		AxiosError<IResponse<any>, any>,
		{
			url: string;
			newData: any;
			isOnCloseNeeded?: boolean;
			onClose?: (() => void) | undefined;
		},
		any
	>;
}

const Trx: React.FC<ITrxProps> = ({ url, open, setOpen, updatedData, setUpdatedData, postData }) => {
	const { data: orderOptions } = useOtherOrder<IFormSelectOption[]>();

	const { user } = useAuth();
	const MAX_QUANTITY = updatedData?.max_quantity ?? 0;
	const schema = TRANSFER_SCHEMA.extend({ quantity: z.number().int().positive().max(MAX_QUANTITY) });
	const form = useRHF(schema, TRANSFER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(TRANSFER_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IStockActionTrx) {
		// ADD NEW ITEM
		postData.mutateAsync({
			url,
			newData: {
				...values,
				product_uuid: updatedData?.uuid,
				warehouse_uuid: updatedData?.warehouse_uuid,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			},
			onClose,
		});
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={'Transfer Material'}
			form={form}
			isSmall={true}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='order_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Order' placeholder='Select Order' options={orderOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='quantity'
				render={(props) => (
					<CoreForm.Input label={`Quantity (Max Transfer: ${MAX_QUANTITY})`} type='number' {...props} />
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default Trx;
