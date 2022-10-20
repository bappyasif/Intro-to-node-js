import React, { useContext, useState } from 'react'
import { FieldsetElement, FormElement, InputElement, LabelElement, LegendElement, SubmitButton } from '../FormElements'
import { H1Element, WrapperDiv } from '../GeneralElements'
import { sendDataToServer } from '../utils';
import {AppContexts} from "../../App"
import ShowErrors from '../ShowErrors';

function LoginForm() {
    let [errors, setErrors] = useState([]);
    let [formData, setFormData] = useState({});
    const enpoint = useContext(AppContexts)

    let handleChange = (evt, elm) => setFormData(prev => ({ ...prev, [elm]: evt.target.value }))

    let handleError = data => setErrors(data.errors)

    let handleSubmit = evt => {
        evt.preventDefault();
        sendDataToServer(enpoint.baseUrl+"login", formData, handleError)
    }
    // console.log(formData, "formData!!");
    console.log(errors, "errors!!")

    return (
        <WrapperDiv className="login-form">
            <H1Element value={"Login Form"} />
            
            {errors?.length ? <ShowErrors errors={errors} /> : null}

            <FormElement handleSubmit={handleSubmit}>
                <LegendElement text={"Enter your registered email and password"} />
                <FieldsetElement>
                    <LabelElement forVal={"email"} text="Email: " />
                    <InputElement type={"email"} id={"email"} name="email" value={"t@e.st"} handleChange={handleChange} text="enter email (e.g. t@e.st)" required={true} />
                </FieldsetElement>
                <FieldsetElement>
                    <LabelElement forVal={"password"} text="Password: " />
                    <InputElement type={"password"} id={"password"} name="password" value={"e.g.: p1a2s3s4w5o6r7d8"} handleChange={handleChange} text="enter password (e.g.: p1a2s3s4w5o6r7d8)" required={true} />
                </FieldsetElement>
                <SubmitButton text={"Login"} />
            </FormElement>
        </WrapperDiv>
    )
}

export default LoginForm