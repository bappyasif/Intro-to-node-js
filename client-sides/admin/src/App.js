import { useEffect, useState } from 'react';
import './App.css';
import BlogPosts from './components/BlogPosts';
import NewBlogPostForm from './components/NewBlogPostForm';
import RegisterUser from './components/RegisterUser';
import ShowNavs from './components/ShowNavs';
import UserLogin from './components/UserLogin';
import { getExpiration, isLoggedIn } from './components/utils';

function App() {
  let [toggle, setToggle] = useState(false);
  let [showWhichForm, setShowWhichForm] = useState(null);
  let [newDataAvailable, setNewDataAvailable] = useState(false);

  let handleToggle = () => setToggle(!toggle);

  // to see if already any existing token available on initial load
  useEffect(() => {
    let checkTokenAlreadyExistingIsValid = getExpiration();
    if (checkTokenAlreadyExistingIsValid) {
      if (isLoggedIn()) {
        setShowWhichForm("logout")
      } else {
        setShowWhichForm("login")
      }
    }
  }, [])

  // if on load no token has been found, then fetch and check if user exists or not
  // if no user has been found then show "Register" form
  let handleWhichForm = (val) => setShowWhichForm(val)

  return (
    <div className="App">

      <ShowNavs showWhichForm={showWhichForm} handleWhichForm={handleWhichForm} handleToggle={handleToggle} toggle={toggle} />

      {
        showWhichForm === "login"
          ?
          <UserLogin handleWhichForm={handleWhichForm} />
          :
          showWhichForm === "register"
            ?
            <RegisterUser />
            :
            null
      }

      {
        toggle
          ?
          <NewBlogPostForm handleToggle={handleToggle} setNewDataAvailable={setNewDataAvailable} />
          :
          null
      }

      {showWhichForm === "logout" ? <BlogPosts newDataAvailable={newDataAvailable} setNewDataAvailable={setNewDataAvailable} /> : null}
    </div>
  );
}

export default App;
