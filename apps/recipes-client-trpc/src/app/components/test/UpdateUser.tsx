import { useState } from 'react';
import { trpc } from '../../utils/trpc';

const UpdateUser = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const send = async() => {
    if (email) {
      const send = await trpc.updateUser.mutate({email,update:{user_name:'',password:newPassword, email:''}});
      if (send) console.log(send);
    }
  };
  return (
    <>
    <h1 className='text-3xl font-bold underline'>update user</h1>
      <label htmlFor="">
        email
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </label>
      <label>
        new password
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
      </label>
      <button className="bg-indigo-500 p-2 font-mono" onClick={send}>
        update user
      </button>
    </>
  );
};
export default UpdateUser;
