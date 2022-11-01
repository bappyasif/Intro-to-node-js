import { Box, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../App';
import { readDataFromServer } from './utils';

function ShowPostsFromTwitter() {
    let [dataset, setDataset] = useState({});
    
    let appCtx = useContext(AppContexts);

    let topic = "Sport"

    let searchTerm = "World Cup"

    let handleDataset = result => setDataset(result)
    
    let url = `${appCtx.baseUrl}/twitter/search/${topic}/${searchTerm}`
    
    useEffect(() => {
        readDataFromServer(url, handleDataset)
    }, [url])
    
    let renderPosts = () => dataset?.data?.data?.map(item => <Stack key={item.id}>{item.text}</Stack>)

    console.log(dataset, "dataset!!")
  return (
    <Box>
        <Typography>Showing Post from Twitter</Typography>
        {renderPosts()}
    </Box>
  )
}

export default ShowPostsFromTwitter