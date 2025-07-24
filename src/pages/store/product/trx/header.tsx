import { ICustomWarehouseSelectOption } from '@/pages/work/order/details/transfer/utills';
import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { IFormSelectOption } from '@core/form/types';

import {
	useOtherBox,
	useOtherFloor,
	useOtherOrder,
	useOtherRack,
	useOtherWarehouse,
	useOtherWarehouseByQuery,
} from '@/lib/common-queries/other';

import { IInternalTransfer } from '../../_config/schema';

const Header = ({ product_uuid }: { product_uuid: string }) => {
	const form = useFormContext<IInternalTransfer>();
	const { data: fromWarehouseOptions } = useOtherWarehouseByQuery<ICustomWarehouseSelectOption[]>(
		`product_uuid=${product_uuid}`
	);
	const { data: warehouseOptions } = useOtherWarehouse<ICustomWarehouseSelectOption[]>();
	const { data: RackOptions } = useOtherRack<IFormSelectOption[]>();
	const { data: FloorOptions } = useOtherFloor<IFormSelectOption[]>();
	const { data: BoxOptions } = useOtherBox<IFormSelectOption[]>();

	return (
		<CoreForm.Section title={`Information`}>
			<FormField
				control={form.control}
				name='from_warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='From'
						placeholder='Select Warehouse'
						menuPortalTarget={document.body}
						options={
							fromWarehouseOptions
								? fromWarehouseOptions.filter((w) => w.value !== form.watch('to_warehouse_uuid'))
								: []
						}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='to_warehouse_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='To'
						placeholder='Select Warehouse'
						menuPortalTarget={document.body}
						options={
							warehouseOptions
								? warehouseOptions.filter((w) => w.value !== form.watch('from_warehouse_uuid'))
								: []
						}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='rack_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Rack'
						menuPortalTarget={document.body}
						placeholder='Select Rack'
						options={RackOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='floor_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Floor'
						menuPortalTarget={document.body}
						placeholder='Select Floor'
						options={FloorOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='box_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Box'
						menuPortalTarget={document.body}
						placeholder='Select Box'
						options={BoxOptions!}
						{...props}
					/>
				)}
			/>
		</CoreForm.Section>
	);
};

export default Header;
