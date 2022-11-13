import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
// import TryoutContainer from './trying-out-mui-materials/TryoutContainer';
import './App.css';
import MainNavigation from './components/MainNavigation';
import LoginForm from './components/routes/LoginForm';
import RegisterUser from './components/routes/RegisterUser';
import ErrorPage from './components/ErrorPage';
import ConnectUsers from './components/routes/ConnectUsers';
import NewsFeeds from './components/routes/NewsFeeds';
import ChooseTopics from './components/routes/ChooseTopics';
import BasicsUsage from './trying-out-twitter-api/basics';
import EditUserProfile from './components/routes/EditUserProfile';
import TopicCategory from './components/routes/TopicCategory';
import LoginSuccess from './components/routes/LoginSuccess';
import { getAuthenticatedUserDataFromServer } from './components/utils';
import UserSpecificNewsFeeds from './components/routes/UserSpecificNewsFeeds';
import FriendsRequests from './components/routes/FriendsRequests';

// const contexts = {
//   baseUrl: "http://localhost:3000"
// }

export const AppContexts = createContext()

function App() {
  let [user, setUser] = useState([]);
  let [jwtUser, setJwtUser] = useState({});
  let location = useLocation()

  let handleData = result => {
    console.log(result, "result!!")
    // setUser(result?.data?.data || result?.user)
    result?.user ? setJwtUser(result?.user) : setUser(result?.data?.data)
  }

  // let updateData = (key, value) => setUser(prev => ({ ...prev, [key]: value }))
  // let updateData = (key, value) => setUser(prev => ({ ...prev, [key]: [...prev[key], value] }))
  let updateData = (key, value) => setUser(prev => {
    // checking if data is already in list
    let fIdx = prev[key].findIndex(val => val === value);
    if(fIdx === -1) {
      // adding to array list
      return ({ ...prev, [key]: [...prev[key], value] })
    } else {
      // removing from array list
      let filtered = prev[key].filter(val => val !== value);
      return ({ ...prev, [key]: filtered })
    }
  })

  const contexts = {
    baseUrl: "http://localhost:3000",
    user: user,
    handleData: handleData,
    updateData: updateData
  }

  let getUser = () => {
    let url = `http://localhost:3000/login/success`
    getAuthenticatedUserDataFromServer(url, handleData)
  }

  useEffect(() => {
    // location.pathname === "/" && console.log("running!!")
    // also making sure if oauth is not used and jwtToken is used then dont fetch data from server again on route changes
    Object.keys(jwtUser).length === 0 && location.pathname === "/" && getUser()
  }, [location.pathname === "/"])

  useEffect(() => {
    // when jwtUser data is present we'll deal with this, and for simplicity making userData empty
    // if(Object.keys(jwtUser).length !== 0) {setUser({})}
    if (Object.keys(jwtUser).length !== 0) { setUser(jwtUser) }
  }, [jwtUser])

  user && console.log(user, "user!!", jwtUser)

  return (
    <AppContexts.Provider value={contexts}>
      <div className="App" style={{ backgroundColor: "honeydew" }}>
        <MainNavigation />
        {/* <TryoutContainer /> */}
        {/* <BasicsUsage /> */}
        <Routes>
          <Route path='/' element={<UserSpecificNewsFeeds />} />
          <Route path='/login' element={<LoginForm handleData={handleData} />} />
          <Route path='/login/success' element={<LoginSuccess />} />
          <Route path='/register' element={<RegisterUser handleData={handleData} />} />
          <Route path='/friend-requests' element={<FriendsRequests />} />
          <Route path='/choose-topics' element={<ChooseTopics />} />
          <Route path='/choose-topics/:category' element={<TopicCategory />} errorElement={<ErrorPage />} />
          <Route path='/connect' element={<ConnectUsers />} />
          <Route path='/news-feeds' element={<NewsFeeds />} />
          <Route path='/edit-user-profile' element={<EditUserProfile />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </AppContexts.Provider>
  );
}

export default App;
