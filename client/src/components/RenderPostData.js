import { Typography } from '@mui/material'
import moment from 'moment'
import React, { useContext } from 'react'
import { AppContexts } from '../App'
import { CardHeaderElement } from './MuiElements'
import ShowUserPostMedias from './ShowUserPostMedias'

function RenderPostDataEssentials({ postData, shareMode }) {
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
        <>
            <CardHeaderElement
                avatarUrl={appCtx.user?.ppUrl || "https://random.imagecdn.app/500/150"}
                altText={"fullname"}
                title={appCtx.user?.fullName || "User Name"}
                joined={appCtx.user?.created || Date.now()}
                forPost={true}
            />

            {shareMode ? null : <Typography sx={{ color: "text.secondary", position: "absolute", top: 29, right: 20 }} variant="subtitle2">{`Live Since: ${moment(created).fromNow()}`}</Typography>}

            <Typography variant='h4' sx={{ backgroundColor: "honeydew", p: .2, mr: 6, ml: 15 }} dangerouslySetInnerHTML={{ __html: body }}></Typography>

            {preparingAdditionalsForRendering.Id ? <ShowUserPostMedias mediaContents={preparingAdditionalsForRendering} /> : null}
        </>
    )
}

export default RenderPostDataEssentials