import { TRPCError } from '@trpc/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserAttributes } from '../interface/interfacesUsers';
import { serviceUsers } from '../service/serviceUsers';


export const sharedVerified = async ({ ctx, next }) => {
    const { req } = ctx;
    const token = req.headers.authorization;

    if (!token) {
        console.error('אין טןקן');
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const tokenObj = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN as string
    ) as JwtPayload;

    const user = (await serviceUsers.users.getUserByEmail(
        tokenObj.email
    )) as unknown as UserAttributes;

    if (!user) {
        console.error('אין משתמש כזה');
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    if (user.password !== tokenObj.password) {
        console.error('סיסמא לא תואמת');
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    if (user.shared < 10 && !user.isAdmin) {
        console.error('אינך מנהל');
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
};