// import { createTRPCProxyClient, httpBatchLink } from '@trpc/react-query';
// import type { AppRouter } from '../../../../recipes-server-trpc/src/main';

// export const trpc = createTRPCProxyClient<AppRouter>({
//     links: [
//         httpBatchLink({
//             url: 'http://localhost:2022',
//             headers() {
//                 return {
//                     Authorization: String(localStorage.getItem("TOKEN"))
//                 }
//             }
//         })
//     ]
// })

import { createTRPCProxyClient, createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import type { AppRouter } from '../../../../recipes-server-trpc/src/main';

const header = localStorage.getItem('TOKEN') ?? 'token';
const wsClient = createWSClient({
    url: `ws://localhost:2022?authorization=${encodeURIComponent(header)}`,
})

export const trpc =
    createTRPCProxyClient<AppRouter>({
        links: [
            splitLink({
                condition: op => {
                    return op.type === 'subscription'
                },
                true: wsLink({
                    client: wsClient,
                }),

                false:
                    httpBatchLink({
                        url: "http://localhost:2022",
                        headers() {
                            return {
                                Authorization: String(localStorage.getItem("TOKEN"))
                            }
                        }
                    }),
            }),
        ],
    });