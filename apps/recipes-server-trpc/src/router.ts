import { z } from 'zod';
import { publicProcedure } from './trpc';
import { serviceUsers } from './service/serviceUsers';
import { Register, SignInInput } from './interface/interfacesUsers';

export const routerToApp = {
  register: publicProcedure
    .input(
      z.object({
        user_name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const newUser = await serviceUsers.users.register(input as Register);
        return newUser;
      } catch (err) {
        console.error(err);
      }
    }),
  signIn: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async (opts) => {
      try {
        const { input } = opts;
        const user = await serviceUsers.users.signIn(input as SignInInput);
        return user;
      } catch (err) {
        console.error(err);
      }
    }),
  updateUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        update: z.object({
          user_name: z.string(),
          email: z.string(),
          password: z.string(),
        }),
      })
    )
    .mutation(async (opts) => {
      try {
        const { input } = opts;
        const user = await serviceUsers.users.updateUser(input);
        return user;
      } catch (err) {
        console.error(err);
      }
    }),
  deleteUser: publicProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { input } = opts;
      const user = await serviceUsers.users.deleteUser(input);
      return user;
    } catch (err) {
      console.error(err);
    }
  }),
  getUsers: publicProcedure.query(async () => {
    try {
      const users = await serviceUsers.users.getUsers();
      return users;
    } catch (err) {
      console.error(err);
    }
  }),
  getUserByEmail: publicProcedure.input(z.string()).query(async (opts) => {
    try {
      const { input } = opts;
      const user = await serviceUsers.users.getUserByEmail(input);
      return user;
    } catch (err) {
      console.error(err);
    }
  }),
  incrementRank: publicProcedure.input(z.string()).mutation(async (opts) => {
    try {
      const { input } = opts;
      const user = await serviceUsers.users.incrementRank(input);
      return user;
    } catch (err) {
      console.error(err);
    }
  }),
};
