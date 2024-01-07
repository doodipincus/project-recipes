import { z } from "zod";
import { publicProcedure } from "./trpc";
import { db } from "./db";
import { Register, SignInInput } from "./interface";


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
            const { input } = opts;
            const newUser = await db.users.register(input as Register);
            return newUser;
        }),
    signIn: publicProcedure.input(z.object({email: z.string(), password: z.string()})).query(async (opts) => {
        const { input } = opts;
        const user = await db.users.signIn(input as SignInInput);
        return user;
    }),
    updateUser: publicProcedure
        .input
        (z.object({
            email: z.string(),
            update: z.object({
                user_name: z.string(),
                email: z.string(),
                password: z.string()
            })
        })
        )
        .mutation(async (opts) => {
            const { input } = opts;
            const user = await db.users.updateUser(input);
            return user;
        }),
    deleteUser: publicProcedure.input(z.string()).mutation(async (opts) => {
        const { input } = opts;
        const user = await db.users.deleteUser(input);
        return user;
    }),
    getUsers: publicProcedure.query(async () => {
        const users = await db.users.getUsers();
        return users;
    }),
    getUserByEmail: publicProcedure.input(z.string()).query(async (opts) => {
        const { input } = opts;
        const user = await db.users.getUserByEmail(input);
        return user;
    }),
    incrementRank: publicProcedure.input(z.string()).mutation(async (opts) => {
        const { input } = opts;
        const user = await db.users.incrementRank(input);
        return user;
    })
}