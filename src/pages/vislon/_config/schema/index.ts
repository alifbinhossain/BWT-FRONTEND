import { z } from 'zod';

import { NUMBER_DOUBLE_REQUIRED, STRING_NULLABLE } from '@/utils/validators';

// Vislon Transaction Schema
export const VISLON_TRANSACTION_SCHEMA = z.object({
	trx_quantity_in_kg: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const VISLON_TRANSACTION_SCHEMA_NULL: Partial<IVislonTransactionSchema> = {
	remarks: null,
};

export type IVislonTransactionSchema = z.infer<typeof VISLON_TRANSACTION_SCHEMA>;
