import { createTRPCProxyClient, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '../../../../recipes-server-trpc/src/main';

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:2022'
        })
    ]
})