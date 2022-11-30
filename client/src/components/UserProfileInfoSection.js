import { WallpaperRounded } from '@mui/icons-material'
import { Box, Button, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Stack, TextField, Typography } from '@mui/material'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import {AppContexts} from "../App"
import { updateDataInDatabase } from './utils'

function UserProfileInfoSection({ appCtx }) {
    return (
        <Box sx={{ mb: 2 }}>
            <CoverPhoto userData={appCtx.user} />
            <Box
                sx={{ width: "920px", margin: "auto", bgcolor: "gainsboro", pl: 2, pt: .4, pr: 2, pb: .1, borderRadius: 2 }}
            >
                <UserNameAndInfo userData={appCtx.user} />
                <SomeUserSpecificInfo userData={appCtx.user} />
                <UserFriendsAndInfo userData={appCtx.user} />
            </Box>
        </Box>
    )
}

export let CoverPhoto = ({ userData }) => {
    let [showModal, setShowModal] = useState(false);

    let toggleShowModal = () => setShowModal(!showModal);

    let closeShowModal = () => setShowModal(false);

    let { cpUrl } = { ...userData }

    return (
        <Box sx={{ width: "100%", justifyContent: "center" }}>
            <ImageListItem>
                <img
                    src={cpUrl ? cpUrl : `${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format`}
                    srcSet={cpUrl ? cpUrl : `${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format&dpr= 2 2x`}
                    alt={`user ${userData.fullName || "X"} profile cover`}
                    loading='lazy'
                    height={"341px"}
                />
                <ImageListItemBar
                    onClick={toggleShowModal}
                    sx={{
                        // backgroundColor: 'black !important', 
                        opacity: .6,
                        // flexGrow: "0 !important", 
                        justifyContent: "center",
                        position: "relative"
                    }}
                    // subtitle={"Cover Photo"}
                    title={<Typography variant="h6">Cover Photo</Typography>}
                    actionIcon={
                        <IconButton
                        // sx={{ color: 'rgba(255, 255, 255, 0.54)', margin: "auto", flexGrow: 1 }}
                        >
                            <WallpaperRounded
                            sx={{ backgroundColor: 'rgba(0, 101, 99, 0.54)' }}
                            />
                        </IconButton>
                    }
                />
            </ImageListItem>

            {showModal ? <ShowUrlGrabbingModal closeModal={closeShowModal} /> : null}
        </Box>
    )
}

