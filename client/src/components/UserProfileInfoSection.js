import { WallpaperRounded } from '@mui/icons-material'
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

function UserProfileInfoSection({appCtx}) {
    return (
        <Box sx={{ mb: 2 }}>
            <CoverPhoto userData = {appCtx.user} />
            <Box
                sx={{ width: "920px", margin: "auto", bgcolor: "gainsboro", pl: 2, pt: .4, pr: 2, pb: .1, borderRadius: 2 }}
            >
                <UserNameAndInfo userData = {appCtx.user} />
                <SomeUserSpecificInfo userData = {appCtx.user} />
                <UserFriendsAndInfo userData = {appCtx.user} />
            </Box>
        </Box>
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

let SomeUserSpecificInfo = ({userData}) => {
    let {bio, created, webLink} = {...userData}

    let innerStackStyles = { flexDirection: "row", gap: "35px", alignItems: "baseline" }
    return (
        <Stack sx={{ textAlign: "justify", mt: 2 }}>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Bio: </Typography>
                <Typography variant="h6" component={"p"}>{ bio ? bio : fakeDataModel[0].bio}</Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                <Stack sx={innerStackStyles}>
                    <Typography variant="h6">Joined: </Typography>
                    <Typography variant="h6" component={"p"}>{moment( created ? created : fakeDataModel[0].created).format("MM-DD-YYYY")}</Typography>
                </Stack>
                <Stack sx={innerStackStyles}>
                    <Typography variant="h6">Website: </Typography>
                    <Typography variant="h6" component={"p"}>{ webLink ? webLink : fakeDataModel[0].weblink}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

let UserFriendsAndInfo = ({userData}) => {
    let {friends, frSent, frRecieved} = {...userData}

    let innerStackStyles = { flexDirection: "row", gap: "35px", alignItems: "baseline" }
    
    return (
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", mt: 2, mb: 2 }}>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friends count: </Typography>
                <Typography variant="h6" component={"p"}>{ friends.length ? friends.length : fakeDataModel[0].friends}</Typography>
            </Stack>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friend Requests Recieved: </Typography>
                <Typography variant="h6" component={"p"}>{ frRecieved.length ? frRecieved.length : fakeDataModel[0].frRcvd}</Typography>
            </Stack>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friend Requests Sent: </Typography>
                <Typography variant="h6">{ frSent.length ? frSent.length : fakeDataModel[0].frSent}</Typography>
            </Stack>
        </Stack>
    )
}

let UserNameAndInfo = ({userData}) => {
    let {ppUrl, fullName, email} = {...userData}
    return (
        <Stack
            sx={{ flexDirection: "row", gap: "35px", mt: .6 }}
        >
            <ProfilePhoto ppUrl={ppUrl} fullName={fullName} />
            <Stack>
                <Typography variant='h6' component={"h3"}>{ fullName ? fullName : fakeDataModel[0].fullName}</Typography>
                <Typography>{ email ? email : fakeDataModel[0].email}</Typography>
            </Stack>
        </Stack>
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

export let fakeDataModel = [
    {
        fullName: "FULL NAME",
        email: "email@ail.vod",
        friends: 4,
        frSent: 4,
        frRcvd: 4,
        coverPhotoUrl: "https://picsum.photos/500/150",
        profilePhotoUrl: "https://picsum.photos/85/95",
        // coverPhotoUrl: "https://random.imagecdn.app/500/150",
        // profilePhotoUrl: "https://random.imagecdn.app/85/95",
        // coverPhotoUrl: "https://source.unsplash.com/random/150x150?sig=1",
        // profilePhotoUrl: "https://source.unsplash.com/random/85x95?sig=1",
        bio: "loremipsum",
        weblink: "https://www.twitter.com/axby",
        created: new Date().toISOString(),
    }
]

export default UserProfileInfoSection