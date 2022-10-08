import React, { useState } from 'react'
import { sendDataToServer } from './utils';

function NewBlogPostForm() {
  let [formData, setFormData] = useState({});
  let [errorResponse, setErrorResponse] = useState([]);

  let handleErrorResponse = data => setErrorResponse(data);

  let handleSubmit = (event) => {
    event.preventDefault();
    sendDataToServer(formData, handleErrorResponse);
  }

  let handleChange = (evt, element) => {
    if(element === "published") {
      setFormData(prev => ({...prev, [element]: !prev[element]}));
    } else {
      setFormData(prev => ({...prev, [element]: evt.target.value}));
    }
  }

  // console.log(formData, "fromData")
  // console.log(errorResponse, "errorData", errorResponse.errors)

  return (
    <div className='form-wrapper'>
      {errorResponse?.errors ? <RenderErrors errors={errorResponse.errors} /> : null}
      <form method='post' action='' onSubmit={handleSubmit}>
      <legend>Create A New Blog Post</legend>
      <fieldset>
        <label htmlFor='title'>Ttile</label>
        <input id='title' type={'text'} name={'title'} onChange={(e) => handleChange(e, 'title')} placeholder={"type in blog post title here...."} required />
      </fieldset>
      <fieldset>
        <label htmlFor='body'>Body</label>
        <textarea id='body' type={'text'} name={'body'} onChange={(e) => handleChange(e, 'body')} placeholder={"type in blog post title here...."} required></textarea>
      </fieldset>
      <fieldset>
        <label htmlFor='author'>Author</label>
        <input id='author' type={'text'} name={'author'} onChange={(e) => handleChange(e, 'authorName')} placeholder={"author name goes here...."} required />
      </fieldset>
      <fieldset>
        <label htmlFor='posted'>Posted</label>
        <input id='posted' type={'date'} name={'posted'} onChange={(e) => handleChange(e, 'posted')} required />
      </fieldset>
      <fieldset>
        <label htmlFor='publish'>Do you want this blog post to publish now? <input id='publish' name='publish' type={"checkbox"} onChange={(e) => handleChange(e, 'published')} /></label>
      </fieldset>
      <button type='submit'>Create Now</button>
    </form>
    </div>
  )
}

let RenderErrors = ({errors}) => {
  let renderErrors = () => errors?.map((error, idx) => <RenderError key={idx} error={error} />)
  return(
    <ul className='errors-list'>
      herere
      {renderErrors()}
    </ul>
  )
}

let RenderError = ({error}) => {
  return (
    <li className='list-item'>`{error.param} -- {error.msg}`</li>
  )
}

export default NewBlogPostForm