let ShowUrlGrabbingModal = ({ closeModal, fromPP }) => {
    let [urlText, setUrlText] = useState(null);

    let appCtx = useContext(AppContexts);

    let url = `${appCtx.baseUrl}/users/${appCtx.user._id}/profile`

    let afterUpdateIsSuccessfull = () => {
        appCtx.updateUserProfileDataInApp(fromPP ? "ppUrl" : "cpUrl", urlText);
        closeModal()
    }

    let handlPhotoUrlUpload = () => {
        let data = {[fromPP ? "ppUrl" : "cpUrl"] : urlText}
        console.log(data, "data!!", url)
        updateDataInDatabase(url, data, afterUpdateIsSuccessfull)
        // updateDataInDatabase(url, data, closeModal)
        // closeModal();
    }
    let handleClick = () => {
        console.log("Clicked!!")
        // closeModal();
        if(urlText) {
            handlPhotoUrlUpload();
        } else {
            alert("Enter A Valid Url!!")
        }
    }

    let handleUrlInput = (evt) => setUrlText(evt.target.value)

    return (
        <Paper
            sx={{
                position: "absolute",
                p: 2,
                pl: .4,
                pr: .4,
                backgroundColor: "honeydew",
                borderRadius: 2,
                left: fromPP ? "29%" : "38.7%",
                bottom: fromPP ? "12.1%" : "0%"
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <TextField onChange={handleUrlInput} fullWidth={true} id='outline-basic' label={`Enter Your New ${fromPP ? "Profile Photo" : "Cover Image"} Url`} variant={"outlined"} color="secondary" />
                <Stack
                    sx={{
                        flexDirection: "row",
                        gap: 2,
                        mt: 1.3
                    }}
                >
                    <Button onClick={handleClick} size="large" variant="contained" color="success">Update Photo</Button>
                    <Button onClick={closeModal} size="large" variant="contained" color="secondary">Keep Existing</Button>
                </Stack>
            </Container>
        </Paper>
    )
}

let SomeUserSpecificInfo = ({ userData }) => {
    let { bio, created, webLink } = { ...userData }

    let innerStackStyles = { flexDirection: "row", gap: "35px", alignItems: "baseline" }
    return (
        <Stack sx={{ textAlign: "justify", mt: 2 }}>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Bio: </Typography>
                <Typography variant="h6" component={"p"}>{bio ? bio : fakeDataModel[0].bio}</Typography>
            </Stack>
            <Stack sx={{ flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                <Stack sx={innerStackStyles}>
                    <Typography variant="h6">Joined: </Typography>
                    <Typography variant="h6" component={"p"}>{moment(created ? created : fakeDataModel[0].created).format("MM-DD-YYYY")}</Typography>
                </Stack>
                <Stack sx={innerStackStyles}>
                    <Typography variant="h6">Website: </Typography>
                    <Typography variant="h6" component={"p"}>{webLink ? webLink : fakeDataModel[0].weblink}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

let UserFriendsAndInfo = ({ userData }) => {
    let { friends, frSent, frRecieved } = { ...userData }

    let innerStackStyles = { flexDirection: "row", gap: "35px", alignItems: "baseline" }

    return (
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", mt: 2, mb: 2 }}>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friends count: </Typography>
                <Typography variant="h6" component={"p"}>{friends.length ? friends.length : fakeDataModel[0].friends}</Typography>
            </Stack>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friend Requests Recieved: </Typography>
                <Typography variant="h6" component={"p"}>{frRecieved.length ? frRecieved.length : fakeDataModel[0].frRcvd}</Typography>
            </Stack>
            <Stack sx={innerStackStyles}>
                <Typography variant="h6">Friend Requests Sent: </Typography>
                <Typography variant="h6">{frSent.length ? frSent.length : fakeDataModel[0].frSent}</Typography>
            </Stack>
        </Stack>
    )
}

let UserNameAndInfo = ({ userData }) => {
    let { ppUrl, fullName, email } = { ...userData }
    return (
        <Stack
            sx={{ flexDirection: "column", gap: .6, mt: .6 }}
        >
            <ProfilePhoto ppUrl={ppUrl} fullName={fullName} />
            <Stack
                sx={{
                    flexDirection: "row",
                    gap: 6,
                    mt: .6,
                    alignItems: "baseline",
                    justifyContent: "space-evenly"
                }}
            >
                <UserName fullName={fullName} />
                <UserEmail email={email} />
                {/* <Typography variant="h6">Bio: </Typography>
                <Typography variant='h6' component={"h3"}>{fullName ? fullName : fakeDataModel[0].fullName}</Typography>
                <Typography>{email ? email : fakeDataModel[0].email}</Typography> */}
            </Stack>
        </Stack>
    )
}

let UserEmail = ({email}) => {
    return (
        <Stack
            sx={{
                flexDirection: "row",
                gap: 2,
                mt: .6,
                alignItems: "baseline",
                justifyContent: "space-between"
            }}
        >
            <Typography variant="h6">Email: </Typography>
            <Typography variant='h6'>{email ? email : fakeDataModel[0].email}</Typography>
        </Stack>
    )
}

let UserName = ({fullName}) => {
    return (
        <Stack
            sx={{
                flexDirection: "row",
                gap: 4,
                mt: .6,
                alignItems: "baseline",
                justifyContent: "space-between"
            }}
        >
            <Typography variant="h6">FullName: </Typography>
            <Typography variant='h4' component={"h4"}>{fullName ? fullName : fakeDataModel[0].fullName}</Typography>
        </Stack>
    )
}

export let ProfilePhoto = ({ ppUrl, fullName }) => {
    let [showModal, setShowModal] = useState(false);

    let toggleShowModal = () => setShowModal(!showModal);

    let closeShowModal = () => setShowModal(false);

    return (
        <Stack
            sx={{        
                flexDirection: "column",
                position: "relative",
            }}
        >
            <ImageListItem>
                <img
                    width={'85px'}
                    height={'95px'}
                    src={`${ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format`}
                    srcSet={`${ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format&dpr= 2 2x`}
                    alt={`user ${fullName ? fullName : "X"} profile display`}
                    loading='lazy'
                />
                <ImageListItemBar
                    sx={{
                        justifyContent: "center",
                    }}
                    onClick={toggleShowModal}
                    actionIcon={
                        <IconButton
                        // sx={{ color: 'rgba(255, 255, 255, 0.54)', margin: "auto", flexGrow: 1 }}
                        >
                            <WallpaperRounded
                                sx={{ backgroundColor: 'rgba(0, 101, 99, 0.54)' }}
                            />
                        </IconButton>
                    }
                />
            </ImageListItem>

            {showModal ? <ShowUrlGrabbingModal closeModal={closeShowModal} fromPP={true} /> : null}
        </Stack>
        // <img
        //     width={'85px'}
        //     height={'95px'}
        //     src={`${ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format`}
        //     srcSet={`${ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format&dpr= 2 2x`}
        //     alt={`user ${fullName ? fullName : "X"} profile display`}
        //     loading='lazy'
        // />
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