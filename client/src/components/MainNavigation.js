import React from 'react'
import { AnchorElement, H1Element, NavElement, WrapperDiv } from './GeneralElements'

function MainNavigation() {
  return (
    <WrapperDiv className="nav-wrapper">
        <H1Element value={"Main Navigation"} />
        <NavElement>
            <AnchorElement className={"nav-item"} value={"Login"} />
            <AnchorElement className={"nav-item"} value={"Register"} />
            <AnchorElement className={"nav-item"} value={"Timeline"} />
        </NavElement>
    </WrapperDiv>
  )
}

export default MainNavigation