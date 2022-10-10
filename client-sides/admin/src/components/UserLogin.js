import React, { useState } from 'react'
import { RenderErrors } from './NewBlogPostForm';
import { beginUserAuthenticationProcess } from './utils';

function UserLogin({handleWhichForm}) {
    let [errors, setErrors] = useState([])
    let [userData, setUserData] = useState({})

    let updateError = data => setErrors(data);

    let handleSubmit = event => {
        event.preventDefault();
        beginUserAuthenticationProcess(userData, updateError, "http://localhost:3000/user/login", handleWhichForm)
    }

    let handleFormCopntrolChange = (event, prop) => setUserData(prev => ({...prev, [prop]: event.target.value}))

    // checking on every errors response if there is no such user, 
    // so that we can allow user to consider registering
    
    errors.length && console.log(errors)

  return (
    <div className='ul-container'>
        <h2>Please Login First to Access Admin Dashboard Panel</h2>
        {errors.errors?.length ? <RenderErrors errors={errors.errors} /> : null}
        {errors?.success === false ? errors?.msg: null}
        {/* {errors?.success === false ? handleWhichForm("register") : null} */}

        <form method='post' action='' onSubmit={handleSubmit}>
            <legend>Enter your registered email and password</legend>
            <fieldset>
                <label>Email: </label>
                <input type={"email"} autoComplete="email" onChange={(event) => handleFormCopntrolChange(event, "email")} placeholder="your email goes here" autoFocus required />
            </fieldset>
            <fieldset>
                <label>Password: </label>
                <input type={"password"} autoComplete={"password"} onChange={(event) => handleFormCopntrolChange(event, "password")} placeholder="your email goes here" required />
            </fieldset>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default UserLogin