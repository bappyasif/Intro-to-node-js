import React from 'react'
import { Link } from 'react-router-dom';
import { logoutUser } from './utils'

function ShowNavs({ auth, setAuth }) {
  return (
    <nav>
      <ul>
        <li>
          <Link className='nav-item' to={"http://127.0.0.1:5500/client-sides/public/index.html"}>Blog Site</Link>
        </li>
        <li>
          {auth ? null : <Link className='nav-link' to={"/login"}>Login</Link>}
        </li>
        <li>
          {auth ? null : <Link className='nav-link' to={"/register"}>Register</Link>}
        </li>
        <li>
          {auth ? <Link className='nav-link' to={"/create/blog"}>CreateNewBlog</Link> : null}
        </li>
        <li>
          {auth ? <LogoutButton setAuth={setAuth} /> : null}
        </li>
      </ul>
    </nav>
  )
}

let LogoutButton = ({ setAuth }) => {
  let handleClick = (event) => {
    logoutUser();
    setAuth(false)
  }

  return (
    <Link className='nav-link' to={"/login"} onClick={handleClick}>Logout</Link>
  )
}

export default ShowNavs