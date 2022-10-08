import { useState } from 'react';
import './App.css';
import BlogPosts from './components/BlogPosts';
import NewBlogPostForm from './components/NewBlogPostForm';

function App() {
  let [toggle, setToggle] = useState(false);

  return (
    <div className="App">
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

let ToggleForm = ({toggle, setToggle}) => {
  let clickHandler = () => setToggle(!toggle);

  return (
    <div>
      <h2>{toggle ? null : 'Ready to create a new blog post?'}</h2>
      <button onClick={clickHandler}>{toggle ? "Hide" : "Show"} form</button>
    </div>
  )  
}

export default App;
