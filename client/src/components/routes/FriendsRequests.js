import { HowToRegRounded, PersonOffRounded } from '@mui/icons-material';
import { Avatar, Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../../App'
import { readDataFromServer } from '../utils';

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

    return (
        <Stack>
            <List sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                    alt='user pp'
                    src={'https://random.imagecdn.app/56/56'}
                    sx={{ width: 56, height: 56 }}
                />
                <ListItemText sx={{ ml: 2 }} primary={data.fullName} />
                <ListItem>
                    <ListItemIcon>
                        <Tooltip title='Accept'>
                            <IconButton>
                                <HowToRegRounded />
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>
                    <ListItemIcon>
                        <Tooltip title='Reject'>
                            <IconButton>
                                <PersonOffRounded />
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Stack>
    )
}

export default FriendsRequests