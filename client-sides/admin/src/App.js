import './App.css';
import BlogPosts from './components/routes/BlogPosts';
import ShowNavs from './components/ShowNavs';
import BlogDetails from "./components/routes/BlogDetails"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import ErrorPage from './components/ErrorPage';
import UserLogin from './components/routes/UserLogin';
import RegisterUser from './components/routes/RegisterUser';
import NewBlogPostForm from './components/routes/NewBlogPostForm';
import { useEffect, useState } from 'react';
import { getExpiration, isLoggedIn } from './components/utils';

function App() {
  let [auth, setAuth] = useState(false);

  useEffect(() => {
    let checkTokenAlreadyExistingIsValid = getExpiration();
    if (checkTokenAlreadyExistingIsValid) {
      if (isLoggedIn()) {
        setAuth(true);
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <ShowNavs auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path='/' element={auth ? <Navigate replace to={"/blogs"} /> : <Navigate replace to={"/login"} />} />
          <Route path='/login' element={<UserLogin auth={auth} setAuth={setAuth} />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/blogs' element={auth ? <BlogPosts /> : <Navigate replace to={"/login"} />} />
          <Route path='/create/blog' element={auth ? <NewBlogPostForm /> : <Navigate replace to={"/login"} />} />
          <Route path='blogs/:blogId' element={auth ? <BlogDetails /> : <Navigate replace to={"/login"} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;