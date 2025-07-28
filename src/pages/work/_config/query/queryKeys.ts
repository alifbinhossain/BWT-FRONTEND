import { orderBy } from 'lodash';

export const workQK = {
	all: () => ['work'],

	//* problem
	problem: () => [...workQK.all(), 'problem'],
	problemByUUID: (uuid: string) => [...workQK.problem(), uuid],
	//*info
	info: (query?: string) => [...workQK.all(), 'info', query ? query : ''],
	infoByUUID: (uuid: string) => [...workQK.info(), uuid],
	infoByDetails: (uuid: string) => [...workQK.info(), 'infoByDetails', uuid],
	infoOrderByDetails: (uuid: string) => [...workQK.info(), 'infoOrderByDetails', uuid],
	//* order
	job: () => [...workQK.all(), 'job'],
	jobByUUID: (uuid: string) => [...workQK.job(), uuid],
	orderByDetails: (uuid: string) => [...workQK.job(), 'orderByDetails', uuid],
	orderByCustomerUUID: (uuid: string) => [...workQK.job(), 'orderByCustomerUUID', uuid],
	//* QC
	qc: () => [...workQK.all(), 'qc'],
	qcByUUID: (uuid: string) => [...workQK.qc(), uuid],
	//*repairing
	repairing: () => [...workQK.all(), 'repairing'],
	repairingByUUID: (uuid: string) => [...workQK.repairing(), uuid],
	//* is delivery ready
	isDeliveryReady: () => [...workQK.all(), 'deliveryReady'],
	isDeliveryReadyByUUID: (uuid: string) => [...workQK.isDeliveryReady(), uuid],
	//* diagnosis
	diagnosis: () => [...workQK.all(), 'diagnosis'],
	diagnosisByUUID: (uuid: string) => [...workQK.diagnosis(), uuid],
	//* section
	section: () => [...workQK.all(), 'section'],
	sectionByUUID: (uuid: string) => [...workQK.section(), uuid],
	//*process
	process: () => [...workQK.all(), 'process'],
	processByUUID: (uuid: string) => [...workQK.process(), uuid],

	//*transfer-section
	transferSection: (order_uuid: string) => [...workQK.all(), 'transferSection', order_uuid],
	//*Zone
	zone: () => [...workQK.all(), 'zone'],
	zoneByUUID: (uuid: string) => [...workQK.zone(), uuid],
	//* Accessories
	accessories: () => [...workQK.all(), 'accessories'],
	accessoriesByUUID: (uuid: string) => [...workQK.accessories(), uuid],
	//* Order Transfer
	orderTransfer: () => [...workQK.all(), 'orderTransfer'],
	orderTransferByUUID: (uuid: string) => [...workQK.orderTransfer(), uuid],
	//* Chat
	chat: (order_uuid: string) => [...workQK.all(), 'chat', order_uuid],
};
