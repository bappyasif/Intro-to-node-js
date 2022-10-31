import { Box, FormControl, Input, InputLabel, Stack, TextareaAutosize, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { CoverPhoto, fakeDataModel, ProfilePhoto } from '../UserProfile'

function EditUserProfile() {
    let [userData, setUserData] = useState({})

    let handleData = (evt, elem) => setUserData(prev => ({ ...prev, [elem]: evt.target.value }))

    useEffect(() => setUserData(fakeDataModel[0]), [])

    return (
        <Box>
            <Typography variant='h1'>Edit User Profile</Typography>
            <CoverPhoto />
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

export default EditUserProfile