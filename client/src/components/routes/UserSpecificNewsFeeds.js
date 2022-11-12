import { Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { AppContexts } from '../../App'
import { RenderPost } from '../ShowPostsFromTwitter';
import { readDataFromServer } from '../utils';

function UserSpecificNewsFeeds() {
    let [postsDataset, setPostsDataset] = useState([]);
    let [filteredDataset, setFilteredDataset] = useState([]);
    let [decidedDataset, setDecidedDataset] = useState([]);

    let appCtx = useContext(AppContexts);

    // const getDuplicates = (arr, key) => {
    //     let filteredIds = arr.map(item => item.postData.id)
    //         .filter((value, index, self) => self.indexOf(value) !== index)

    //     let filtered = [];

    //     postsDataset.forEach(item => {
    //         let chk = filtered.findIndex(elem => elem.postData.id === item.postData.id)
    //         if (filteredIds.includes(item.postData.id) && chk === -1) {
    //             console.log(item, item.postData.id)
    //             filtered.push(item)
    //         }
    //     })
    //     // console.log(filtered, postsDataset, filteredIds)
    //     setFilteredDataset(filtered)
    // }

    // let handleDataset = result => {
    //     console.log(result, "result!!", ...result.data?.data, "<><>", postsDataset)

    //     result?.data?.data && setPostsDataset(prev => ([...prev, ...result.data.data]))
    // }

    let handleDataset = result => {
        console.log(result, "result!!", ...result.data?.data, "<><>", postsDataset)

        result?.data?.data && setPostsDataset(prev => {
            let findIdx = prev.findIndex(item => result.data.data.findIndex(elem => elem.postData.id === item.postData.id))
            console.log(findIdx, "findIdx!!")
            // return ([...prev, ...result.data.data])
            return (findIdx === -1 ? [...prev, ...result.data.data] : [...prev])
        })
    }

    let topics = appCtx?.user?.topics;

    useEffect(() => {
        if (appCtx?.user?.friends?.length === 0) {

            topics?.forEach(topic => {
                let url = `${appCtx.baseUrl}/twitter/search/${topic}/${topic}`
                readDataFromServer(url, handleDataset)
            })
        }
    }, [topics])

    // useEffect(() => getDuplicates(postsDataset), [postsDataset])

    // useEffect(() => filteredDataset?.length && setPostsDataset(filteredDataset), [filteredDataset])

    // console.log(postsDataset, "postsDataset!!", filteredDataset)
    console.log(postsDataset, "postsDataset!!")

    // useEffect(() => setDecidedDataset(filteredDataset.length ? filteredDataset : postsDataset), [postsDataset, filteredDataset])

    // let renderPosts = () => (decidedDataset)?.map(dataset => <RenderPost key={dataset?.postData.id} item={dataset} baseUrl={appCtx.baseUrl} />)
    let renderPosts = () => postsDataset?.map(dataset => <RenderPost key={dataset?.postData.id} item={dataset} baseUrl={appCtx.baseUrl} />)

    return (
        <Paper>
            <Typography variant='h1'>User Specific News Feeds</Typography>
            {/* <TweetEmbed tweetsDataset={postsDataset} /> */}
            {renderPosts()}
        </Paper>
    )
}

const TweetEmbed = ({ tweetsDataset }) => {
    let renderEmbeds = () => tweetsDataset?.map(tweetDataset => <TwitterTweetEmbed key={tweetDataset.postData.id} />)
    return (
        <Paper>
            {renderEmbeds()}
        </Paper>
    )
}

export default UserSpecificNewsFeeds