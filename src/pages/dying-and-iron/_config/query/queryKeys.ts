export const dyeingQK = {
	all: () => ['dyeing'],

	// * RM
	dyeingRM: () => [...dyeingQK.all(), 'rm'],
	dyeingRMByUUID: (uuid: string) => [...dyeingQK.dyeingRM(), uuid],

	// * RM Log
	dyeingRMLog: () => [...dyeingQK.all(), 'rm-log'],
	dyeingRMLogByUUID: (uuid: string) => [...dyeingQK.dyeingRMLog(), uuid],

	// * swatch
	swatch: () => [...dyeingQK.all(), 'swatch'],
	swatchByUUID: (uuid: string) => [...dyeingQK.swatch(), uuid],

	// * planning
	planning: () => [...dyeingQK.all(), 'planning'],
	planningByUUID: (uuid: string) => [...dyeingQK.planning(), uuid],

	// *  batch
	batch: () => [...dyeingQK.all(), 'batch'],
	batchByUUID: (uuid: string) => [...dyeingQK.batch(), uuid],

	// * Thread Batch
	threadBatch: () => [...dyeingQK.all(), 'thread-batch'],
	threadBatchByUUID: (uuid: string) => [...dyeingQK.threadBatch(), uuid],

	//* Thread Batch Entry
	threadBatchEntry: () => [...dyeingQK.all(), 'thread-batch-entry'],
	threadBatchEntryByUUID: (uuid: string) => [...dyeingQK.threadBatchEntry(), uuid],

	// * Order Against dyeing RM Log * //
	orderAgainstDyeingRMLog: () => [...dyeingQK.all(), 'order-against-rm-log'],
	orderAgainstDyeingRMLogByUUID: (uuid: string) => [...dyeingQK.orderAgainstDyeingRMLog(), uuid],
	//* Dyeing Transfer
	dyeingTransfer: () => [...dyeingQK.all(), 'dyeing-transfer'],
	dyeingTransferByUUID: (uuid: string) => [...dyeingQK.dyeingTransfer(), uuid],
};
