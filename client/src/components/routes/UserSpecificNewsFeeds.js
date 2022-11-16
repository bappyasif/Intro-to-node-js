import { Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { AppContexts } from '../../App'
import CreatePost from '../CreatePost';
import { RenderPost } from '../ShowPostsFromTwitter';
import ShowUserCreatedPost from '../UserCreatedPost';
import { readDataFromServer } from '../utils';

function UserSpecificNewsFeeds() {
    let [tweetPostsDataset, setTweetPostsDataset] = useState([]);
    let [userPostsDataset, setUserPostsDataset] = useState([])

    let appCtx = useContext(AppContexts);

    let handleDataset = result => {
        console.log(result, "result!!", ...result?.data?.data, "<><>", tweetPostsDataset)

        result?.data?.data && setTweetPostsDataset(prev => {
            let findIdx = prev.findIndex(item => result.data.data.findIndex(elem => elem.postData.id === item.postData.id))
            console.log(findIdx, "findIdx!!")
            // return ([...prev, ...result.data.data])
            return (findIdx === -1 ? [...prev, ...result.data.data] : [...prev])
        })
    }

    let topics = appCtx?.user?.topics;

    useEffect(() => {
        if (appCtx?.user?.friends?.length !== -1) {

            topics?.forEach(topic => {
                let url = `${appCtx.baseUrl}/twitter/search/${topic}/${topic}`
                readDataFromServer(url, handleDataset)
            })
        }
    }, [topics])

    console.log(userPostsDataset, "postsDataset!!")

    let renderTweetPosts = () => tweetPostsDataset?.map(dataset => <RenderPost key={dataset?.postData._id} item={dataset} baseUrl={appCtx.baseUrl} />)
    // let renderPosts = () => postsDataset?.map(dataset => <RenderPost key={dataset?._id} item={dataset} baseUrl={appCtx.baseUrl} />)
    // let renderPosts = () => postsDataset?.map(dataset => <RenderBasicPost key={dataset?._id} data={dataset} />)

    let renderUserPosts = () => userPostsDataset?.map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)

    return (
        <Paper>
            <Typography variant='h1'>User Specific News Feeds</Typography>
            
            <CreatePost setPostsDataset={setUserPostsDataset} />
            {renderUserPosts()}
            
            <TweetEmbed tweetsDataset={tweetPostsDataset} />
            {renderTweetPosts()}
        </Paper>
    )
}

const TweetEmbed = ({ tweetsDataset }) => {
    let renderEmbeds = () => tweetsDataset?.map(tweetDataset => <TwitterTweetEmbed key={tweetDataset?.postData?.id} tweetId={tweetDataset?.postData?.id} onLoad={function noRefCheck(){}} placeholder="Loading" />)
    return (
        <Paper
            className='embeds-wrap'
            sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}
        >
            {renderEmbeds()}
        </Paper>
    )
}

export default UserSpecificNewsFeeds