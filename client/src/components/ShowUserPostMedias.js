import { Gif } from '@giphy/react-components';
import { Box, Divider, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from '@mui/material';
import React from 'react'
import { ShowRespectiveIcon } from './ChoosePrivacy';

function ShowUserPostMedias({ mediaContents }) {
    let generateContents = () => {
        let content = [];

        for (let key in mediaContents) {
            // console.log(mediaContents[key])

            if (key === "Image" && mediaContents[key]?.includes("http")) {
                content.push(<img src={mediaContents[key]} />)
            } else if (key === "Image" && !mediaContents[key]?.includes("http")) {
                content.push(<img src={handleMediaFileChecks(mediaContents[key])} />)
            } else if (key === "Video" && mediaContents[key]?.includes("http")) {
                content.push(<video height={200} src={mediaContents[key]} controls />)
                // content.push(<video controls><source src={mediaContents[key]} /></video>)
                // content.push(<iframe src={mediaContents[key]} controls></iframe>)
            } else if (key === "Gif") {
                content.push(<Gif gif={mediaContents[key]} height={200} />)
            } else if (key === "Poll") {
                content.push(<ShowPoll pollData={mediaContents[key]} />)
            } else if (key === "Privacy") {
                content.push(<ShowRespectiveIcon privacy={mediaContents[key]} />)
            }

        }

        return content
    }

    let renderContents = () => [...generateContents()]
    // console.log(generateContents())

    return (
        <Box>
            {renderContents()}
        </Box>
    )
}

const ShowPoll = ({ pollData }) => {
    let { question, ...options } = { ...pollData }

    let renderOptions = () => {
        let allOptions = [];
        for (let key in options) {
            let temp = { number: key, text: options[key] }
            allOptions.push(<RenderPollOption key={key} option={temp} />)
        }
        return [...allOptions];
    }

    return (
        <Paper sx={{mb: 2}}>
            <Typography variant='h4'>Poll Question: {question}</Typography>
            <Divider />
            <Stack
                sx={{flexDirection: "row", gap: 1.1}}
            >
                {renderOptions()}
            </Stack>
        </Paper>
    )
}

const RenderPollOption = ({ option }) => {
    return (
        <ListItemButton
            sx={{ m: 1, mb: 2, width: (window.innerWidth / 6) }}
        >
            <ListItemText
                primary={option.number}
                secondary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="h4"
                        color="text.primary"
                    >
                        {option.text}
                    </Typography>
                }
            />
        </ListItemButton>
    )
}

// handling media file checks
export let handleMediaFileChecks = (mediaFile) => {
    let mediaSrc = mediaFile;
    if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
        mediaSrc = URL.createObjectURL(mediaFile)
    }
    return mediaSrc;
}

export default ShowUserPostMedias

/**
 * 
 * 
 function ShowUserPostMedias({ mediaType, mediaContent }) {
    let renderContent = () => {
        let content = null;
        if (mediaType === 'picture' && mediaContent.includes("http")) {
            content = <img src={mediaContent} alt='what gives' />
        } else if (mediaType === 'picture' && !mediaContent.includes("http")) {
            content = <img src={handleMediaFileChecks(mediaContent)} alt='what gives' />
        } else if (mediaType === 'video' && mediaContent.includes("http")) {
            content = <img src={mediaContent} alt='what gives' />
        }
        return content;
    }
    return (
        <Box>
            {renderContent()}
        </Box>
    )
}
 */