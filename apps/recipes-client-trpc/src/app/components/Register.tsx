import { useState } from 'react'
import { trpc2 } from '../utils/trpc'
// import '../../styles.css'


function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const submit = async () => {
    const input = {
      user_name: name,
      email,
      password,
    }

    const send = trpc2.register.mutate(input);
    if (send) console.log(send);
  }

  return (
    <>
      <h4
      //  className="text-3xl font-bold underline"
      className="bg-indigo-500 p-2 font-mono"
       >Register</h4>

      <label>user name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br/>
      
      <label>email</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      
      <label>password</label>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <br/>
      <button type="submit" onClick={submit}>Save</button>
    </>
  )
}

export default Register