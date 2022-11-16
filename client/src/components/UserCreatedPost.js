import { Box } from '@mui/material'
import React from 'react'

function ShowUserCreatedPost({postData}) {
    let {body, created, gif, poll, privacy, imageUrl, videoUrl, _id} = {...postData}

  return (
    <Box>
        {body}
    </Box>
  )
}

export default ShowUserCreatedPost