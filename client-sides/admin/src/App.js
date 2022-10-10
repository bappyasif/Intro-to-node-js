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

  return (
    <div className="App">
      <ShowLoginOrRegisterToUser />
      <BlogPosts />
      <ToggleForm toggle={toggle} setToggle={setToggle} />
      {
        toggle
          ?
          <NewBlogPostForm />
          :
          null
      }
    </div>
  );
}

let ShowLoginOrRegisterToUser = () => {
  let [showWhichForm, setShowWhichForm] = useState(null)

  // to see if already any existing token available on load
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

  // console.log("check", showWhichForm)

  // if on load no token has been found, then fetch and check if user exists or not
  // if no user has been found then show "Register" form
  let handleWhichForm = (val) => setShowWhichForm(val)

  return (
    <div className='ae-wrapper'>
      <ShowNavs showWhichForm={showWhichForm} handleWhichForm={handleWhichForm} />
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
    </div>
  )
}

let ToggleForm = ({ toggle, setToggle }) => {
  let clickHandler = () => setToggle(!toggle);

  return (
    <div>
      <h2>{toggle ? null : 'Ready to create a new blog post?'}</h2>
      <button onClick={clickHandler}>{toggle ? "Hide" : "Show"} form</button>
    </div>
  )
}

export default App;
