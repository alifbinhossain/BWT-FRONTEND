import { useEffect, useMemo } from 'react';
import { PageProvider } from '@/context';
import { useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime, PageInfo } from '@/utils';

import { IEmployeeTableData } from '../../_config/columns/columns.type';
import { useHrDeviceAllocation } from '../../_config/query';
import { DEVICE_ALLOCATE_NULL, DEVICE_ALLOCATE_SCHEMA, IDeviceAllocate } from '../../_config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeviceList = () => {
	const { user } = useAuth();
	const { uuid } = useParams();
	const pageInfo = useMemo(() => new PageInfo('HR/Device List', '/hr/device-allocate', 'admin__device_allocate'), []);

	const { data, postData, invalidateQuery } =
		useHrDeviceAllocation<{ employee_uuid: string; employee_name: string }[]>(uuid);

	const form = useRHF(DEVICE_ALLOCATE_SCHEMA, DEVICE_ALLOCATE_NULL);

	const { fields } = useFieldArray({
		control: form.control,
		name: 'entry',
	});

	useEffect(() => {
		if (data) {
			const customData = data.map((item) => ({
				is_checked: false,
				employee_uuid: item.employee_uuid,
				employee_name: item.employee_name,
				is_temporary_access: false,
				temporary_from_date: null,
				temporary_to_date: null,
			}));

			form.setValue('entry', customData);
		}
	}, [data, form]);

	const onSubmit = async (values: IDeviceAllocate) => {
		const entries = values.entry
			.filter((item) => item.is_checked)
			.map((item) => ({
				...item,
				device_list_uuid: uuid,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			}));

		if (entries.length === 0) {
			toast.error('Please select at least one employee');
			return;
		}
		await postData
			.mutateAsync({
				url: '/hr/device-permission',
				newData: entries,
			})
			.then(() => {
				invalidateQuery();
			});
	};

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>

			<CoreForm.AddEditWrapper title={' Add Purchase Entry'} form={form} onSubmit={onSubmit}>
				<CoreForm.DynamicFields
					title='Device Allocate'
					form={form}
					fieldName='entry'
					fieldDefs={useGenerateFieldDefs({
						watch: form.watch,
						form,
					})}
					fields={fields}
				/>
			</CoreForm.AddEditWrapper>
		</PageProvider>
	);
};

export default DeviceList;
