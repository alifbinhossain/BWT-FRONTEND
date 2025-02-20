import { z } from 'zod';

import {
	BOOLEAN_REQUIRED,
	NUMBER_DOUBLE_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
} from '@/utils/validators';

//* Purchase Return Log
export const TRANSFER_SCHEMA = z.object({
	uuid: STRING_OPTIONAL,
	section_uuid: STRING_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const TRANSFER_NULL: Partial<ITransfer> = {
	uuid: '',
	section_uuid: '',
	remarks: '',
};

export type ITransfer = z.infer<typeof TRANSFER_SCHEMA>;
