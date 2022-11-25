import { Box, Button, Stack, Typography } from '@mui/material'
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContexts } from '../App'
import { CardHeaderElement } from './MuiElements';
import { ShowPostUserEngagementsDetails } from './SharePostModal';
import { readDataFromServer, updateDataInDatabase } from './utils'

function RenderPostComments({ postId, commentsData, setCommentsData }) {
    let navigate = useNavigate()

    let appCtx = useContext(AppContexts);

    let handleCommentsData = result => setCommentsData(result.data.data)

    let getCommentsFromServer = () => {
        let url = `${appCtx.baseUrl}/comments/post/${postId}/`
        readDataFromServer(url, handleCommentsData)
    }

    useEffect(() => {
        getCommentsFromServer()
    }, [])

    // console.log(commentsData, "CommentsData!!", postId)
    
    let handleShowThread = () => {
        navigate(`posts/${postId}/comments/`)
    }

    let renderComments = () => commentsData.sort((a, b) => a.created < b.created ? 1 : -1)?.map((commentData, idx) => (idx < 4) && <RenderComment key={commentData._id} commentData={commentData} />)

    return (
        <Stack sx={{ alignItems: "center", gap: .6 }}>
            <Typography variant="h6">Post Comments</Typography>
            {commentsData ? renderComments() : null}
            <Button onClick={handleShowThread}>Show Thread</Button>
        </Stack>
    )
}

export const RenderComment = ({ commentData }) => {
    let { body, created, _id } = { ...commentData }

    let [counts, setCounts] = useState({})

    let [countsForCurrentUser, setCountsForCurrentUser] = useState({})

    let appCtx = useContext(AppContexts);

    let handleCounts = (elem, flag) => setCounts(prev => ({...prev, [elem]: (prev[elem] && !flag) ? prev[elem] + 1 : (prev[elem] && flag) ? prev[elem] - 1 : 1}))
    
    let handleCountsForCurrentUser = (elem, flag) => setCountsForCurrentUser(prev => ({ ...prev, [elem]: (prev[elem] && !flag) ? prev[elem] : (prev[elem] && flag) ? prev[elem] - 1: 1 }))

    let clickHandler = elem => {
        !countsForCurrentUser[elem] && handleCounts(elem)
        countsForCurrentUser[elem] && handleCounts(elem, "deduct")
        !countsForCurrentUser[elem] && handleCountsForCurrentUser(elem)
        countsForCurrentUser[elem] && handleCountsForCurrentUser(elem, "deduct")
    }

    let updateCommentCountsData = () => {
        let url = `${appCtx.baseUrl}/comments/${_id}`
        let data = {...counts, userCounts: {...countsForCurrentUser}, userId: appCtx.user._id}
        updateDataInDatabase(url, data)
    }

    useEffect(() => {
        let timer;
        if(counts) {
            timer = setTimeout(() => {
                updateCommentCountsData()

                if(timer >= 2000) clearTimeout(timer)

            }, [2000])
        }

        return () => clearTimeout(timer)
    }, [counts])

    // console.log(counts, "counts@!", countsForCurrentUser)

    return (
        <Box
            sx={{
                position: "relative",
                width: "650px",
                outline: "solid .29px red",
                borderRadius: .2,
                mb: .29
                // transform: "scale(.65, .51)",
                // m: 0
            }}
        >
            <CardHeaderElement
                avatarUrl={appCtx.user?.ppUrl || "https://random.imagecdn.app/500/150"}
                altText={"fullname"}
                title={appCtx.user?.fullName || "User Name"}
                joined={appCtx.user?.created || Date.now()}
                forComment={true}
            />
            <Typography sx={{ color: "text.secondary", position: "absolute", top: 29, right: 20 }} variant="subtitle2">{`Live Since: ${moment(created).fromNow()}`}</Typography>
            <Typography variant='subtitle1' sx={{ backgroundColor: "honeydew", p: .1, mr: 6, ml: 15 }} dangerouslySetInnerHTML={{ __html: body }}></Typography>
            <ShowPostUserEngagementsDetails counts={counts} forComment={true} clickHandler={clickHandler} />
        </Box>
    )
}

export default RenderPostComments