import { HowToRegRounded, PersonOffRounded } from '@mui/icons-material';
import { Avatar, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContexts } from '../../App'
import { readDataFromServer, updateUserInDatabase } from '../utils';

function FriendsRequests() {
    let appCtx = useContext(AppContexts);
    console.log(appCtx.user, "<<user>>")

    let renderFriendRequests = () => appCtx?.user?.frRecieved?.map(friendId => <ShowFriendRequest key={friendId} friendId={friendId} baseUrl={appCtx.baseUrl} />)

    return (
        <Paper>
            <Typography variant={'h1'}>Friend Requests</Typography>
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                {renderFriendRequests()}
            </Box>
        </Paper>
    )
}

let ShowFriendRequest = ({ friendId, baseUrl }) => {
    let [data, setData] = useState({})

    let url = `${baseUrl}/users/${friendId}`

    let dataHandler = dataset => setData(dataset.data.data)

    useEffect(() => {
        readDataFromServer(url, dataHandler)
    }, [url])

    console.log(data, "<<data>>")

    let renderListAssets = () => listAssets.map(elem => <RenderListIconElement key={elem.tooltip} elem={elem} friendId={friendId} />)

    return (
        <Stack>
            <List sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    alt='user pp'
                    src={'https://random.imagecdn.app/76/56'}
                    sx={{ width: 76, height: 56 }}
                />
                {/* <ListItemText sx={{ ml: 2, fontSize: 11 }} primary={data.fullName} /> */}
                <Typography sx={{ ml: 2, mr: 2 }} variant="h4">{data.fullName}</Typography>
                <ListItem>
                    {renderListAssets()}
                    {/* <ListItemIcon
                        sx={{
                            // backgroundColor: 'primary.dark',
                            // '&:hover': {
                            //     backgroundColor: 'primary.main',
                        }}
                    >
                        <Tooltip title='Accept' sx={{ p: 0 }}>
                            <IconButton sx={{ backgroundColor: 'primary.dark', }}>
                                <HowToRegRounded />
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemIcon>
                        <Tooltip title='Reject' sx={{ p: 0 }} >
                            <IconButton sx={{ backgroundColor: 'primary.dark', }}>
                                <PersonOffRounded />
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon> */}
                </ListItem>
            </List>
        </Stack>
    )
}

let RenderListIconElement = ({ elem, friendId }) => {
    let appCtx = useContext(AppContexts);
    let navigate = useNavigate()
    
    let handleClick = evt => {
        let url = `${appCtx.baseUrl}/users/${appCtx.user._id}`;
        // let data = {friendId: friendId}

        if(elem.tooltip === "Accept") {
            let data = {accept: friendId}
            updateUserInDatabase(`${url}/accept`, data, appCtx.acceptOrRejectFriendRequestUpdater, navigate)
            console.log("accept", evt.target.textContent)
        } else if(elem.tooltip === "Reject") {
            let data = {reject: friendId}
            console.log("reject")
            updateUserInDatabase(`${url}/reject`, data, appCtx.acceptOrRejectFriendRequestUpdater, navigate)
        }
    }

    return (
        <ListItemIcon>
            <Tooltip title={elem.tooltip} sx={{ p: 0 }} >
                <IconButton 
                    onClick={handleClick}
                    sx={{ backgroundColor: 'primary.dark'}}
                >
                    {elem.icon}
                </IconButton>
            </Tooltip>
        </ListItemIcon>
    )
}

let listAssets = [
    {
        tooltip: "Accept",
        icon: <HowToRegRounded />
    },
    {
        tooltip: "Reject",
        icon: <PersonOffRounded />
    }
]

export default FriendsRequests