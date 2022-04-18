import React, { useState } from 'react'

const LoginView = () => {
   
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  }

  return (
    <div>
      <form>
        <div className='form-grout mb-2'>
          <label className='form-label'>username</label>
          <input 
            type="text" placeholder='Enter username'
            name='username' className='form-control'
            value = {username}
            onChange = {(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className='form-grout mb-2'>
          <label className='form-label'>Last Name</label>
          <input 
            type="password" placeholder='Enter your password'
            name='password' className='form-control'
            value = {password}
            onChange = {(e) => setPassword(e.target.value)} 
          />
        </div>

        <button className='btn btn-success m-1' onClick={(e) => loginSubmit(e)}>Submit</button>
      </form>
    </div>
  )
}

export default LoginView