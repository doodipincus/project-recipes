import { z } from 'zod';
import {
  likesProcedure,
  privetProcedure,
  publicProcedure,
  router,
} from '../trpc';
import { serviceRecipe } from '../service/serviceResipes';
import { AddRecipes, RecipeBack } from '../interface/interfacesRecipes';
import EventEmitter from 'events';
import { observable } from '@trpc/server/observable';

export const ee = new EventEmitter();

export const recipesRouter = router({
  addRecipe: likesProcedure
    .input(
      z.object({
        title: z.string(),
        category: z.string(),
        image: z.string(),
        creator_name: z.string(),
        creator_email: z.string(),
        sensitivity: z.string(),
        country_of_origin: z.string(),
        difficulty: z.string(),
        ingredients: z.array(z.string()),
        instructions: z.string(),
        preparation_time: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        console.log(opts.input);

        const { input } = opts;
        const newRecipe = await serviceRecipe.recipes.addrecipe(
          input as AddRecipes
        );
        return newRecipe;
      } catch (err) {
        console.error(err);
      }
    }),
  updateRecipe: likesProcedure
    .input(
      z.object({
        id: z.string(),
        update: z.object({
          title: z.string(),
          category: z.string(),
          image: z.string(),
          creator_name: z.string(),
          creator_email: z.string(),
          sensitivity: z.string(),
          country_of_origin: z.string(),
          difficulty: z.string(),
          ingredients: z.array(z.string()),
          instructions: z.string(),
          preparation_time: z.string(),
        }),
      })
    )
    .mutation(async (opts) => {
      try {
        const { req, res } = opts.ctx;
        const { input } = opts;
        const recipe = await serviceRecipe.recipes.updateRecipe(
          input,
          req.headers.authorization
        );
        return recipe;
      } catch (err) {
        console.error(err);
      }
    }),
  deleteRecipe: likesProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { req, res } = opts.ctx;
      const { input } = opts;
      const remove = await serviceRecipe.recipes.deleteRecipe(
        input,
        req.headers.authorization
      );
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

  addRating: privetProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        user_name: z.string(),
        rating: z.number(),
        comment: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const changeRating = await serviceRecipe.recipes.addRating(input);
        return changeRating;
      } catch (err) {
        console.error(err);
      }
    }),

  onAdd: publicProcedure.subscription(() => {
    return observable<RecipeBack>((emit) => {
      const onAdd = (data: RecipeBack) => {
        emit.next(data);
      };
      ee.on('add', onAdd);

      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
});
