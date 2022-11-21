import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { AppContexts } from '../../App'
import CreatePost from '../CreatePost';
import { RenderPost } from '../ShowPostsFromTwitter';
import ShowUserCreatedPost from '../UserCreatedPost';
import { readDataFromServer } from '../utils';

function UserSpecificNewsFeeds() {
    let [tweetPostsDataset, setTweetPostsDataset] = useState([]);
    // let [userPostsDataset, setUserPostsDataset] = useState([])
    let [allAccessiblePosts, setAllAccessiblePosts] = useState([]);

    let appCtx = useContext(AppContexts);

    let location = useLocation()

    let handleDataset = result => {
        console.log(result, "result!!", ...result?.data?.data, "<><>", tweetPostsDataset)

        result?.data?.data && setTweetPostsDataset(prev => {
            let findIdx = prev.findIndex(item => result.data.data.findIndex(elem => elem.postData.id === item.postData.id))
            console.log(findIdx, "findIdx!!")
            // return ([...prev, ...result.data.data])
            return (findIdx === -1 ? [...prev, ...result.data.data] : [...prev])
        })
    }

    // let handleUserPostsDataset = (result) => setUserPostsDataset(result.data.data)
    // let handleUserPostsDataset = (result) => appCtx.handleCurrentUserCreatedPosts(result.data.data)

    // let handleAllAccessiblePosts = result => setAllAccessiblePosts(result.data.data)
    let handleAllAccessiblePosts = result => {
        appCtx.handleAvailablePostsFeeds(result.data.data)
        // appCtx.handleAvailablePostsFeeds(result.data.data)
        // setAllAccessiblePosts(result.data.data)
    }

    let topics = appCtx?.user?.topics;

    useEffect(() => {
        if (appCtx?.user?.friends?.length !== -1) {

            topics?.forEach(topic => {
                let url = `${appCtx.baseUrl}/twitter/search/${topic}/${topic}`
                // readDataFromServer(url, handleDataset)
            })
        }
    }, [topics])

    // let getAllUserPosts = () => {
    //     let url = `${appCtx.baseUrl}/posts/${appCtx.user._id}`
    //     readDataFromServer(url, handleUserPostsDataset)
    // }

    let getAllAccessiblePosts = () => {
        let url = `${appCtx.baseUrl}/posts/`
        readDataFromServer(url, handleAllAccessiblePosts)
    }

    useEffect(() => {
        // appCtx.user._id && getAllUserPosts()
        // appCtx.user._id && getAllAccessiblePosts()
        location.pathname && appCtx.user._id && getAllAccessiblePosts()
        location.pathname && console.log(location.pathname === "/", location.pathname)
    }, [appCtx.user?._id, location.pathname])

    // console.log(userPostsDataset, "postsDataset!!", allAccessiblePosts)
    console.log("postsDataset!!", allAccessiblePosts)

    let renderTweetPosts = () => tweetPostsDataset?.map(dataset => <RenderPost key={dataset?.postData._id} item={dataset} baseUrl={appCtx.baseUrl} />)

    let renderAllAccessiblePosts = () => appCtx.availablePostsFeeds?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)
    // let renderAllAccessiblePosts = () => allAccessiblePosts?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)
    
    // let renderUserPosts = () => userPostsDataset?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)
    
    // let renderUserPosts = () => userPostsDataset?.map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)
    // let renderUserPosts = () => userPostsDataset?.sort((a, b) => Math.sign(new Date(a.created) - new Date(b.created))).map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)
    // let renderUserPosts = () => userPostsDataset?.sort((a, b) => Math.sign(new Date(a.created) - new Date(b.created) ? 1 : -1)).map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)

    return (
        <Paper>
            <Typography variant='h1'>User Specific News Feeds</Typography>

            <CreatePost setAllAccessiblePosts={setAllAccessiblePosts} />
            {/* <CreatePost setPostsDataset={setUserPostsDataset} /> */}
            {/* {renderUserPosts()} */}
            {/* {renderAllAccessiblePosts()} */}
            {appCtx.availablePostsFeeds ? renderAllAccessiblePosts() : null}

            <TweetEmbed tweetsDataset={tweetPostsDataset} />
            {/* {renderTweetPosts()} */}
        </Paper>
    )
}

const TweetEmbed = ({ tweetsDataset }) => {
    let renderEmbeds = () => tweetsDataset?.map(tweetDataset => <TwitterTweetEmbed key={tweetDataset?.postData?.id} tweetId={tweetDataset?.postData?.id} onLoad={function noRefCheck() { }} placeholder="Loading" />)
    return (
        <Paper
            className='embeds-wrap'
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
        >
            {renderEmbeds()}
        </Paper>
    )
}

export default UserSpecificNewsFeeds