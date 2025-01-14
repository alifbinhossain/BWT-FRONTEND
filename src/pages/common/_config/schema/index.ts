import { z } from 'zod';

import {
	NUMBER_DOUBLE_NULLABLE,
	NUMBER_DOUBLE_REQUIRED,
	NUMBER_NULLABLE,
	NUMBER_REQUIRED,
	STRING_NULLABLE,
	STRING_OPTIONAL,
	STRING_REQUIRED,
	UUID_FK,
	UUID_REQUIRED,
} from '@/utils/validators';

// Coil to Dyeing Log Schema
export const COMMON_COIL_TO_DYEING_LOG_SCHEMA = z.object({
	order_description_uuid: STRING_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});
export const COMMON_COIL_TO_DYEING_LOG_NULL: Partial<ICommonCoilToDyeingLog> = {
	order_description_uuid: '',
	remarks: null,
};

export type ICommonCoilToDyeingLog = z.infer<typeof COMMON_COIL_TO_DYEING_LOG_SCHEMA>;

// Tape or Coil Production Log Schema
export const TAPE_OR_COIL_PRODUCTION_LOG_SCHEMA = z.object({
	production_quantity: NUMBER_DOUBLE_REQUIRED.gt(0),
	wastage: NUMBER_DOUBLE_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const TAPE_OR_COIL_PRODUCTION_LOG_NULL: Partial<ITapeOrCoilProductionLog> = {
	wastage: 0,
	remarks: null,
};

export type ITapeOrCoilProductionLog = z.infer<typeof TAPE_OR_COIL_PRODUCTION_LOG_SCHEMA>;

// Tape to Coil Transaction Schema
export const TAPE_TO_COIL_TRX_SCHEMA = z.object({
	trx_quantity: NUMBER_REQUIRED,
	wastage: NUMBER_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const TAPE_TO_COIL_TRX_NULL: Partial<ITapeToCoilTrx> = {
	wastage: 0,
	remarks: null,
};

export type ITapeToCoilTrx = z.infer<typeof TAPE_TO_COIL_TRX_SCHEMA>;

// Coil Stock Schema
export const COIL_STOCK_SCHEMA = z.object({
	order_entry_id: NUMBER_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED.gt(0),
	remarks: STRING_NULLABLE,
});

export const COIL_STOCK_NULL: Partial<ICoilStock> = {
	remarks: null,
};

export type ICoilStock = z.infer<typeof COIL_STOCK_SCHEMA>;

// Dyeing Against Stock Schema
export const DYEING_AGAINST_STOCK_SCHEMA = z.object({
	trx_quantity: NUMBER_REQUIRED.gt(0),
	remarks: STRING_NULLABLE,
});

export const DYEING_AGAINST_STOCK_NULL: Partial<IDyeingAgainstStock> = {
	remarks: null,
};

export type IDyeingAgainstStock = z.infer<typeof DYEING_AGAINST_STOCK_SCHEMA>;

// Coil Production Schema
export const COIL_PROD_SCHEMA = z.object({
	production_quantity: NUMBER_DOUBLE_REQUIRED.gt(0),
	wastage: NUMBER_DOUBLE_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const COIL_PROD_NULL: Partial<ICoilProd> = {
	remarks: null,
};

export type ICoilProd = z.infer<typeof COIL_PROD_SCHEMA>;

// Common Coil To Dyeing Schema
export const COMMON_COIL_TO_DYEING_SCHEMA = z.object({
	coil_to_dyeing_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			order_id: UUID_REQUIRED,
			trx_quantity: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const COMMON_COIL_TO_DYEING_NULL: Partial<ICommonCoilToDyeing> = {
	coil_to_dyeing_entry: [],
};

export type ICommonCoilToDyeing = z.infer<typeof COMMON_COIL_TO_DYEING_SCHEMA>;

// Dyeing Transfer Schema
export const DYEING_TRANSFER_SCHEMA = z.object({
	dyeing_transfer_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			order_description_uuid: STRING_REQUIRED,
			colors: z.array(STRING_REQUIRED).nullable(),
			trx_quantity: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const DYEING_TRANSFER_NULL: Partial<IDyeingTransfer> = {
	dyeing_transfer_entry: [],
};

export type IDyeingTransfer = z.infer<typeof DYEING_TRANSFER_SCHEMA>;

// Update Dyeing Transfer Schema
export const UPDATE_DYEING_TRANSFER_SCHEMA = z.object({
	order_description_uuid: UUID_FK,
	trx_quantity: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const UPDATE_DYEING_TRANSFER_NULL: Partial<IUpdateDyeingTransfer> = {
	order_description_uuid: null,
	trx_quantity: 0,
	remarks: null,
};

export type IUpdateDyeingTransfer = z.infer<typeof UPDATE_DYEING_TRANSFER_SCHEMA>;

// Tape Required Schema
export const TAPE_REQUIRED_SCHEMA = z.object({
	end_type_uuid: UUID_REQUIRED,
	item_uuid: UUID_REQUIRED,
	nylon_stopper_uuid: UUID_REQUIRED,
	zipper_number_uuid: UUID_REQUIRED,
	top: NUMBER_DOUBLE_REQUIRED,
	bottom: NUMBER_DOUBLE_REQUIRED,
	raw_mtr_per_kg: NUMBER_DOUBLE_REQUIRED,
	dyed_mtr_per_kg: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const TAPE_REQUIRED_NULL: Partial<ITapeRequired> = {
	remarks: null,
};

export type ITapeRequired = z.infer<typeof TAPE_REQUIRED_SCHEMA>;

// Tape Stock Trx To Dying Schema
export const TAPE_STOCK_TRX_TO_DYING_SCHEMA = z.object({
	order_description_uuid: NUMBER_REQUIRED,
	trx_quantity: NUMBER_DOUBLE_REQUIRED.gt(0),
	remarks: STRING_NULLABLE,
});

export const TAPE_STOCK_TRX_TO_DYING_NULL: Partial<ITapeStockTrxToDying> = {
	remarks: null,
};

export type ITapeStockTrxToDying = z.infer<typeof TAPE_STOCK_TRX_TO_DYING_SCHEMA>;

// Dyeing Transfer From Stock Schema
export const DYEING_TRANSFER_FROM_STOCK_SCHEMA = z.object({
	dyeing_transfer_entry: z.array(
		z.object({
			uuid: STRING_OPTIONAL,
			order_description_uuid: STRING_REQUIRED,
			trx_quantity: NUMBER_DOUBLE_REQUIRED,
			remarks: STRING_NULLABLE,
		})
	),
});

export const DYEING_TRANSFER_FROM_STOCK_NULL: Partial<IDyeingTransferFromStock> = {
	dyeing_transfer_entry: [],
};

export type IDyeingTransferFromStock = z.infer<typeof DYEING_TRANSFER_FROM_STOCK_SCHEMA>;

// Tape Production Schema
export const TAPE_PROD_SCHEMA = z.object({
	production_quantity: NUMBER_REQUIRED.gt(0),
	wastage: NUMBER_NULLABLE,
	remarks: STRING_NULLABLE,
});

export const TAPE_PROD_NULL: Partial<ITapeProd> = {
	remarks: null,
};

export type ITapeProd = z.infer<typeof TAPE_PROD_SCHEMA>;

// Tape Stock Add Schema
export const TAPE_STOCK_ADD_SCHEMA = z.object({
	name: STRING_REQUIRED,
	item_uuid: STRING_REQUIRED,
	zipper_number_uuid: STRING_REQUIRED,
	is_import: NUMBER_NULLABLE,
	is_reverse: STRING_NULLABLE,
	raw_per_kg_meter: NUMBER_DOUBLE_REQUIRED,
	dyed_per_kg_meter: NUMBER_DOUBLE_REQUIRED,
	remarks: STRING_NULLABLE,
});

export const TAPE_STOCK_ADD_NULL: Partial<ITapeStockAdd> = {
	name: '',
	item_uuid: '',
	zipper_number_uuid: '',
	remarks: null,
};

export type ITapeStockAdd = z.infer<typeof TAPE_STOCK_ADD_SCHEMA>;
