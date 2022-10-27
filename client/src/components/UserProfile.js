import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

function UserProfile() {
  return (
    <Box>
        <CoverAndProfilePhoto />
        <SomeUserSpecificInfo />
        <UserFriendsAndInfo />
        <UserNameAndInfo />
    </Box>
  )
}

let CoverAndProfilePhoto = () => {
    return (
        <Stack>
            <Typography variant="h6">{fakeDataModel[0].profilePhotoUrl}</Typography>
            <Typography variant="h6">{fakeDataModel[0].coverPhotoUrl}</Typography>
        </Stack>
    )
}

let SomeUserSpecificInfo = () => {
    return (
        <Stack>
            <Typography variant="h6">{fakeDataModel[0].bio}</Typography>
            <Typography variant="h6">{fakeDataModel[0].created}</Typography>
            <Typography variant="h6">{fakeDataModel[0].weblink}</Typography>
        </Stack>
    )
}

let UserFriendsAndInfo = () => {
    return (
        <Stack>
            <Typography variant="h6">{fakeDataModel[0].friends}</Typography>
            <Typography variant="h6">{fakeDataModel[0].frRcvd}</Typography>
            <Typography variant="h6">{fakeDataModel[0].frSent}</Typography>
        </Stack>
    )
}

let UserNameAndInfo = () => {
    return (
        <Stack>
            <Typography variant='h6' component={"h3"}>{fakeDataModel[0].FullName}</Typography>
            <Typography>{fakeDataModel[0].email}</Typography>
        </Stack>
    )
}

let fakeDataModel = [
    {
        FullName: "FULL NAME",
        email: "email@ail.vod",
        friends: 4,
        frSent: 4,
        frRcvd: 4,
        coverPhotoUrl: "",
        profilePhotoUrl: "",
        bio: "loremipsum",
        weblink: "address",
        created: "date",
    }
]

export default UserProfile