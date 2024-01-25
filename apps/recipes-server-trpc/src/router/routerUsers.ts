import { z } from 'zod';
import { adminProcedure, likesProcedure, privetProcedure, publicProcedure, router } from '../trpc';
import { serviceUsers } from '../service/serviceUsers';
import { Register, SignInInput } from '../interface/interfacesUsers';

export const usersRouter = router({
  // register: publicProcedure
  //   .input(
  //     z.object({
  //       user_name: z.string(),
  //       email: z.string(),
  //       password: z.string(),
  //     })
  //   )
  //   .mutation(async (opts) => {
  //     try {
  //       const { input } = opts;
  //       const newUser = await serviceUsers.users.register(input as Register);
  //       return newUser;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }),
  // signIn: publicProcedure
  //   .input(z.object({ email: z.string(), password: z.string() }))
  //   .query(async (opts) => {
  //     try {
  //       const { input } = opts;
  //       const user = await serviceUsers.users.signIn(input as SignInInput);
  //       return user;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }),
  updateUser: privetProcedure
    .input(
      z.object({
        email: z.string(),
        update: z.object({
          user_name: z.string(),
          email: z.string(),
        }),
      })
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const {req, res} = opts.ctx
        const user = await serviceUsers.users.updateUser(input, req.headers.authorization );
        return user;
      } catch (err) {
        console.error(err);
      }
    }),
  deleteUser: privetProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { input } = opts;
      const {req, res} = opts.ctx
      const user = await serviceUsers.users.deleteUser(input, req.headers.authorization);
      return user;
    } catch (err) {
      console.error(err);
    }
  }),
  getUsers: adminProcedure.query(async () => {
    try {
      const users = await serviceUsers.users.getUsers();
      return users;
    } catch (err) {
      console.error(err);
    }
  }),
  // getUserByEmail: publicProcedure.input(z.string()).query(async (opts) => {
  //   try {
  //     const { input } = opts;
  //     const user = await serviceUsers.users.getUserByEmail(input);
  //     return user;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }),
  // incrementLike: publicProcedure.input(z.string()).mutation(async (opts) => {
  //   try {
  //     const { input } = opts;
  //     const user = await serviceUsers.users.incrementLike(input);
  //     return user;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }),
})
