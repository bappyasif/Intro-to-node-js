import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AppContexts } from '../App'
import { CardHeaderElement } from './MuiElements'
import ShowUserPostMedias from './ShowUserPostMedias'

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
    >
      <CardHeaderElement
        avatarUrl={appCtx.user?.ppUrl || "https://random.imagecdn.app/500/150"}
        altText={"fullname"}
        title={appCtx.user?.fullName || "User Name"}
        joined={appCtx.user?.created || Date.now()}
      />

      <Typography variant='h4' dangerouslySetInnerHTML={{__html: body}}></Typography>
      <ShowUserPostMedias mediaContents={preparingAdditionalsForRendering} />
    </Box>
  )
}

export default ShowUserCreatedPost