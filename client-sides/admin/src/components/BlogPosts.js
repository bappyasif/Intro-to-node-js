import React, { useEffect, useState } from 'react'
import { updateThisBlogPost } from './utils';

function BlogPosts() {
    let [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/blog/all-posts")
            .then(resp => resp.json())
            .catch(err => console.error("response error", err))
                .then(data => setBlogPosts(data.posts))
                .catch(err => new Error("error caught", err))
    }, [])

    return (
        <div className='bp-container'>
            <h1>All Blog Posts Both Published And Unpublished</h1>
            {
                blogPosts
                ?
                <RenderAllBlogPosts blogPosts={blogPosts} />
                :
                null
            }
        </div>
    )
}

let RenderAllBlogPosts = ({blogPosts}) => {
    let renderPosts = () => blogPosts?.map(postItem => <RenderThisBlogPost key={postItem._id} blogPost={postItem} />)
    return (
        <ol className='abp-wrapper'>
            {renderPosts()}
        </ol>
    )
}

let RenderThisBlogPost = ({blogPost}) => {
    let {_id, title, body, authorName, posted, published} = {...blogPost}

    let [togglePublish, setTogglePublish] = useState(false)

    let handleClick = () => {
        updateThisBlogPost(blogPost)
        setTogglePublish(!togglePublish);
    }
    return (
        <li className='blog-post'>
            <h2 className='post-title'>{title}</h2>
            <p className='post-body'>{body}</p>
            <p className='info-wrapper'>
                <span className='author-name'>{authorName}</span>
                <span className='posted'>{posted}</span>
                <button onClick={handleClick}>{published || togglePublish ? "Unpublish" : "Publish"}</button>
            </p>
        </li>
    )
}

export default BlogPosts