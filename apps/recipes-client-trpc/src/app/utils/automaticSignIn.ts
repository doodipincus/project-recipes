import { useSetAtom } from "jotai";
import { userAtom, userIsLoggedInAtom } from "./atoms";
import { trpc } from "./trpc";


export const automaticSignIn = async () => {
    const setUserIsLoggedIn = useSetAtom(userIsLoggedInAtom);
    const setUser = useSetAtom(userAtom);

    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    console.log(email)
    console.log(password);

//     if (email && password) {
//         const res = await trpc.users.signIn.query({ email, password });
//         if (res && typeof res !== 'string') {
//             console.log(typeof res);
//             console.log(res);
// ;

//             setUserIsLoggedIn(true);
//             setUser(res);
//         }
//     }
}