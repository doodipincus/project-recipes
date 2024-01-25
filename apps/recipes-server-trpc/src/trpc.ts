import { initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { likesVerified } from './JWTmiddlware/likes';
import { sharedVerified } from './JWTmiddlware/shared';
import { adminVerified } from './JWTmiddlware/admin';
import { privetVerified } from './JWTmiddlware/privet';



export const createContext = (_ops: CreateNextContextOptions) => {
    const { req, res } = _ops;
    return { req, res };
};

const t = initTRPC.context<typeof createContext>().create();

export const likesVerifiedToken = t.middleware(likesVerified);
export const sharedVerifiedToken = t.middleware(sharedVerified);
export const adminVerifiedToken = t.middleware(adminVerified);
export const privetVerifiedToken = t.middleware(privetVerified);

export const likesProcedure = t.procedure.use(likesVerifiedToken);
export const adminProcedure = t.procedure.use(adminVerifiedToken);
export const sharedProcedure = t.procedure.use(sharedVerifiedToken);
export const privetProcedure = t.procedure.use(privetVerifiedToken);


export const router = t.router;

export const publicProcedure = t.procedure;