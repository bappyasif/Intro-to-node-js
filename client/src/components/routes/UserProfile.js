import { TabContext, TabList, TabPanel } from '@mui/lab';
import { AppBar, Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContexts } from '../../App';
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
        console.log(current, "current!!")
        setTabValue(current);
    }

    // let tabsItems = [{ name: "All Posts", value: "1" }, { name: "Liked Posts", value: "2" }, { name: "Loved Posts", value: "3" }, { name: "Shared Posts", value: "4" }]

    // let renderTabsItems = () => tabsItems.map(item => <RenderTab key={item.name} item={item} />)

    // console.log(tabValue, "!!")

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
                        {/* {renderTabsItems()} */}
                        <Tab label="All Posts" value="1" />
                        <Tab label="Liked Posts" value="2" />
                        <Tab label="Loved Posts" value="3" />
                        <Tab label="Shared Posts" value="4" />
                        <Tab label="Commented Posts" value="5" />
                        <Tab label="Disliked Posts" value="6" />
                        {/* <RenderTab item={{name:"All Posts", value:"1"}} /> */}
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
        // <Box sx={{
        //     bgcolor: 'background.paper', 
        //     typography: "body1",
        //     width: "max-content"
        // }}
        // >
        //     <AppBar position='static'>
        //         <TabContext
        //             value={tabValue}
        //         >
        //             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //                 <TabList
        //                     // value={tabValue}
        //                     onChange={handleTabValueChange}
        //                     textColor="secondary"
        //                     indicatorColor="secondary"
        //                     // variant="fullWidth"
        //                     aria-label="full width tabs in user profile"
        //                 >
        //                     {/* {renderTabsItems()} */}
        //                     <Tab
        //                         value={0}
        //                         label={"0"}
        //                         id={"0"}
        //                         tabIndex={1}
        //                     />
        //                     <Tab
        //                         value={1}
        //                         label={"1"}
        //                         id={"1"}
        //                         tabIndex={1}
        //                     />
        //                 </TabList>
        //             </Box>
        //         </TabContext>
        //     </AppBar>
        // </Box>
    )
}

let RenderAllPostsTab = ({ appCtx }) => {
    let [postsData, setPostsData] = useState([]);

    let handlePostsData = (result) => {
        console.log(result.data.data, result, "!!")
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
                {renderAllPosts()}
            </Container>
        </Paper>
    )
}

let RenderLikedPostsTab = ({ appCtx }) => {
    return (
        <Typography variant="h3">Liked Posts!!</Typography>
    )
}

let RenderLovedPostsTab = ({ appCtx }) => {
    return (
        <Typography variant="h3">Loved Posts!!</Typography>
    )
}

let RenderSharedPostsTab = ({ appCtx }) => {
    return (
        <Typography variant="h3">Shared Posts!!</Typography>
    )
}

let RenderCommentedPostsTab = ({ appCtx }) => {
    return (
        <Typography variant="h3">Commented Posts!!</Typography>
    )
}

let RenderDislikedPostsTab = ({ appCtx }) => {
    return (
        <Typography variant="h3">Disliked Posts!!</Typography>
    )
}

let RenderTab = ({ item }) => {
    return (
        <Tab label={item.name} value={item.value} />
        // <Tab
        //     value={item.value}
        //     label={item.name}
        //     id={item.name}
        //     tabIndex={1}
        // // `aria-controls={full-width-tabpanel-${item.name}}` 
        // />
    )
}

export default UserProfile