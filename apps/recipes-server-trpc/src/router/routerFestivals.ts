import { z } from 'zod';
import { publicProcedure, router, sharedProcedure } from '../trpc';
import { serviceFestivals } from '../service/serviceFestivals';
import EventEmitter from 'events';
import { observable } from '@trpc/server/observable';
import { FestivalBack } from '../interface/interfacesFestivals';

export const ee = new EventEmitter();

export const festivalsRouter = router({
  addfestival: sharedProcedure
    .input(
      z.object({
        festivalName: z.string(),
        festivalDescription: z.string(),
        festivalDateTime: z.string(),
        festivalImage: z.string(),
        festivalCreatorName: z.string(),
        festivalCreatorEmail: z.string(),
        festivalLocation: z.array(z.number())
      })
    )
    .mutation(async (opts) => {
      try {
        const input = opts.input as Required<typeof opts.input>;
        const newFestival = await serviceFestivals.festivals.addFestival({ ...input, festivalDateTime: new Date(input.festivalDateTime) });
        return newFestival;
      } catch (err) {
        console.error(err);
      }
    }),
  deleteFestival: sharedProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { input } = opts;
      const { req, res } = opts.ctx
      const remove = await serviceFestivals.festivals.deleteFestival(input, req.headers.authorization);
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
  onAdd: publicProcedure.subscription(() => {
    return observable<FestivalBack>((emit) => {
      const onAdd = (data: FestivalBack) => {
        emit.next(data)
      }
      ee.on('add',onAdd)

      return () => {
        ee.off('add', onAdd)
      }
    })
  }),
  // updatefestival: publicProcedure
  //     .input(
  //         id: z.string(),
  //         update: z.object({
  //             festivalName: z.string(),
  //             festivalDescription: z.string(),
  //             festivalDateTime: z.date(),
  //             festivalImage: z.string(),
  //             festivalCreatorName: z.string(),
  //             festivalCreatorEmail: z.string(),
  //             festivalLocation: z.array(z.number())
  //         }),
  //   })
  // )
  // .mutation(async (opts) => {
  //             try {
  //                 const { input } = opts;
  //                 const recipe = await servicerecipe.recipes.updateRecipe(input);
  //                 return recipe;
  //             } catch (err) {
  //                 console.error(err);
  //             }
  //         }),

})
