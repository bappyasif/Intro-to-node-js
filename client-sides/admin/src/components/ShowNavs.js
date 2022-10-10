import React from 'react'
import { logoutUser } from './utils'

function ShowNavs({ showWhichForm, handleWhichForm, handleToggle, toggle }) {
  let handleClick = event => {
    event.preventDefault();
    handleWhichForm("register");
  }

  let clickHandler = event => {
    event.preventDefault();
    handleWhichForm("login");
  }
  
  return (
    <nav>
      <ul>
        <li>
          <a className='nav-item' href='http://127.0.0.1:5500/client-sides/public/index.html' target={"_blank"} rel="noreferrer">Blog Site</a>
          {showWhichForm !== "logout" ? <a className='nav-item' href='/' onClick={handleClick}>Register</a> : null}
          {showWhichForm !== "logout" ? <a className='nav-item' href='/' onClick={clickHandler}>Login</a> : null}
        </li>

        {
          showWhichForm === "logout"
            ?
            <li>
              <ToggleForm toggle={toggle} handleToggle={handleToggle} />
              <LogoutButton handleWhichForm={handleWhichForm} />
            </li>
            :
            null
        }
      </ul>
    </nav>
  )
}

let LogoutButton = ({ handleWhichForm }) => {
  let handleClick = (event) => {
    event.preventDefault();
    logoutUser();
    handleWhichForm("login")
  }

  return (
    <a className='nav-item' href='/' onClick={handleClick}>Logout</a>
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