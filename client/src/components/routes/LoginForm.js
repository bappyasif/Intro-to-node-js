import React, { useContext, useState } from 'react'
import { FieldsetElement, FormElement, InputElement, LabelElement, LegendElement, SubmitButton } from '../FormElements'
import { H1Element, WrapperDiv } from '../GeneralElements'
import { sendDataToServer } from '../utils';
import { AppContexts } from "../../App"
import ShowErrors from '../ShowErrors';
import { Box, Icon, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Facebook, GitHub, Google, LinkedIn } from '@mui/icons-material';

function LoginForm() {
    let [errors, setErrors] = useState([]);
    let [formData, setFormData] = useState({});
    const enpoint = useContext(AppContexts)

    let handleChange = (evt, elm) => setFormData(prev => ({ ...prev, [elm]: evt.target.value }))

    let handleError = data => setErrors(data.errors)

    let handleSubmit = evt => {
        evt.preventDefault();
        sendDataToServer(enpoint.baseUrl + "/login", formData, handleError)
    }
    // console.log(formData, "formData!!");
    console.log(errors, "errors!!")

    return (
        <Box
            sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}
        >
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

            <ThirdPartyLoginOutlets />

        </Box>
    )
}

let ThirdPartyLoginOutlets = () => {
    let renderLoginOutlets = () => loginOutlets.map(item => <RenderLoginOutlet key={item.name} item={item} />)
    return (
        <Paper sx={{ml: 2, mt: 1, borderRadius: 2}}>
            <Typography variant='h2'>Login With</Typography>
            {renderLoginOutlets()}
        </Paper>
    )
}

let RenderLoginOutlet = ({ item }) => {
    return (
        <Stack
            sx={{ alignItems: "center", flexDirection: "row", justifyContent: "left", m: 1, p: 1, pl: 4, pr: 4, outline: "solid .2px", borderRadius: 11 }}
        >
            <IconButton>
                <Icon sx={{ m: .4, color: "skyblue", textAlign: "left" }}>
                    {item.icon}
                </Icon>
            </IconButton>
            <Typography variant='h4' sx={{ textAlign: "center", ml: 4 }}>{item.name}</Typography>
        </Stack>
    )
}

let loginOutlets = [
    {
        name: "Google",
        icon: <Google />
    },
    {
        name: "Facebook",
        icon: <Facebook />
    },
    {
        name: "Github",
        icon: <GitHub />
    },
    {
        name: "LinkedIn",
        icon: <LinkedIn />
    }
]

export default LoginForm