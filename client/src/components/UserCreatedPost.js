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
      // id={_id}
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

      <UserEngagementWithPost postData={postData} appCtx={appCtx} />
    </Box>
  )
}

let UserEngagementWithPost = ({postData, appCtx}) => {
  let [counts, setCounts] = useState({})
  let [time, setTime] = useState(null);
  let [session, setSession] = useState(null);
  let [dataReady, setDataReady] = useState(false)
  
  let handleCounts = (elem, addFlag) => {
    // setCounts(prev => ({...prev, [elem]: prev[elem] ? prev[elem] + 1 : 1}))
    // setCounts(prev => ({...prev, [elem]: (prev[elem] && addFlag) ? prev[elem] + 1 : prev[elem] - 1}))
    setCounts(prev => ({...prev, [elem]: (prev[elem] >= 0 && addFlag) ? prev[elem] + 1 : prev[elem] - 1}))
    
    // clearing out previously existing timeout element
    clearTimeout(session);
    // clearing out previously existing session element
    setSession(null)
    // setting a new timer with 2000ms, so that timer can take effect after that time
    setTime(2000);
    // calling up timer to kick start timer function
    timer();
  }
  
  let timer = () => {
    console.log("begin timer")
    let sesn = setTimeout(() => {
      // this gets to run only when user is not interacting
      if(time === 2000) {
        setDataReady(true);
        clearTimeout(sesn);
      }

    }, [time])
    
    // session with a timer is now in place, if not changed due to any user interaction through actionables
    // session setTimeout function will kick in and do a server call to update data in database
    setSession(sesn)
    console.log("begin session")
  }

  let updateThisPostCountsInDatabase = () => {
    // let url = `${appCtx.baseUrl}/posts/${postData._id}`
    let url = `${appCtx.baseUrl}/posts/${postData._id}/${appCtx.user._id}`
    console.log(url, "url!!", counts)

    updateDataInDatabase(url, counts)
  }

  useEffect(() => {
    dataReady && updateThisPostCountsInDatabase()
    dataReady && setDataReady(false);
  }, [dataReady])

  useEffect(() => {
    // making initial counts setup if any
    setCounts({
      Like: (postData?.likesCount || 0),
      Love: postData?.loveCount || 0,
      Dislike: postData?.dislikesCount || 0,
      Share: postData?.shareCount || 0,
    })
  }, [])

  return (
    <Stack
      className="post-actions-icons"
      sx={{ flexDirection: "row", justifyContent: "center", backgroundColor: "lightblue", gap: 2 }}
    >
      {actions.map(item => (
        <RenderActionableIcon item={item} counts={counts} handleCounts={handleCounts} />
      ))}
    </Stack>
  )
}

let RenderActionableIcon = ({item, handleCounts, counts}) => {
  let [flag, setFlag] = useState(false);

  let handleClick = () => {
    setFlag(!flag);
  }

  useEffect(() => {
    // toggling through +1 or -1 value for specefic count, based on flag current value for that item
    handleCounts(item.name, flag);
  }, [flag])

  return (
    <Tooltip title={flag ? `${item.name}ed already` : item.name}>
      <IconButton onClick={handleClick} sx={{backgroundColor: flag ? "beige" :"lightgrey"}}>
        <Button startIcon={item.icon}>
          <Typography variant={"subtitle2"}>{counts[item.name] ? counts[item.name] : null}</Typography>
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