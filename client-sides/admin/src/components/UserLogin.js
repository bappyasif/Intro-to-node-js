import React, { useState } from 'react'
import { RenderErrors } from './NewBlogPostForm';
import { beginUserAuthenticationProcess } from './utils';

function UserLogin() {
    let [errors, setErrors] = useState([])
    let [userData, setUserData] = useState({})

    let updateError = data => setErrors(data);

    let handleSubmit = event => {
        event.preventDefault();
        beginUserAuthenticationProcess(userData, updateError, "http://localhost:3000/user/login")
    }

    let handleFormCopntrolChange = (event, prop) => setUserData(prev => ({...prev, [prop]: event.target.value}))

    errors.length && console.log(errors)

  return (
    <div className='ul-container'>
        <h2>Please Login First to Access Admin Dashboard Panel</h2>
        {errors.errors?.length ? <RenderErrors errors={errors.errors} /> : null}
        {errors?.success === false ? errors?.msg: null}

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