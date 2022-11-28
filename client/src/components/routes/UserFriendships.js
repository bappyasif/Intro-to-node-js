import { HowToRegRounded, PersonOffRounded } from '@mui/icons-material';
import { Avatar, Box, Container, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContexts } from '../../App'
import { readDataFromServer, updateUserInDatabase } from '../utils';

let UserFriendships = () => {
    return (
        <Container>
            <Typography>User Friendships</Typography>
            <Stack sx={{flexDirection: "row"}}>
                <ExistingFriendList />
                <FriendsRequests />
            </Stack>
        </Container>
    )
}

let ExistingFriendList = () => {
    let [friends, setFriends] = useState([])

    let appCtx = useContext(AppContexts);

    let handleAllFriendsData = (value) => setFriends(prev => [...prev, value])

    let renderFriends = () => appCtx.user.friends.map(frnd => <RenderFriend key={frnd} friendID={frnd} handleAllFriendsData={handleAllFriendsData} baseUrl={appCtx.baseUrl} />)

    return (
        <Container>
            <Typography variant="h4">Friend Listings:</Typography>
            {renderFriends()}
        </Container>
    )
}

let RenderFriend = ({ friendID, handleAllFriendsData, baseUrl }) => {
    let [data, setData] = useState();

    let dataHandler = dataset => {
        setData(dataset.data.data)
        dataset.data.data && handleAllFriendsData(dataset.data.data)
    }

    let getFriendData = () => {
        let url = `${baseUrl}/users/${friendID}`
        readDataFromServer(url, dataHandler)
    }

    useEffect(() => {
        friendID && getFriendData()
    }, [])

    return (
        data?.fullName
            ?
            <>
                <Typography>{data.fullName}</Typography>
            </>
            : null
    )
}

function FriendsRequests() {
    let appCtx = useContext(AppContexts);

    let renderFriendRequests = () => appCtx?.user?.frRecieved?.map(friendId => <ShowFriendRequest key={friendId} friendId={friendId} baseUrl={appCtx.baseUrl} />)

    return (
        <Paper>
            <Typography variant={'h4'}>Friend Requests</Typography>
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

    let renderListAssets = () => listAssets.map(elem => <RenderListIconElement key={elem.tooltip} elem={elem} friendId={friendId} />)

    return (
        <Stack>
            <List sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    alt='user pp'
                    src={'https://random.imagecdn.app/76/56'}
                    sx={{ width: 76, height: 56 }}
                />

                <Typography sx={{ ml: 2, mr: 2 }} variant="h4">{data.fullName}</Typography>

                <ListItem>
                    {renderListAssets()}
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

        if (elem.tooltip === "Accept") {
            let data = { accept: friendId }
            updateUserInDatabase(`${url}/accept`, data, appCtx.acceptOrRejectFriendRequestUpdater, navigate)

        } else if (elem.tooltip === "Reject") {
            let data = { reject: friendId }
            updateUserInDatabase(`${url}/reject`, data, appCtx.acceptOrRejectFriendRequestUpdater, navigate)
        }
    }

    return (
        <ListItemIcon>
            <Tooltip title={elem.tooltip} sx={{ p: 0 }} >
                <IconButton
                    onClick={handleClick}
                    sx={{ backgroundColor: 'primary.dark' }}
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

export default UserFriendships