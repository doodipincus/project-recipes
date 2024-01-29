import { z } from 'zod';
import { adminProcedure, privetProcedure, publicProcedure, router } from '../trpc';
import EventEmitter from 'events';
import { observable } from '@trpc/server/observable';
import { serviceFavorites } from '../service/serviceFavorites';
import { FavoriteBack } from '../interface/interfacesFavorites';

export const ee = new EventEmitter();

export const favoritesRouter = router({
  
  gatAllFavorites: adminProcedure.query(async () => {
    try {
      const allFavorites = await serviceFavorites.favorites.getAllFavorites();
      return allFavorites;
    } catch (err) {
      console.error(err);
    }
  }),

  getFavoritesByUser: privetProcedure.input(z.string()).query(async (opts) => {
    try {
      const { input } = opts;
      const favorites = await serviceFavorites.favorites.getFavoritesbyUser(input);
      return favorites;
    } catch (err) {
      console.error(err);
    }
  }),

  getFavoritesByUserAndRecipe: privetProcedure.input(z.object({email:z.string(), recipe_id:z.string()})).query(async (opts) => {
    try {
      const { input } = opts;
      const favorite = await serviceFavorites.favorites.getFavoritesbyUserAndRecipe(input.email, input.recipe_id);
      return favorite;
    } catch (err) {
      console.error(err);
    }
  }),

  getFavoritesByRecipe: publicProcedure.input(z.string()).query(async (opts) => {
    try {
      const { input } = opts;
      const reviews = await serviceFavorites.favorites.getFavoritesbyRecipe(input);
      return reviews;
    } catch (err) {
      console.error(err);
    }
  }),
  
  deleteFavorite: privetProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { input } = opts;
      const deleteRecipe = await serviceFavorites.favorites.deleteFavorite(input);
      return deleteRecipe;
    } catch (err) {
      console.error(err);
    }
  }),

  onAdd: publicProcedure.subscription(() => {
    return observable<FavoriteBack>((emit) => {
      const onAdd = (data: FavoriteBack) => {
        emit.next(data);
      };
      ee.on('add', onAdd);

      return () => {
        ee.off('add', onAdd);
      };
    });
  }),

//   onAdd: publicProcedure.subscription(() => {
//     return observable<FestivalBack>((emit) => {
//       const onAdd = (data: FestivalBack) => {
//         emit.next(data)
//       }
//       ee.on('add',onAdd)

//       return () => {
//         ee.off('add', onAdd)
//       }
//     })
//   }),
})
