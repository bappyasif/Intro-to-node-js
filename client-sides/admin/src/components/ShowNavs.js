import React from 'react'
import { logoutUser } from './utils'

function ShowNavs({showWhichForm, handleWhichForm}) {
  return (
    <nav>
        <a href='http://127.0.0.1:5500/client-sides/public/index.html' target={"_blank"} rel="noreferrer">Blog Site</a>
        {showWhichForm === 'logout' ? <LogoutButton handleWhichForm={handleWhichForm} /> : null}
    </nav>
  )
}

let LogoutButton = ({handleWhichForm}) => {
    let handleClick = () => {
        logoutUser();
        handleWhichForm("login")
    }

    return (
        <button onClick={handleClick}>Logout</button>
    )
}

export default ShowNavs