import useTQuery from '@/hooks/useTQuery';

import { workQK } from './queryKeys';

// * Problem
export const useWorkProblems = <T>() =>
	useTQuery<T>({
		queryKey: workQK.problem(),
		url: '/work/problem',
	});

export const useWorkProblemsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.problemByUUID(uuid),
		url: `/work/problem/${uuid}`,
		enabled: !!uuid,
	});

//* Order
export const useWorkInfo = <T>() =>
	useTQuery<T>({
		queryKey: workQK.info(),
		url: '/work/info',
	});

export const useWorkInfoByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.infoByDetails(uuid),
		url: `/work/order-details-by-info/${uuid}`,
		enabled: !!uuid,
	});
export const useWorkOrder = <T>() =>
	useTQuery<T>({
		queryKey: workQK.job(),
		url: '/work/order',
	});
//* QC
export const useWorkQC = <T>() =>
	useTQuery<T>({
		queryKey: workQK.qc(),
		url: '/work/order?qc=true',
	});
export const useWorkQCByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.qcByUUID(uuid),
		url: `/work/order/${uuid}`,
		enabled: !!uuid,
	});
//* Is Delivery Ready
export const useWorkIsDeliveryReady = <T>() =>
	useTQuery<T>({
		queryKey: workQK.isDeliveryReady(),
		url: '/work/order?is_delivered=true',
	});
export const useWorkIsDeliveryReadyByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.isDeliveryReadyByUUID(uuid),
		url: `/work/order/${uuid}`,
		enabled: !!uuid,
	});
//* Order Details
export const useWorkOrderByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.jobByUUID(uuid),
		url: `/work/order/${uuid}`,
		enabled: !!uuid,
	});

export const useWorkOrderByDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.orderByDetails(uuid),
		url: `/work/diagnosis-details-by-order/${uuid}`,
		enabled: !!uuid,
	});

//* Diagnosis
export const useWorkDiagnosis = <T>() =>
	useTQuery<T>({
		queryKey: workQK.diagnosis(),
		url: '/work/diagnosis',
	});
export const useWorkDiagnosisByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.diagnosisByUUID(uuid),
		url: `/work/diagnosis/${uuid}`,
		enabled: !!uuid,
	});
//* Section
export const useWorkSections = <T>() =>
	useTQuery<T>({
		queryKey: workQK.section(),
		url: '/work/section',
	});
export const useWorkSectionsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.sectionByUUID(uuid),
		url: `/work/section/${uuid}`,
		enabled: !!uuid,
	});
//* Process
export const useWorkProcesses = <T>() =>
	useTQuery<T>({
		queryKey: workQK.process(),
		url: '/work/process',
	});
export const useWorkProcessesByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.processByUUID(uuid),
		url: `/work/process/${uuid}`,
		enabled: !!uuid,
	});
export const useWorkGetTransferSection = <T>(order_uuid: string) =>
	useTQuery<T>({
		queryKey: workQK.transferSection(order_uuid),
		url: `/work/process?order_uuid=${order_uuid}&entry=true`,
	});
