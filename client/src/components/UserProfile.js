import { WallpaperRounded } from '@mui/icons-material'
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

function UserProfile() {
    return (
        <Box sx={{mb: 2}}>
            <CoverPhoto />
            <Box
                sx={{ width: "920px", margin: "auto", bgcolor: "gainsboro", pl: 2, pt: .4, pr: 2, pb: .1, borderRadius: 2 }}
            >
                <UserNameAndInfo />
                <SomeUserSpecificInfo />
                <UserFriendsAndInfo />
            </Box>
        </Box>
    )
}

let CoverPhoto = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <ImageListItem cols={1}>
                <img
                    src={`${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format`}
                    srcSet={`${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format&dpr= 2 2x`}
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

let SomeUserSpecificInfo = () => {
    let innerStackStyles = { flexDirection: "row", gap: "35px", alignItems: "baseline" }
    return (
        <Stack sx={{ textAlign: "justify", mt: 2 }}>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Bio: </Typography>
                <Typography variant="h6" component={"p"}>{fakeDataModel[0].bio}</Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                <Stack sx={innerStackStyles}>
                    <Typography variant="h6">Joined: </Typography>
                    <Typography variant="h6" component={"p"}>{moment(fakeDataModel[0].created).format("MM-DD-YYYY")}</Typography>
                </Stack>
                <Stack sx={innerStackStyles}>
                    <Typography variant="h6">Website: </Typography>
                    <Typography variant="h6" component={"p"}>{fakeDataModel[0].weblink}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

let UserFriendsAndInfo = () => {
    let innerStackStyles = { flexDirection: "row", gap: "35px", alignItems: "baseline" }
    return (
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", mt: 2, mb: 2 }}>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friends count: </Typography>
                <Typography variant="h6" component={"p"}>{fakeDataModel[0].friends}</Typography>
            </Stack>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friend Requests Recieved: </Typography>
                <Typography variant="h6" component={"p"}>{fakeDataModel[0].frRcvd}</Typography>
            </Stack>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friend Requests Sent: </Typography>
                <Typography variant="h6">{fakeDataModel[0].frSent}</Typography>
            </Stack>
        </Stack>
    )
}

let UserNameAndInfo = () => {
    return (
        <Stack
            sx={{ flexDirection: "row", gap: "35px", mt: .6 }}
        >
            <img
                width={'85px'}
                height={'95px'}
                src={`${fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format`}
                srcSet={`${fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format&dpr= 2 2x`}
                alt="user X profile display"
                loading='lazy'
            />
            <Stack>
                <Typography variant='h6' component={"h3"}>{fakeDataModel[0].FullName}</Typography>
                <Typography>{fakeDataModel[0].email}</Typography>
            </Stack>
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
        coverPhotoUrl: "https://random.imagecdn.app/500/150",
        profilePhotoUrl: "https://random.imagecdn.app/85/95",
        bio: "loremipsum",
        weblink: "https://www.twitter.com/axby",
        created: new Date().toISOString(),
    }
]

export default UserProfile