import { WallpaperRounded } from '@mui/icons-material'
import { Box, FormControl, IconButton, ImageListItem, ImageListItemBar, Input, InputLabel, Stack, TextareaAutosize, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { fakeDataModel } from '../UserProfileInfoSection'

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

export let CoverPhoto = ({userData}) => {
    let {cpUrl} = {...userData}
    return (
        <Box sx={{ width: "100%" }}>
            <ImageListItem cols={1}>
                <img
                    src={ cpUrl ? cpUrl : `${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format`}
                    srcSet={cpUrl ? cpUrl : `${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format&dpr= 2 2x`}
                    alt="user X profile cover"
                    loading='lazy'
                />
                <ImageListItemBar
                    // subtitle={"Cover Photo"}
                    title={"Cover Photo"}
                    actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        >
                            <WallpaperRounded />
                        </IconButton>
                    }
                />
            </ImageListItem>
        </Box>
    )
}

export let ProfilePhoto = ({ppUrl, fullName}) => {
    return (
        <img
            width={'85px'}
            height={'95px'}
            src={`${ ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format`}
            srcSet={`${ ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format&dpr= 2 2x`}
            alt={`user ${fullName ? fullName : "X"} profile display`}
            loading='lazy'
        />
    )
}

export default EditUserProfile