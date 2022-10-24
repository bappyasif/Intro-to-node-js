import React, { useEffect, useState } from 'react'
import { LoginTwoTone, AppRegistrationTwoTone, TimelineTwoTone, VerifiedUserSharp } from "@mui/icons-material";
import { H1Element, H4Element, NavElement, WrapperDiv } from './GeneralElements'
import { MuiButtonElement, MuiInputElement, TabElement } from './MuiElements';
import { FormElement } from './FormElements';
import { sendDataToServer } from './utils';
import { AppContexts } from '../App';

function MainNavigation() {
  return (
    <WrapperDiv className="nav-wrapper">
      <H1Element value={"Main Navigation"} />
      <NavigationLinks />
      <FloatingLogin />
    </WrapperDiv>
  )
}

export let NavigationLinks = () => {
  return (
    <NavElement className="main-nav">
      <TabElement className={"nav-item"} labelText={"Login"} path={"login"} icon={<LoginTwoTone />} />
      <TabElement className={"nav-item"} labelText={"Register"} path={"register"} icon={<AppRegistrationTwoTone />} />
      <TabElement className={"nav-item"} labelText={"Connect Users"} path={"connect-users"} icon={<VerifiedUserSharp />} />
      <TabElement className={"nav-item"} labelText={"Timeline"} path={"timeline"} icon={<TimelineTwoTone />} />
    </NavElement>
  )
}

let FloatingLogin = () => {
  let [errors, setErrors] = useState([]);
  let [formData, setFormData] = useState({});

  const enpoint = React.useContext(AppContexts)

  let handleChange = (evt, elm) => setFormData(prev => ({ ...prev, [elm]: evt.target.value }))

  let handleError = data => setErrors(data.errors)

  let handleSubmit = evt => {
    evt.preventDefault();
    sendDataToServer(enpoint.baseUrl + "login", formData, handleError)
  }

  useEffect(() => handleError([]), [formData])

  return (
    <WrapperDiv className="fl-wrapper">
      <H4Element value={"Login to your profile"} />
      <FormElement handleSubmit={handleSubmit}>
        <MuiInputElement
          type={"email"}
          id={"email"}
          handleChange={handleChange}
          text="enter email (e.g. t@e.st)"
          required={true}
          color={errors?.length ? "error" : "success"}
          error={errors?.length ? true : false}
        />
        <MuiInputElement
          type={"password"}
          id={"password"}
          handleChange={handleChange}
          text="enter password"
          required={true}
          color={errors?.length ? "error" : "success"}
          error={errors?.length ? true : false}
        />
        <MuiButtonElement type={"submit"} text="Login" />
      </FormElement>
    </WrapperDiv>
  )
}

export default MainNavigation