import { Box, Button, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
// import { DislikeIconElement, LikeIconElement, LoveIconElement, ShareIconElement } from '../MuiElements';
import { AppContexts } from '../App'
import { CardHeaderElement, DislikeIconElement, LikeIconElement, LoveIconElement, ShareIconElement } from './MuiElements'
import SharePostModal from './SharePostModal'
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

let UserEngagementWithPost = ({ postData, appCtx }) => {
  let [counts, setCounts] = useState({})
  let [onlyUserCounts, setOnlyUserCounts] = useState({})
  let [time, setTime] = useState(null);
  let [session, setSession] = useState(null);
  let [dataReady, setDataReady] = useState(false)

  let handleCounts = (elem, addFlag) => {
    setCounts(prev => ({ ...prev, [elem]: (prev[elem] >= 0 && addFlag) ? prev[elem] + 1 : prev[elem] - 1 < 0 ? 0 : prev[elem] - 1 }))

    setOnlyUserCounts(prev => ({...prev, [elem]: prev[elem] ? 0 : 1}))

    // clearing out previously existing session element
    session && setSession(null)
    // setting a new timer with 2000ms, so that timer can take effect after that time
    setTime(2000);
  }

  let timer = () => {
    console.log("begin timer")
    let sesn = setTimeout(() => {
      // this gets to run only when user is not interacting
      // console.log("running!!", time)
      if (time >= 2000) {
        setDataReady(true);
        clearTimeout(sesn);
        setTime(0);
      }

    }, [time])

    // session with a timer is now in place, if not changed due to any user interaction through actionables
    // session setTimeout function will kick in and do a server call to update data in database
    setSession(sesn)
    console.log("begin session")
  }

  useEffect(() => {
    time && timer();
  }, [time])

  let updateThisPostCountsInDatabase = () => {
    let url = `${appCtx.baseUrl}/posts/${postData._id}/${appCtx.user._id}`
    
    console.log(onlyUserCounts, counts.engaggedUser)
    counts.currentUserCounts = onlyUserCounts;
    // console.log(url, "url!!", counts, onlyUserCounts)

    updateDataInDatabase(url, counts)
  }

  useEffect(() => {
    dataReady && updateThisPostCountsInDatabase()
    dataReady && setDataReady(false);
  }, [dataReady])

  useEffect(() => {
    // also checking if current user exists in this post "engagedUsers" list or not
    // let findIdx = postData?.usersEngagged?.findIndex(item => Object.keys(item)[0] === appCtx.user._id.toString())

    // making initial counts setup if any
    setCounts({
      Like: (postData?.likesCount || 0),
      Love: postData?.loveCount || 0,
      Dislike: postData?.dislikesCount || 0,
      Share: postData?.shareCount || 0,
      // engaggedUser: Object.values(postData?.usersEngagged[findIdx])[0] || []
    })

    // initializing user specific counts
    setOnlyUserCounts({Like: 0, Love: 0, Dislike: 0, Share: 0})
  }, [])

  useEffect(() => {
    if (postData) {
      let findIdx = postData?.usersEngagged?.findIndex(item => Object.keys(item)[0] === appCtx.user._id.toString())

      console.log(findIdx, "findIdx!!")

      setCounts(prev => ({...prev, engaggedUser: Object.values(postData?.usersEngagged[findIdx])[0]}))
      setOnlyUserCounts(Object.values(postData?.usersEngagged[findIdx])[0])
    }
  }, [postData])

  // console.log(session, "session!!", dataReady, counts, time)
  // console.log(counts, "counts!!")

  return (
    <Stack
      className="post-actions-icons"
      sx={{ flexDirection: "row", justifyContent: "center", backgroundColor: "lightblue", gap: 2 }}
    >
      { counts?.engaggedUser && actions.map(item => (
        <RenderActionableIcon item={item} counts={counts} handleCounts={handleCounts} />
      ))}
      {/* {actions.map(item => (
        <RenderActionableIcon item={item} counts={counts} handleCounts={handleCounts} />
      ))} */}
    </Stack>
  )
}

let RenderActionableIcon = ({ item, handleCounts, counts }) => {
  let [flag, setFlag] = useState(false);
  let [showModal, setShowModal] = useState(false);

  let handleClick = () => {
    setFlag(!flag);
    handleCounts(item.name, !flag);
    if(item.name === "Share") setShowModal(!showModal);
  }

  // if user already had interacted with this post then turning flag on for indication for those
  useEffect(() => {
    console.log(counts?.engaggedUser, "counts?.engaggedUser", counts)
    if (counts?.engaggedUser && counts?.engaggedUser[item.name]) {
      setFlag(true)
      console.log("flag", flag)
    }
  }, [])

  return (
    <Tooltip title={(flag) ? `${item.name}ed already` : item.name}>
      <IconButton onClick={handleClick} sx={{ backgroundColor: flag ? "beige" : "lightgrey", position: "relative" }}>
        <Button startIcon={item.icon}>
          <Typography variant={"subtitle2"}>{counts[item.name] ? counts[item.name] : null}</Typography>
        </Button>
        {showModal ? <SharePostModal showModal={showModal} setShowModal={setShowModal} /> : null}
      </IconButton>
    </Tooltip>
  )
}

let actions = [
  { name: "Like", count: 0, icon: <LikeIconElement /> },
  { name: "Dislike", count: 0, icon: <DislikeIconElement /> },
  { name: "Love", count: 0, icon: <LoveIconElement /> },
  { name: "Share", count: 0, icon: <ShareIconElement /> },
]

export default ShowUserCreatedPost