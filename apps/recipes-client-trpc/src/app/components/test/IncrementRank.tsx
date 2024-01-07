import { useState } from "react";
import { trpc2 } from "../../utils/trpc";

const IncrementRank = () => {
    const [email, setEmail] = useState('');
    const send = async() =>{
        if(email) {
            const send =await trpc2.incrementRank.mutate(email);
            if (send) console.log(send);
          }
    }
    return (
        <>
        <h1 className="text-3xl font-bold underline">Increment rank</h1>
        <input value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        <button className="bg-indigo-500 p-2 font-mono" onClick={send}>incremnt</button>
        </>
    )
};
export default IncrementRank;
