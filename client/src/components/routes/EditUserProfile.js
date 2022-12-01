import { NotInterestedTwoTone, SaveAltTwoTone, WallpaperRounded } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, ImageListItem, ImageListItemBar, Input, InputLabel, Paper, Stack, TextareaAutosize, Typography } from '@mui/material'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../../App'
import { fakeDataModel } from '../UserProfileInfoSection'

function EditUserProfile() {
    let [userData, setUserData] = useState({})

    let appCtx = useContext(AppContexts);

    let handleData = (evt, elem) => setUserData(prev => ({ ...prev, [elem]: evt.target.value }))

    useEffect(() => setUserData(appCtx.user || fakeDataModel[0]), [])

    // console.log(userData, "!!")

    return (
        <Box>
            <Typography variant='h1'>Edit User Profile</Typography>
            {/* <CoverPhoto /> */}
            {userData.created ? <RenderPhoto cpUrl={userData.cpUrl} fullName={userData.fullName} /> : null}
            {userData.created ? <RenderFormWithData handleData={handleData} data={userData} /> : null}
            {userData.created ? <RenderFormActionButtons userData={userData} /> : null }
        </Box>
    )
}

let RenderFormActionButtons = ({userData}) => {
    let buttons = [{name: "Save", icon: <SaveAltTwoTone />}, {name: "Cancel", icon: <NotInterestedTwoTone />}]
    
    let renderButtons = () => buttons.map(item => <RenderActionButton key={item.name} item={item} userData={userData} />)
    
    return (
        <Stack sx={{flexDirection: "row", gap: 4, justifyContent: "center"}}>
            {renderButtons()}
        </Stack>
    )
}

let RenderActionButton = ({item, userData}) => {
    let handleClick = () => {
        if(item.name === "Save") {
            console.log(userData, "save!!")
        } else {
           alert("goto profile!!") 
        }
    }
    return (
        <Button onClick={handleClick} size='large' startIcon={item.icon} variant="outlined" sx={{verticalAlign: "middle"}}>
            <Typography variant='h6' fontWeight={"bold"}>{item.name}</Typography>
        </Button>
    )
}

let RenderFormWithData = ({ handleData, data }) => {
    let renderData = []

    for (let key in data) {

        if(key !== "__v" && key !== "_id" && key !== "salt" && key !== "hash" && key !== "albums") {
            let elem = key;
            let initialValue = data[key]

            if (elem === "frSent" || elem === "frRecieved" || elem === "friends") {
                initialValue = data[key].length;

            } else if (elem === "created") {
                initialValue = moment(data[key]).format("DD-MM-YYYY")
            }
            
            renderData.push(<RenderFormControlItem key={key} handleData={handleData} dataVal={initialValue} elem={key} />)
        }
    }

    return (
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 11}}>
            <Stack>
                {/* <ProfilePhoto /> */}
                <RenderPhoto ppUrl={data.ppUrl} fullName={data.fullName} />
            </Stack>
            <Stack sx={{width: "45%"}}>
                {renderData}
            </Stack>
        </Box>
    )
}

let RenderFormControlItem = ({ handleData, dataVal, elem }) => {

    let check = ["frSent", "frRcvd", "frRecieved", "friends", "created", "email", ].includes(elem)

    // if (elem === "frSent" || elem === "frRecieved" || elem === "friends") {
    //     dataVal = dataVal.length;

    // } else if (elem === "created") {
    //     dataVal = moment(dataVal).format("DD-MM-YYYY")
    // }

    let formatElemLabel = () => {
        let label = ""

        if (elem === "frSent") {
            label = "Friend Request Sent"
        } else if (elem === "frRecieved") {
            label = "Friend Request Recieved"
        } else {
            label = elem
        }

        return label;
    }

    return (
        <FormControl sx={{ m: 2 }} disabled={check} value>
            {/* {elem !== "bio" ? <InputLabel htmlFor={elem}>{elem}</InputLabel> : null} */}
            {elem !== "bio" ? <InputLabel sx={{textTransform: "capitalize", fontSize: 26, fontWeight: "bold"}} htmlFor={elem}>{formatElemLabel()}</InputLabel> : null}
            {
                elem === "bio"
                    ?
                    <TextareaAutosize style={{ backgroundColor: "transparent", border: "none", borderBottom: "solid .1px silver" }} minRows={2} maxRows={4} cols={40} defaultValue={dataVal} onChange={e => handleData(e, elem)} />
                    :
                    <Input sx={{fontSize: 29, pl: 2}} type={elem === "email" ? "email" : "text"} defaultValue={dataVal} onChange={e => handleData(e, elem)} />
            }
        </FormControl>
    )
}

export let CoverPhoto = ({ userData }) => {
    let { cpUrl } = { ...userData }
    return (
        <Box sx={{ width: "100%" }}>
            <ImageListItem>
                <img
                    src={cpUrl ? cpUrl : `${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format`}
                    srcSet={cpUrl ? cpUrl : `${fakeDataModel[0].coverPhotoUrl}?w500&h299&fit=crop&auto=format&dpr= 2 2x`}
                    alt="user X profile cover"
                    loading='lazy'
                />
                <ImageListItemBar
                    sx={{justifyContent: "center"}}
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

export let RenderPhoto = ({ ppUrl, cpUrl, fullName }) => {
    let decideImgResourceUrl = () => {
        let src = "";

        if (ppUrl && !cpUrl) {
            src = `${ppUrl}?w85&h95&fit=crop&auto=format`
        } else if (cpUrl) {
            src = `${cpUrl}?w85&h95&fit=crop&auto=format`
        }

        return src;
    }

    return (
        <ImageListItem sx={{width: ppUrl && "560px"}}>
                <img
                    // style={{height: ppUrl && "100vh"}}
                    // src={`${ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format`}
                    // srcSet={`${ppUrl ? ppUrl : fakeDataModel[0].coverPhotoUrl}?w85&h95&fit=crop&auto=format&dpr= 2 2x`}
                    src={decideImgResourceUrl()}
                    srcSet={`${decideImgResourceUrl()}&dpr= 2 2x`}
                    alt={`user ${fullName ? fullName : "X"} profile display`}
                    loading='lazy'
                    // height={ppUrl && "100vh"}
                />
                <ImageListItemBar
                    sx={{
                        justifyContent: "center",
                    }}

                    title={<Typography variant="h6">{ppUrl ? "Profile" : "Cover"} Photo</Typography>}

                    // onClick={toggleShowModal}

                    // actionIcon={
                    //     <IconButton
                    //     >
                    //         <WallpaperRounded
                    //             sx={{ color: "floralwhite" }}
                    //         />
                    //     </IconButton>
                    // }
                />
            </ImageListItem>
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

export default EditUserProfile