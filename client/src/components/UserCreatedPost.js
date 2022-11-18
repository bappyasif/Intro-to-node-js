import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
// import { DislikeIconElement, LikeIconElement, LoveIconElement, ShareIconElement } from '../MuiElements';
import { AppContexts } from '../App'
import { CardHeaderElement, DislikeIconElement, LikeIconElement, LoveIconElement, ShareIconElement } from './MuiElements'
import ShowUserPostMedias from './ShowUserPostMedias'
import { updateDataInDatabase } from './utils'

function ShowUserCreatedPost({ postData }) {
  let { body, created, gif, poll, privacy, imageUrl, videoUrl, _id } = { ...postData }

  const appCtx = useContext(AppContexts)

  let preparingAdditionalsForRendering = {
    Id: _id,
    Image: imageUrl,
    Video: videoUrl,
    Gif: gif[0],
    Poll: poll[0],
    Privacy: privacy
  }

  return (
    <Box
      width={990}
      margin="auto"
      border={"dotted .4px blue"}
      marginBottom={1.5}
      marginTop={1.3}
      borderRadius={1.1}
      position={"relative"}
    >
      <CardHeaderElement
        avatarUrl={appCtx.user?.ppUrl || "https://random.imagecdn.app/500/150"}
        altText={"fullname"}
        title={appCtx.user?.fullName || "User Name"}
        joined={appCtx.user?.created || Date.now()}
        forPost={true}
      />

      <Typography sx={{ color: "text.secondary", position: "absolute", top: 29, right: 20 }} variant="subtitle2">{`Live Since: ${moment(created).fromNow()}`}</Typography>

      <Typography variant='h4' sx={{ backgroundColor: "honeydew", p: .2, mr: 6, ml: 15 }} dangerouslySetInnerHTML={{ __html: body }}></Typography>

      <ShowUserPostMedias mediaContents={preparingAdditionalsForRendering} />

      <UserEngagementWithPost postId={_id} appCtx={appCtx} />
    </Box>
  )
}

let UserEngagementWithPost = ({postId, appCtx}) => {
  let [counts, setCounts] = useState({})
  let [time, setTime] = useState(null);
  let [session, setSession] = useState(null);
  let [dataReady, setDataReady] = useState(false)
  
  let handleCounts = (elem) => {
    setCounts(prev => ({...prev, [elem]: prev[elem] ? prev[elem] + 1 : 1}))
    // time ? setTime(0) : setTime(2000);
    // if(time) {
    //   console.log("reset time")
    //   // setTime(0);
    //   clearTimeout(session)
    //   setSession(null)
    //   setTime(time + 2000);
    // } else {
    //   console.log("time")
    //   setTime(2000)
    // }
    // setTime(2000)
    clearTimeout(session);
    setSession(null)
    setTime(2000);
    timer();
  }
  
  let timer = () => {
    console.log("begin timer")
    let sesn = setTimeout(() => {
      // this gets to run only when user is not interacting
      console.log("ended timer", time, counts)
      // setTime(0);

      // setData(counts);

      // updateThisPostCountsInDatabase()

      if(time === 2000) {
        setDataReady(true);
        clearTimeout(sesn);
      }

      // if(time === 2000) clearTimeout(sesn);

    }, [time])
    
    setSession(sesn)
    console.log("begin session")
  }

  let updateThisPostCountsInDatabase = () => {
    let url = `${appCtx.baseUrl}/posts/${postId}`
    console.log(url, "url!!", counts)
    // console.log(url, "url!!", counts, data)
    updateDataInDatabase(url, counts)
  }

  useEffect(() => {
    dataReady && updateThisPostCountsInDatabase()
    dataReady && setDataReady(false);
  }, [dataReady])

  // useEffect(() => {
  //   time && timer()
  //   time === 0 && updateThisPostCountsInDatabase();
  // }, [time])

  // useEffect(() => setCounts({postId: postId}), [])

  // useEffect(() => {
  //   time && timer()
  //   // time === 0 && setSession(null)
  //   time === 0 && clearTimeout(session)
  //   // time && clearTimeout(session)
  // }, [time, session])

  // console.log(counts, "counts!!", postId)

  return (
    <Stack
      className="post-actions-icons"
      sx={{ flexDirection: "row", justifyContent: "center", backgroundColor: "lightblue" }}
    >
      {actions.map(item => (
        <RenderActionableIcon item={item} handleCounts={handleCounts} />
      ))}
    </Stack>
  )
}

let RenderActionableIcon = ({item, handleCounts}) => {
  let [count, setCount] = useState(0);

  let handleClick = () => {
    handleCounts(item.name)
    setCount(prev => prev + 1)
  }

  return (
    <Tooltip title={item.name}>
      <IconButton onClick={handleClick}>
        <Button className="icon-button">
          {item.icon}
          <Typography variant={"span"}>{count ? count : null}</Typography>
        </Button>
      </IconButton>
    </Tooltip>
  )
}

let actions = [
  { name: "Like", count: 0, icon: <LikeIconElement /> },
  { name: "Dislike", count: 0, icon: <DislikeIconElement />  },
  { name: "Love", count: 0, icon: <LoveIconElement />  },
  { name: "Share", count: 0, icon: <ShareIconElement />  },
]

export default ShowUserCreatedPost