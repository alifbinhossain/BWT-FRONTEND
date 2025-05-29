import { getYear } from 'date-fns';
import { z } from 'zod';

import { BOOLEAN_REQUIRED, STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Shift Schema
export const SHIFT_SCHEMA = z.object({
	name: STRING_REQUIRED,
	initial: STRING_REQUIRED,
	start_time: STRING_REQUIRED,
	end_time: STRING_REQUIRED,
	late_time: STRING_REQUIRED,
	early_exit_before: STRING_REQUIRED,
	first_half_end: STRING_REQUIRED,
	break_time_end: STRING_REQUIRED,
	default_shift: BOOLEAN_REQUIRED,
	first_half_absent: BOOLEAN_REQUIRED,
	color: STRING_REQUIRED,
	status: BOOLEAN_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const SHIFT_NULL: Partial<IShift> = {
	name: '',
	initial: '',
	start_time: '',
	end_time: '',
	late_time: '',
	early_exit_before: '',
	first_half_end: '',
	break_time_end: '',
	default_shift: false,
	first_half_absent: false,
	color: '',
	status: false,
	remarks: '',
};

export type IShift = z.infer<typeof SHIFT_SCHEMA>;
//* Shift Group Schema
export const SHIFT_GROUP_SCHEMA = z.object({
	name: STRING_REQUIRED,
	default_shift: BOOLEAN_REQUIRED,
	shifts_uuid: STRING_REQUIRED,
	status: BOOLEAN_REQUIRED,
	off_days: z.array(STRING_REQUIRED),
	effective_date: STRING_REQUIRED,
});

export const SHIFT_GROUP_NULL: Partial<IShiftGroup> = {
	name: '',
	default_shift: false,
	shifts_uuid: '',
	status: false,
	off_days: [],
	effective_date: `${getYear(new Date())}-01-01`,
};
export type IShiftGroup = z.infer<typeof SHIFT_GROUP_SCHEMA>;

//* Roaster Schema
export const ROASTER_SCHEMA = z.object({
	shift_uuid: STRING_REQUIRED,
	shift_group_uuid: STRING_REQUIRED,
});

export const ROASTER_NULL: Partial<IRoaster> = {
	shift_uuid: '',
	shift_group_uuid: '',
};
export type IRoaster = z.infer<typeof ROASTER_SCHEMA>;
