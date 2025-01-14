export const labDipQK = {
	all: () => ['labDip'],

	// * recipe
	recipe: () => [...labDipQK.all(), 'recipe'],
	recipeByUUID: (uuid: string) => [...labDipQK.recipe(), uuid],

	// * info
	info: () => [...labDipQK.all(), 'info'],
	infoByUUID: (uuid: string) => [...labDipQK.info(), uuid],

	// * info Details
	infoDetailsByUUID: (uuid: string) => [...labDipQK.info(), 'details', uuid],

	// * RM
	LabDipRM: () => [...labDipQK.all(), 'rm'],
	LabDipRMByUUID: (uuid: string) => [...labDipQK.LabDipRM(), uuid],

	// * RM Log
	LabDipRMLog: () => [...labDipQK.all(), 'rm-log'],
	LabDipRMLogByUUID: (uuid: string) => [...labDipQK.LabDipRMLog(), uuid],

	// * Order Against lab_dip RM Log * //
	orderAgainstLabDipRMLog: () => [...labDipQK.all(), 'order-against-rm-log'],
	orderAgainstLabDipRMLogByUUID: (uuid: string) => [...labDipQK.orderAgainstLabDipRMLog(), uuid],
	// * Shade Recipe
	shadeRecipe: () => [...labDipQK.all(), 'shade-recipe'],
	shadeRecipeByUUID: (uuid: string) => [...labDipQK.shadeRecipe(), uuid],

	// * Shade Recipe Description
	shadeRecipeDescription: () => [...labDipQK.all(), 'shade-recipe-description'],
	shadeRecipeDescriptionByUUID: (uuid: string) => [...labDipQK.shadeRecipeDescription(), uuid],

	// * Shade Recipe Entry
	shadeRecipeEntry: () => [...labDipQK.all(), 'shade-recipe-entry'],
	shadeRecipeEntryByUUID: (uuid: string) => [...labDipQK.shadeRecipeEntry(), uuid],
};
