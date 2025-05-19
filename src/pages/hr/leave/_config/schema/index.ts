import { z } from 'zod';

import { STRING_NULLABLE, STRING_REQUIRED } from '@/utils/validators';

//* Leave Policy Schema
export const LEAVE_POLICY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const LEAVE_POLICY_NULL: Partial<ILeavePolicy> = {
	name: '',
	remarks: null,
};

export type ILeavePolicy = z.infer<typeof LEAVE_POLICY_SCHEMA>;

//* Leave Category Schema
export const LEAVE_CATEGORY_SCHEMA = z.object({
	name: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const LEAVE_CATEGORY_NULL: Partial<ILeaveCategory> = {
	name: '',
	remarks: null,
};

export type ILeaveCategory = z.infer<typeof LEAVE_CATEGORY_SCHEMA>;
