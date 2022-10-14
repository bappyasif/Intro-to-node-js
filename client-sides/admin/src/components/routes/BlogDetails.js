import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { fetchData } from '../utils'

function BlogDetails() {
  let [blogData, setBlogData] = useState([]);
  let [comments, setComments] = useState([]);
  const param = useParams();
  const commentsEndpoint = `http://localhost:3000/comment/${param.blogId}/all-comments`;
  const blogPostEndpoint = `http://localhost:3000/blog/posts/${param.blogId}`;

  let handleComments = data => setComments(data.data);

  let handleBlogPost = data => setBlogData(data.blogData[0])

  useEffect(() => {
    fetchData(commentsEndpoint, handleComments)
    fetchData(blogPostEndpoint, handleBlogPost)
  }, [])

  // console.log(comments, "comments!!", blogData)

  let renderComments = () => comments?.map(comment => <RenderComment key={comment._id} commentData={comment} />)

  return (
    <div>
      {comments?.length} BlogDetails {param.blogId}
      <div className='blog-post'>
        <h2 className='post-title'>{blogData.title}</h2>
        <p className='post-body'>{blogData.body}</p>
        <p className='info-wrapper'>
          <span className='author-name'>{blogData.authorName}</span>
          <span className='posted'>{blogData.posted}</span>
          {/* <button onClick={handleClick}>{togglePublish ? "Unpublish" : "Publish"}</button> */}
        </p>
      </div>
      <h1>All Comments</h1>
      {comments.length ? renderComments() : null}
    </div>
  )
}

let RenderComment = ({ commentData }) => {
  
  return (
    <li className="comment-wrapper">
      <div>Email: {commentData.email}</div>
      <div>Name: {commentData.name}</div>
      <div>Body: {commentData.body}</div>
      <div>Posted: {commentData.posted}</div>
      <div className='btns'>
        <Link to={`/comments/${commentData._id}`}>Edit</Link>
        <Link to={`/comments/${commentData._id}/delete`}>Delete</Link>
      </div>
    </li>
  )
}

export default BlogDetails