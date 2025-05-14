import { useEffect, useRef, useState } from 'react';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';

import { ICustomProductsSelectOption } from '../order/details/transfer/utills';

export const QuantityField: React.FC<{
	index: number;
	form: any;
	productOptions: any[];
	warehouseOptions: any[];
	data: any;
}> = ({ index, form, productOptions, warehouseOptions, data }) => {
	const [MAX_QUANTITY, setMAX_QUANTITY] = useState(0);

	const product_uuid = form.watch(`product_transfer.${index}.product_uuid`);
	const warehouse_uuid = form.watch(`product_transfer.${index}.warehouse_uuid`);
	const quantityValue = form.watch(`product_transfer.${index}.quantity`);
	const TOTAL_MAX_QUANTITY = data?.product_transfer[index]?.quantity
		? MAX_QUANTITY + data?.product_transfer[index]?.quantity
		: MAX_QUANTITY;
	const previousQuantity = useRef(quantityValue);

	useEffect(() => {
		if (product_uuid && warehouse_uuid && productOptions) {
			const selectedProduct = productOptions.find((p) => p.value === product_uuid);
			const selectedWarehouse = warehouseOptions?.find((w) => w.value === warehouse_uuid);

			if (selectedProduct && selectedWarehouse) {
				const warehouseKey = selectedWarehouse.assigned;
				const quantity = (selectedProduct[warehouseKey as keyof ICustomProductsSelectOption] as number) || 0;
				setMAX_QUANTITY(quantity);
			} else {
				setMAX_QUANTITY(0);
			}
		} else {
			setMAX_QUANTITY(0);
		}
	}, [product_uuid, warehouse_uuid, productOptions, warehouseOptions]);

	useEffect(() => {
		if (quantityValue !== undefined) {
			if (quantityValue > TOTAL_MAX_QUANTITY) {
				form.setError(`product_transfer.${index}.quantity`, {
					type: 'max',
					message: `Quantity cannot be greater than ${TOTAL_MAX_QUANTITY}`,
				});
			} else {
				form.clearErrors(`product_transfer.${index}.quantity`);
				previousQuantity.current = quantityValue;
			}
		}
	}, [quantityValue, TOTAL_MAX_QUANTITY, form, index]);

	return (
		<FormField
			name={`product_transfer.${index}.quantity`}
			render={(props) => (
				<CoreForm.Input
					label={`Max: ${data?.product_transfer[index]?.quantity ? MAX_QUANTITY + data?.product_transfer[index]?.quantity : MAX_QUANTITY || 0}`}
					type='number'
					{...props}
				/>
			)}
		/>
	);
};
