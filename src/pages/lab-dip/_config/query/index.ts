import useTQuery from '@/hooks/useTQuery';

import { labDipQK } from './queryKeys';

export const useLabDipRecipe = <T>() =>
	useTQuery<T>({
		queryKey: labDipQK.recipe(),
		url: '/lab-dip/recipe',
	});

export const useLabDipRecipeByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.recipeByUUID(uuid),
		url: `/lab-dip/recipe/${uuid}`,
		enabled: !!uuid,
	});

// * Info
export const useLabDipInfo = <T>() =>
	useTQuery<T>({
		queryKey: labDipQK.info(),
		url: '/lab-dip/info',
	});

export const useLabDipInfoByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.infoByUUID(uuid),
		url: `/lab-dip/info/${uuid}`,
		enabled: !!uuid,
	});
export const UseLabDipInfoByDetails = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.infoDetailsByUUID(uuid),
		url: `/lab-dip/info/details/${uuid}`,
		enabled: !!uuid,
	});

// * RM
export const useLabDipRM = <T>() =>
	useTQuery<T>({
		queryKey: labDipQK.LabDipRM(),
		url: `/material/stock/by/single-field/lab_dip`,
	});
export const useLabDipRMByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.LabDipRMByUUID(uuid),
		url: `/material/stock/by/single-field/lab_dip/${uuid}`,
		enabled: !!uuid,
	});

// * RM Log
export const useLabDipRMLog = <T>() =>
	useTQuery<T>({
		queryKey: labDipQK.LabDipRMLog(),
		url: `/material/used/by/lab_dip`,
	});
export const useLabDipRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.LabDipRMLogByUUID(uuid),
		url: `/material/used/by/lab_dip${uuid}`,
		enabled: !!uuid,
	});

// * Order Against RM Log
export const useOrderAgainstLabDipRMLog = <T>() =>
	useTQuery<T>({
		queryKey: labDipQK.orderAgainstLabDipRMLog(),
		url: `/zipper/material-trx-against-order/by/lab_dip`,
	});
export const useOrderAgainstLabDipRMLogByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.orderAgainstLabDipRMLogByUUID(uuid),
		url: `/zipper/material-trx-against-order/by/lab_dip${uuid}`,
		enabled: !!uuid,
	});

// * Shade Recipe
export const useLabDipShadeRecipeDescription = <T>() =>
	useTQuery<T>({
		queryKey: labDipQK.shadeRecipeDescription(),
		url: '/lab-dip/shade-recipe',
	});

export const useLabDipShadeRecipeDescriptionByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.shadeRecipeDescriptionByUUID(uuid),
		url: `/lab-dip/shade-recipe/${uuid}`,
		enabled: !!uuid,
	});

// * Shade Recipe Entry
export const useLabDipShadeRecipeEntry = <T>() =>
	useTQuery<T>({
		queryKey: labDipQK.shadeRecipeEntry(),
		url: '/lab-dip/shade-recipe-entry',
	});

export const useLabDipShadeRecipeEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: labDipQK.shadeRecipeEntryByUUID(uuid),
		url: `/lab-dip/shade-recipe-entry${uuid}`,
		enabled: !!uuid,
	});
