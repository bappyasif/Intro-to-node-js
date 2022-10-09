import React, { useState } from 'react'
import { RenderErrors } from './NewBlogPostForm';
import { sendDataToServer } from './utils';

function RegisterUser() {
    let [errors, setErrors] = useState([])
    let [userData, setUserData] = useState({})

    let updateError = data => setErrors(data);

    let handleSubmit = event => {
        event.preventDefault();
        sendDataToServer(userData, updateError, "http://localhost:3000/user/register")
    }

    let handleFormCopntrolChange = (event, prop) => setUserData(prev => ({...prev, [prop]: event.target.value}))

    errors.length && console.log(errors)

  return (
    <div className='regu-container'>
        <h2>Become A Register User</h2>
        {errors.errors?.length ? <RenderErrors errors={errors.errors} /> : null}

        <p>all required form fields are denoted with asterics</p>
        <form method='post' action='' onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor='name'>Fullname: </label>
                <input id='name' type={"text"} name={"name"} onChange={(event) => handleFormCopntrolChange(event, "name")} placeholder="your fullname" autoComplete='name' autoFocus required />
            </fieldset>
            <fieldset>
                <label htmlFor='email'>Email: </label>
                <input id='email' type={"email"} name={"email"} onChange={(event) => handleFormCopntrolChange(event, "email")} placeholder="your email" autoComplete='email' required />
            </fieldset>
            <fieldset>
                <label htmlFor='password'>Password: </label>
                <input id='password' type={"password"} name={"password"} onChange={(event) => handleFormCopntrolChange(event, "password")} placeholder="your password" autoComplete='password' required />
            </fieldset>
            <fieldset>
                <label htmlFor='confirm'>Confirm Password: </label>
                <input id='confirm' type={"password"} name={"confirm"} onChange={(event) => handleFormCopntrolChange(event, "confirm")} placeholder="please retype your password" autoComplete='password' required />
            </fieldset>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default RegisterUser