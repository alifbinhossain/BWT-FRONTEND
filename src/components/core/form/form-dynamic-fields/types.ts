import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

import { IFormSelectOption } from '@core/form/types';

type FieldReadonly = {
	type: 'readOnly';
};
type FieldCustom = {
	type: 'custom';
	component: (index: number) => React.ReactNode;
};

type FieldText = {
	type: 'text';
	// inputType?: 'text' | 'number';
	placeholder?: string;
};
type FieldTextArea = {
	type: 'textarea';
	placeholder?: string;
};
type FieldNumber = {
	type: 'number';
	placeholder?: string;
};
type FieldCheckBox = {
	type: 'checkBox';
};

type FieldSelect = {
	type: 'select';
	placeholder?: string;
	options: IFormSelectOption[];
};
type FieldSelectCreate = {
	type: 'select-create';
	placeholder?: string;
	options: IFormSelectOption[];
};
type FieldMultiSelect = {
	type: 'multiSelect';
	placeholder?: string;
	options: IFormSelectOption[];
};

type FieldJoinInputUnit = {
	type: 'join-input-unit';
	placeholder?: string;
	unit: (index: number) => string;
	inputType?: string;
};

export type FieldDef = {
	header: string;
	accessorKey: string;
	className?: string;
	isLoading?: boolean;
	hidden?: boolean;
	width?: string;
	disabled?: boolean;
} & (
	| FieldText
	| FieldNumber
	| FieldSelect
	| FieldReadonly
	| FieldCustom
	| FieldJoinInputUnit
	| FieldTextArea
	| FieldCheckBox
	| FieldMultiSelect
	| FieldSelectCreate
);

export interface DynamicFieldsProps {
	title: string | React.ReactNode;
	form: UseFormReturn<any>;
	fieldName: string;
	fieldDefs: FieldDef[];
	extraHeader?: React.ReactNode;
	handleAdd?: () => void;
	fields: FieldArrayWithId<any>[];
	viewAs?: 'default' | 'spreadsheet' | 'kanban';
	containerClassName?: string;
	className?: string;
	children?: React.ReactNode;
}
