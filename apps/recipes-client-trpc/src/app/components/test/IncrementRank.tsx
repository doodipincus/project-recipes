import { useState } from "react";
import { trpc } from "../../utils/trpc";

const IncrementRank = () => {
    const [email, setEmail] = useState('');
    const send = async() =>{
        if(email) {
            const res =await trpc.incrementRank.mutate(email);
            if (res) console.log(res);
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
