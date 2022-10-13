import React, { useEffect, useState } from 'react'
import { RenderErrors } from './NewBlogPostForm';
import { beginUserAuthenticationProcess, getExpiration, isLoggedIn } from '../utils';
import { Navigate } from 'react-router';

function UserLogin({auth, setAuth}) {
    // let [auth, setAuth] = useState(false);
    let [errors, setErrors] = useState([]);
    let [userData, setUserData] = useState({});

    let updateError = data => setErrors(data);
    
    let handleAuth = () => setAuth(true);

    let handleSubmit = event => {
        event.preventDefault();
        beginUserAuthenticationProcess(userData, updateError, "http://localhost:3000/user/login", handleAuth)
    }

    useEffect(() => {
        let checkTokenAlreadyExistingIsValid = getExpiration();
        if (checkTokenAlreadyExistingIsValid) {
          if (isLoggedIn()) {
            setAuth(true);
            // console.log("twixc")
            // navigate("/blogs")
          } else {
            // setShowWhichForm("login")
          }
        }
      }, [])

    // useEffect(() => {
    //     if(auth) {
    //         navigate("/blogs")
    //     }
    // }, [auth])

    let handleFormCopntrolChange = (event, prop) => setUserData(prev => ({...prev, [prop]: event.target.value}))

    // checking on every errors response if there is no such user, 
    // so that we can allow user to consider registering
    
    errors.length && console.log(errors)

  return (
    <div className='ul-container'>
        <h2>Please Login First To Access Admin Dashboard Panel</h2>
        {errors.errors?.length ? <RenderErrors errors={errors.errors} /> : null}
        {errors?.success === false ? errors?.msg: null}
        {auth ? <Navigate to={"/blogs"} /> : null}

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