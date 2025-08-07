import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IInfoPopup, INFO_POPUP_NULL, INFO_POPUP_SCHEMA } from '../_config/schema';
import { IInfoPopUpAddOrUpdateProps } from '../_config/types';
import { status } from './utils';

const AddOrUpdate: React.FC<IInfoPopUpAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();

	const form = useRHF(INFO_POPUP_SCHEMA, INFO_POPUP_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(INFO_POPUP_NULL);
		setOpen((prev) => !prev);
	};

	// Submit handler
	async function onSubmit(values: IInfoPopup) {
		// ADD NEW ITEM
		updateData.mutateAsync({
			url: `${url}/${updatedData?.uuid}`,
			updatedData: {
				...values,
				is_contact_with_customer: true,
				updated_at: getDateTime(),
			},
			onClose,
		});
	}

	return (
		<AddModal open={open} setOpen={onClose} title={'Customer FeedBack'} form={form} onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='order_info_status'
				render={(props) => <CoreForm.ReactSelect options={status} {...props} />}
			/>
			<FormField
				control={form.control}
				name='customer_feedback'
				render={(props) => <CoreForm.Textarea {...props} />}
			/>
		</AddModal>
	);
};

export default AddOrUpdate;
