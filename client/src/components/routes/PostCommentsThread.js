import { Box, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AppContexts } from '../../App'
import { RenderComment } from '../RenderPostComments'
import RenderPostDataEssentials from '../RenderPostData'
import { ShowIncludedSharedPost, UserEngagementWithPost } from '../UserCreatedPost'
import { readDataFromServer } from '../utils'

function PostCommentsThread() {
    let [data, setData] = useState({})

    let params = useParams();

    let appCtx = useContext(AppContexts);

    let handlePostData = result => setData(prev => ({ ...prev, postData: result.data.data }))

    let handleCommentsData = result => setData(prev => ({ ...prev, commentsData: result.data.data }))

    let updateCommentsData = (data) => {
        setData(prev => ({...prev, commentsData: [...prev.commentsData, data]}))
    }

    let getPostData = () => {
        let url = `${appCtx.baseUrl}/posts/solo/${params.postId}`
        readDataFromServer(url, handlePostData)
    }

    let getCommentsFromServer = () => {
        let url = `${appCtx.baseUrl}/comments/post/${params.postId}/`
        readDataFromServer(url, handleCommentsData)
    }

    useEffect(() => {
        getCommentsFromServer()
        getPostData()
    }, [])

    console.log(data, "!!data!!")

    return (
        data.postData
        ?
        <Box
            width={990}
            margin="auto"
            border={"dotted .4px blue"}
            marginBottom={1.5}
            marginTop={1.3}
            borderRadius={1.1}
            position={"relative"}
        >
            <RenderPostDataEssentials postData={data.postData} />
            {data?.postData?.includedSharedPostId ? <ShowIncludedSharedPost appCtx={appCtx} includedPostId={data.postData.includedSharedPostId} /> : null}
            <UserEngagementWithPost postData={data.postData} appCtx={appCtx} setShowCreatePost={() => null} handleCommentsDataUpdate={updateCommentsData} />
            <RenderThisPostComments commentsData={data.commentsData} />
        </Box>
        : null
    )
}

let RenderThisPostComments = ({commentsData}) => {
    let renderComments = () => commentsData.sort((a, b) => a.created < b.created ? 1 : -1)?.map((commentData, idx) => <RenderComment key={commentData._id} commentData={commentData} />)

    return (
        <Stack sx={{ alignItems: "center", gap: .6 }}>
            <Typography variant="h6">Post Comments</Typography>
            {commentsData ? renderComments() : null}
        </Stack>
    )
}

export default PostCommentsThread