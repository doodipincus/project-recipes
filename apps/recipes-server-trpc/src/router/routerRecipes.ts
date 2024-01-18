import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { serviceRecipe } from '../service/serviceResipes';
import { Recipes } from '../interface/interfacesRecipes';

export const recipesRouter = router({
  addRecipe: publicProcedure
    .input(
      z.object({
///////////////////////////
      })
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const newRecipe = await serviceRecipe.recipes.addrecipe(input as Recipes);
        return newRecipe;
      } catch (err) {
        console.error(err);
      }
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        id: z.string(),
        update: z.object({
//////////////////////////////
        }),
      })
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const recipe = await serviceRecipe.recipes.updateRecipe(input);
        return recipe;
      } catch (err) {
        console.error(err);
      }
    }),
  deleteRecipe: publicProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { input } = opts;
      const remove = await serviceRecipe.recipes.deleteRecipe(input);
      return remove;
    } catch (err) {
      console.error(err);
    }
  }),
  getRecipes: publicProcedure.query(async () => {
    try {
      const recipes = await serviceRecipe.recipes.getAllRecipes();
      return recipes;
    } catch (err) {
      console.error(err);
    }
  }),
  getRecipesByCreator: publicProcedure.input(z.string()).query(async (opts) => {
    try {
      const { input } = opts;
      const recipes = await serviceRecipe.recipes.getRecipesByCreator(input);
      return recipes;
    } catch (err) {
      console.error(err);
    }
  }),
})
