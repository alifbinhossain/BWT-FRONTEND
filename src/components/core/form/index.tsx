import FormAddEditWrapper from './add-edit-wrapper';
import FormCheckbox from './checkbox';
import FormDatePicker from './date-picker';
import DateTimePicker from './date-time-picker';
import FileUpload from './file-upload';
import FormDynamicFields from './form-dynamic-fields';
import Gender from './gender';
import FormInput from './input';
import FormJoinInputSelect from './join-input-select';
import FormJoinInputUnit from './join-input-unit';
import FormMultiSelect from './multi-select';
import Otp from './otp';
import Phone from './phone';
import FormReactSelect from './react-select';
import FormReactSelectCreate from './react-select-create';
import FormSection from './section';
import FormSelect from './select';
import FormSubmit from './submit';
import FormTextarea from './textarea';

const Form = {
	Input: FormInput,
	Textarea: FormTextarea,
	DatePicker: FormDatePicker,
	Checkbox: FormCheckbox,
	Select: FormSelect,
	MultiSelect: FormMultiSelect,
	ReactSelect: FormReactSelect,
	Submit: FormSubmit,
	Section: FormSection,
	JoinInputUnit: FormJoinInputUnit,
	JoinInputSelect: FormJoinInputSelect,
	DynamicFields: FormDynamicFields,
	AddEditWrapper: FormAddEditWrapper,
	ReactSelectCreate: FormReactSelectCreate,
	Phone,
	Otp,
	Gender,
	DateTimePicker,
	FileUpload,
};

export default Form;
