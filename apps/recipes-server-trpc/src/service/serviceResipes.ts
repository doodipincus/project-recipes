import 'dotenv/config';
import { addRatingDal, createRecipe, deleteRecipeDal, getRecipeByCreator, getRecipes, updateRecipeDal } from '../dal/dalRecipes';
import { AddRecipes } from '../interface/interfacesRecipes';


// Imaginary database
export const serviceRecipe = {
    recipes: {
        addrecipe: async (recipeInput: AddRecipes) => {
            const create = await createRecipe(recipeInput);
            return create;
        },
        updateRecipe: async (input, token) => {
            const { id, update } = input;
            const updateRecipe = await updateRecipeDal(id, update, token);
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
        deleteRecipe: async (id: string, token) => {
            const deleteRecipe = await deleteRecipeDal(id, token);
            if (deleteRecipe) return deleteRecipe;
            return 'recipe not found';
        },
        addRating: async (input) => {
            const { id, email, user_name, rating, comment } = input;
            const deleteRecipe = await addRatingDal(id, email, user_name, rating, comment)
            if (deleteRecipe) return deleteRecipe;
            return 'recipe not found';
        },
    },
};
