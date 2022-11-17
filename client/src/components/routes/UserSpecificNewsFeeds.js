import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
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

    let handleUserPostsDataset = (result) => setUserPostsDataset(result.data.data)

    let topics = appCtx?.user?.topics;

    useEffect(() => {
        if (appCtx?.user?.friends?.length !== -1) {

            topics?.forEach(topic => {
                let url = `${appCtx.baseUrl}/twitter/search/${topic}/${topic}`
                // readDataFromServer(url, handleDataset)
            })
        }
    }, [topics])

    let getAllUserPosts = () => {
        let url = `${appCtx.baseUrl}/posts/${appCtx.user._id}`
        readDataFromServer(url, handleUserPostsDataset)
    }

    useEffect(() => {
        appCtx.user._id && getAllUserPosts()
    }, [appCtx.user?._id])

    console.log(userPostsDataset, "postsDataset!!")

    let renderTweetPosts = () => tweetPostsDataset?.map(dataset => <RenderPost key={dataset?.postData._id} item={dataset} baseUrl={appCtx.baseUrl} />)

    // userPostsDataset?.sort((a, b) => console.log(a.created, b.created, a.created >b.created, a.created < b.created))
    // console.log(userPostsDataset?.sort((a, b) => new Date(a.created) - new Date(b.created)), "sorted!!!!")
    // console.log(userPostsDataset?.sort(), "sorted!!!!")
    // console.log(userPostsDataset?.sort((a, b) => console.log(new Date(a.created) - new Date(b.created), new Date(a.created), new Date(b.created))), "sorted!!!!")
    // console.log(userPostsDataset?.sort((a, b) => console.log(new Date(a.created) > new Date(b.created), new Date(a.created), new Date(b.created))), "sorted!!!!")
    // let test = userPostsDataset?.sort((a, b) => new Date(a.created) > new Date(b.created))
    // let test = userPostsDataset?.reverse();
    // let test = userPostsDataset?.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime())

    // userPostsDataset?.sort((a, b) => {
    //     a = new Date(a.created);
    //     b = new Date(b.created);
    //     return a < b ? -1 : a > b ? 1 : 0;
    // })

    // let test = userPostsDataset?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1)
    // console.log(test, "sorted!!!!")

    // let renderUserPosts = () => userPostsDataset?.map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)
    let renderUserPosts = () => userPostsDataset?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map(dataset => <ShowUserCreatedPost key={dataset._id} postData={dataset} />)

    return (
        <Paper>
            <Typography variant='h1'>User Specific News Feeds</Typography>

            <CreatePost setPostsDataset={setUserPostsDataset} />
            {renderUserPosts()}

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