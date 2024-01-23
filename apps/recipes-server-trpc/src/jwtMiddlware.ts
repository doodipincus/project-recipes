import { TRPCError } from "@trpc/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, UserAttributes } from "./models/userModel";


export const likesVerified = async ({ ctx, next }) => {
    const { req } = ctx;
    const token = req.headers.authorization;

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
    ) as JwtPayload;

    const user = (await User.findOne({
        where: { email: tokenObj.email },
        raw: true,
    })) as unknown as UserAttributes;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    if (user.password !== tokenObj.password)
        throw new TRPCError({ code: 'UNAUTHORIZED' });

    if (user.likes < 30 && !user.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }


    return next();
};


export const adminVerified = async ({ ctx, next }) => {
    const { req } = ctx;
    const token = req.headers.authorization;

    if (!token){ console.error('אין טןקן'); throw new TRPCError({ code: 'UNAUTHORIZED' });}
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
    ) as JwtPayload;

    const user = (await User.findOne({
        where: { email: tokenObj.email },
        raw: true,
    })) as unknown as UserAttributes;
    if (!user) { console.error('אין משתמש כזה'); throw new TRPCError({ code: 'UNAUTHORIZED' });}


    console.log(user);
console.log(tokenObj);


    if (user.password !== tokenObj.password)
    { console.error('סיסמא לא תואמת'); throw new TRPCError({ code: 'UNAUTHORIZED' });}

    console.log(tokenObj);

    if (!user.isAdmin || !tokenObj.isadmin) {
        { console.error('אינך מנהל'); throw new TRPCError({ code: 'UNAUTHORIZED' });}
    }

    return next();
};


export const sharedVerified = async ({ ctx, next }) => {
    const { req } = ctx;
    const token = req.headers.authorization;

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
    ) as JwtPayload;

    const user = (await User.findOne({
        where: { email: tokenObj.email },
        raw: true,
    })) as unknown as UserAttributes;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    if (user.password !== tokenObj.password)
        throw new TRPCError({ code: 'UNAUTHORIZED' });

    if (user.shared < 10 && !user.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }


    return next();
};


export const privetVerified = async ({ ctx, next }) => {
    const { req } = ctx;
    const token = req.headers.authorization;

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });
    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string,
    ) as JwtPayload;

    const user = (await User.findOne({
        where: { email: tokenObj.email },
        raw: true,
    })) as unknown as UserAttributes;
    if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    if (user.password !== tokenObj.password)
        throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next();
};