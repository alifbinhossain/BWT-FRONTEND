import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import {
	useOtherBox,
	useOtherFloor,
	useOtherModelByQuery,
	useOtherRack,
	useOtherWarehouse,
} from '@/lib/common-queries/other';

const Location: React.FC<{ form: any; index: number }> = ({ form, index }) => {
	const { data: warehouseOptions } = useOtherWarehouse<IFormSelectOption[]>();
	const { data: rackOption } = useOtherRack<IFormSelectOption[]>();
	const { data: floorOption } = useOtherFloor<IFormSelectOption[]>();
	const { data: boxOption } = useOtherBox<IFormSelectOption[]>();
	const home_delivery = form.watch(`order_entry.${index}.is_home_repair`);
	if (home_delivery) {
		return undefined;
	}
	return (
		<div className='grid grid-cols-2 gap-4'>
			<FormField
				control={form.control}
				name={`order_entry.${index}.warehouse_uuid`}
				render={(props) => (
					<CoreForm.ReactSelect
						label='Warehouse'
						placeholder='Select Warehouse'
						options={warehouseOptions!}
						{...props}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name={`order_entry.${index}.rack_uuid`}
				render={(props) => (
					<CoreForm.ReactSelect label='Rack' placeholder='Select Rack' options={rackOption!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name={`order_entry.${index}.floor_uuid`}
				render={(props) => (
					<CoreForm.ReactSelect label='Floor' placeholder='Select Floor' options={floorOption!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name={`order_entry.${index}.box_uuid`}
				render={(props) => (
					<CoreForm.ReactSelect label='Box' placeholder='Select Box' options={boxOption!} {...props} />
				)}
			/>
		</div>
	);
};

export default Location;
