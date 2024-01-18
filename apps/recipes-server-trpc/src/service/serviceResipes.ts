import 'dotenv/config';
import { createRecipe, deleteRecipeDal, getRecipes, updateRecipeDal } from '../dal/dalRecipes';
import { Recipes } from '../interface/interfacesRecipes';


// Imaginary database
export const serviceUsers = {
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
        getRecipesByCreator: {

        },
        deleteRecipe: async (id: string) => {
            const deleteRecipe = await deleteRecipeDal(id);
            if (deleteRecipe) return deleteRecipe;
            return 'recipe not found';
        },
    },
};
