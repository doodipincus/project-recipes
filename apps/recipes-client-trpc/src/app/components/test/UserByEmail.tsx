import { useState } from "react";
import { trpc2 } from "../../utils/trpc";

const UserByEmail = () => {
    const [email, setEmail] = useState('');
    const send =async () =>{
        if(email) {
            const send =await trpc2.getUserByEmail.query(email);
            if (send) console.log(send);
          }
    }
    return (
        <>
        <h1 className="text-3xl font-bold underline">get user by email</h1>
        <input value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        <button className="bg-indigo-500 p-2 font-mono" onClick={send}>get by email</button>
        </>
    )
};
export default UserByEmail;
