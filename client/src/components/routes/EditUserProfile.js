import { Box, FormControl, Input, InputLabel, Stack, TextareaAutosize, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { CoverPhoto, fakeDataModel, ProfilePhoto } from '../UserProfile'

function EditUserProfile() {
    let [userData, setUserData] = useState({})

    let handleData = (evt, elem) => setUserData(prev => ({ ...prev, [elem]: evt.target.value }))

    useEffect(() => setUserData(fakeDataModel[0]), [])

    console.log(userData, "userData", userData?.fullName)

    return (
        <Box>
            <Typography variant='h1'>Edit User Profile</Typography>
            <CoverPhoto />
            {/* {userData.fullName ? <EditNameAndInfo handleData={handleData} data={userData} /> : null} */}
            {userData.fullName ? <RenderFormWithData handleData={handleData} data={userData} /> : null}
        </Box>
    )
}

let RenderFormWithData = ({ handleData, data }) => {
    let renderData = []

    for (let key in data) {
        renderData.push(<RenderFormControlItem key={key} handleData={handleData} dataVal={data[key]} elem={key} />)
    }

    return (
        <Box>
            <Stack>
                <ProfilePhoto />
            </Stack>
            <Stack>
                {renderData}
            </Stack>
        </Box>
    )
}

let RenderFormControlItem = ({ handleData, dataVal, elem }) => {
    let check = ["frSent", "frRcvd", "friends", "created", "email"].includes(elem)

    if (elem === "created") {
        dataVal = moment(dataVal).format("DD-MM-YYYY")
    }

    return (
        <FormControl sx={{ m: 2 }} disabled={check}>
            {elem !== "bio" ? <InputLabel htmlFor={elem}>{elem}</InputLabel> : null}
            {
                elem === "bio"
                    ?
                    <TextareaAutosize style={{ backgroundColor: "transparent", border: "none", borderBottom: "solid .1px silver" }} minRows={2} maxRows={4} cols={40} defaultValue={dataVal} onChange={e => handleData(e, elem)} />
                    :
                    <Input type={elem === "email" ? "email" : "text"} defaultValue={dataVal} onChange={e => handleData(e, elem)} />
            }
        </FormControl>
    )
}

let EditNameAndInfo = ({ handleData, data }) => {
    let { fullName, email } = { ...data }

    return (
        <Box>
            <Stack>
                <ProfilePhoto />
            </Stack>
            <Stack>
                <FormControl sx={{ m: 2 }}>
                    <InputLabel htmlFor='name'>Name</InputLabel>
                    <Input defaultValue={fullName} onChange={e => handleData(e, "fullName")} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <Input defaultValue={email} type="email" onChange={e => handleData(e, "email")} />
                </FormControl>
            </Stack>
        </Box>
    )
}

export default EditUserProfile