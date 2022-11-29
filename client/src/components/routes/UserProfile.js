import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AppBar, Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../../App';
import useToFetchUserPostData from '../hooks/useToFetchData';
import ShowUserCreatedPost from '../UserCreatedPost';
import UserProfileInfoSection from '../UserProfileInfoSection'
import { readDataFromServer } from '../utils';

function UserProfile() {
    let appCtx = useContext(AppContexts);

    return (
        <Paper>
            <UserProfileInfoSection appCtx={appCtx} />
            <Typography variant="h2">User Profile</Typography>
            <UserProfileTabs appCtx={appCtx} />
        </Paper>
    )
}

let UserProfileTabs = ({ appCtx }) => {
    let [tabValue, setTabValue] = useState("1");

    let handleTabValueChange = (event, current) => {
        // console.log(current, "current!!")
        setTabValue(current);
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleTabValueChange}
                        aria-label="lab API tabs example"
                        variant='fullWidth'
                        indicatorColor="secondary"
                    >
                        <Tab label="All Posts" value="1" />
                        <Tab label="Liked Posts" value="2" />
                        <Tab label="Loved Posts" value="3" />
                        <Tab label="Shared Posts" value="4" />
                        <Tab label="Commented Posts" value="5" />
                        <Tab label="Disliked Posts" value="6" />
                    </TabList>
                </Box>
                <TabPanel value="1"><RenderAllPostsTab appCtx={appCtx} /></TabPanel>
                <TabPanel value="2"><RenderLikedPostsTab appCtx={appCtx} /></TabPanel>
                <TabPanel value="3"><RenderLovedPostsTab appCtx={appCtx} /></TabPanel>
                <TabPanel value="4"><RenderSharedPostsTab appCtx={appCtx} /></TabPanel>
                <TabPanel value="5"><RenderCommentedPostsTab appCtx={appCtx} /></TabPanel>
                <TabPanel value="6"><RenderDislikedPostsTab appCtx={appCtx} /></TabPanel>
            </TabContext>
        </Box>
    )
}

let RenderAllPostsTab = ({ appCtx }) => {
    let [postsData, setPostsData] = useState([]);

    let handlePostsData = (result) => {
        // console.log(result.data.data, result, "!!")
        setPostsData(result.data.data)
    }

    let getAllPostsForThisUser = () => {
        let url = `${appCtx.baseUrl}/posts/${appCtx.user._id}`
        readDataFromServer(url, handlePostsData)
    }

    useEffect(() => {
        getAllPostsForThisUser()
    }, [])

    // let renderAllAccessiblePosts = () => postsData?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map((dataset, idx) => (idx < showPostsUntilIndex) && <ShowUserCreatedPost key={dataset._id} postData={dataset} setShowCreatePost={setShowCreatePost} />)
    let renderAllPosts = () => postsData?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map((dataset, idx) => (idx < 11) && <ShowUserCreatedPost key={dataset._id} postData={dataset} setShowCreatePost={() => null} />)

    return (
        <Paper>
            <Typography variant="h3">All Posts!!</Typography>
            <Container>
                {postsData?.length ? renderAllPosts() : null}
            </Container>
        </Paper>
    )
}

let RenderLikedPostsTab = ({ appCtx }) => {
    let { postsData } = useToFetchUserPostData(appCtx, "Like")

    console.log(postsData, "data!!")

    let renderAllPosts = () => postsData?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map((dataset, idx) => (idx < 11) && <ShowUserCreatedPost key={dataset._id} postData={dataset} setShowCreatePost={() => null} />)

    return (
        <Paper>
            <Typography variant="h3">Liked Posts!!</Typography>
            <Container>
                {postsData?.length ? renderAllPosts() : null}
            </Container>
        </Paper>
    )
}

let RenderLovedPostsTab = ({ appCtx }) => {
    let { postsData } = useToFetchUserPostData(appCtx, "Love")

    console.log(postsData, "data!!")

    let renderAllPosts = () => postsData?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map((dataset, idx) => (idx < 11) && <ShowUserCreatedPost key={dataset._id} postData={dataset} setShowCreatePost={() => null} />)

    return (
        <Paper>
            <Typography variant="h3">Loved Posts!!</Typography>
            <Container>
                {postsData?.length ? renderAllPosts() : null}
            </Container>
        </Paper>
    )
}

let RenderSharedPostsTab = ({ appCtx }) => {
    let { postsData } = useToFetchUserPostData(appCtx, "Share")

    console.log(postsData, "data!!")

    let renderAllPosts = () => postsData?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map((dataset, idx) => (idx < 11) && <ShowUserCreatedPost key={dataset._id} postData={dataset} setShowCreatePost={() => null} />)

    return (
        <Paper>
            <Typography variant="h3">Shared Posts!!</Typography>
            <Container>
                {postsData?.length ? renderAllPosts() : null}
            </Container>
        </Paper>
    )
}

let RenderCommentedPostsTab = ({ appCtx }) => {
    let { postsData } = useToFetchUserPostData(appCtx, "Comment")

    console.log(postsData, "data!!")

    let renderAllPosts = () => postsData?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map((dataset, idx) => (idx < 11) && <ShowUserCreatedPost key={dataset._id} postData={dataset} setShowCreatePost={() => null} />)

    return (
        <Paper>
            <Typography variant="h3">Commented Posts!!</Typography>
            <Container>
                {postsData?.length ? renderAllPosts() : null}
            </Container>
        </Paper>
    )
}

let RenderDislikedPostsTab = ({ appCtx }) => {
    let { postsData } = useToFetchUserPostData(appCtx, "Dislike")

    console.log(postsData, "data!!")

    let renderAllPosts = () => postsData?.sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1).map((dataset, idx) => (idx < 11) && <ShowUserCreatedPost key={dataset._id} postData={dataset} setShowCreatePost={() => null} />)

    return (
        <Paper>
            <Typography variant="h3">Disliked Posts!!</Typography>
            <Container>
                {postsData?.length ? renderAllPosts() : null}
            </Container>
        </Paper>
    )
}

export default UserProfile