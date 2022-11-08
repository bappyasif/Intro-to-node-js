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

const contexts = {
  baseUrl: "http://localhost:3000"
}

export const AppContexts = createContext()

function App() {
  let [user, setUser] = useState([]);
  let location = useLocation()

  let handleData = result => setUser(result.data.data)

  let getUser = () => {
    let url = `http://localhost:3000/login/success`
    getAuthenticatedUserDataFromServer(url, handleData)
  }

  useEffect(() => {
    // location.pathname === "/" && console.log("running!!")
    location.pathname === "/" && getUser()
  }, [location.pathname === "/"])

  user && console.log(user, "user!!")

  return (
    <AppContexts.Provider value={contexts}>
      <div className="App" style={{ backgroundColor: "honeydew" }}>
        <MainNavigation />
        {/* <TryoutContainer /> */}
        {/* <BasicsUsage /> */}
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/login/success' element={<LoginSuccess />} />
          <Route path='/register' element={<RegisterUser />} />
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
