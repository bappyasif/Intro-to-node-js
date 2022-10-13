import React from 'react'
import { Link } from 'react-router-dom';
import { logoutUser } from './utils'

function ShowNavs({ auth, setAuth }) {
  // let handleClick = event => {
  //   event.preventDefault();
  //   handleWhichForm("register");
  // }

  // let clickHandler = event => {
  //   event.preventDefault();
  //   handleWhichForm("login");
  // }

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

let ToggleForm = ({ toggle, handleToggle }) => {
  let handleClick = event => {
    event.preventDefault();
    handleToggle()
  }

  return (
    <a className='nav-item' href='/' onClick={handleClick}>Create Blog Form {toggle ? "Hide" : "Show"}</a>
  )
}

export default ShowNavs