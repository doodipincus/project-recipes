import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../../recipes-server-trpc/src/main';

export const trpc = createTRPCReact<AppRouter>();