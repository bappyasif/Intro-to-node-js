import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
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

const contexts = {
  baseUrl: "http://localhost:3000"
}

export const AppContexts = createContext()

function App() {
  return (
    <AppContexts.Provider value={contexts}>
      <BrowserRouter>
        <div className="App" style={{backgroundColor: "honeydew"}}>
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
      </BrowserRouter>
    </AppContexts.Provider>
  );
}

export default App;
