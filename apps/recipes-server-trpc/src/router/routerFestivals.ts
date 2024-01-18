import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { serviceRecipe } from '../service/serviceResipes';
import { serviceFestivals } from '../service/serviceFestivals';
import { Festivals } from '../interface/interfacesFestivals';

export const festivalsRouter = router({
  addfestival: publicProcedure
    .input(
      z.object({
///////////////////////////
      })
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const newFestival = await serviceFestivals.festivals.addFestival(input as Festivals);
        return newFestival;
      } catch (err) {
        console.error(err);
      }
    }),
//   updateUser: publicProcedure
//     .input(
//       z.object({
//         id: z.string(),
//         update: z.object({
// //////////////////////////////
//         }),
//       })
//     )
//     .mutation(async (opts) => {
//       try {
//         const { input } = opts;
//         const recipe = await servicerecipe.recipes.updateRecipe(input);
//         return recipe;
//       } catch (err) {
//         console.error(err);
//       }
//     }),
  deleteFestival: publicProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { input } = opts;
      const remove = await serviceFestivals.festivals.deleteFestival(input);
      return remove;
    } catch (err) {
      console.error(err);
    }
  }),
  getFestivals: publicProcedure.query(async () => {
    try {
      const festivals = await serviceFestivals.festivals.getAllFestivals();
      return festivals;
    } catch (err) {
      console.error(err);
    }
  }),
//   getRecipesByCreator: publicProcedure.input(z.string()).query(async (opts) => {
//     try {
//       const { input } = opts;
//       const recipes = await servicerecipe.recipes.getRecipesByCreator(input);
//       return recipes;
//     } catch (err) {
//       console.error(err);
//     }
//   }),
})
