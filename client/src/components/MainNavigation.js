import React from 'react'
import { H1Element, LinkElement, NavElement, WrapperDiv } from './GeneralElements'

function MainNavigation() {
  return (
    <WrapperDiv className="nav-wrapper">
      <H1Element value={"Main Navigation"} />
      <NavElement>
        <LinkElement className={"nav-item"} value={"Login"} path={"login"} />
        <LinkElement className={"nav-item"} value={"Register"} path={"register"} />
        <LinkElement className={"nav-item"} value={"Timeline"} path={"timeline"} />
      </NavElement>
    </WrapperDiv>
  )
}

export default MainNavigation