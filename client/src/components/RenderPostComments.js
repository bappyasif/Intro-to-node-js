import { Box, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../App'
import { readDataFromServer } from './utils'

function RenderPostComments({postId, commentsData, setCommentsData}) {
    // let [commentsData, setCommentsData] = useState([])
    
    let appCtx = useContext(AppContexts);

    let handleCommentsData = result => setCommentsData(result.data.data)
    
    let getCommentsFromServer = () => {
        let url = `${appCtx.baseUrl}/comments/post/${postId}/`
        readDataFromServer(url, handleCommentsData)
    }

    useEffect(() => {
        getCommentsFromServer()
    }, [])

    console.log(commentsData, "CommentsData!!", postId)

    let renderComments = () => commentsData?.map(commentData => <RenderComment key={commentData._id} commentData={commentData} />)
  
    return (
    <Stack>
        <Typography>Post Comments</Typography>
        {commentsData ? renderComments(): null}
    </Stack>
  )
}

const RenderComment = ({commentData}) => {
    let {body} = {...commentData}
    return (
        <Box>
            <Typography>{body}</Typography>
        </Box>
    )
}

export default RenderPostComments