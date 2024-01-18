import 'dotenv/config';
import { createRecipe, deleteRecipeDal, getRecipeByCreator, getRecipes, updateRecipeDal } from '../dal/dalRecipes';
import { Recipes } from '../interface/interfacesRecipes';


// Imaginary database
export const serviceRecipe = {
    recipes: {
        addrecipe: async (recipeInput: Recipes) => {
            const create = await createRecipe(recipeInput);
            return create;
        },
        updateRecipe: async (input) => {
            const { id, update } = input;
            const updateRecipe = await updateRecipeDal(id, update);
            if (updateRecipe) return updateRecipe;
            return 'recipe not found';
        },
        getAllRecipes: async () => {
            const recipes = await getRecipes();
            if (recipes) return recipes;
            return 'recipes not found';
        },
        getRecipesByCreator: async (email: string) => {
            const recipes = await getRecipeByCreator(email);
            if (recipes) return recipes;
            return 'recipes not found';
        },
        deleteRecipe: async (id: string) => {
            const deleteRecipe = await deleteRecipeDal(id);
            if (deleteRecipe) return deleteRecipe;
            return 'recipe not found';
        },
    },
};
