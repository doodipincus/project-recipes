import { createTRPCProxyClient, createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '../../../../recipes-server-trpc/src/main';

export const trpc = createTRPCReact<AppRouter>();

export const trpc2 = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:2022'
        })
    ]
})