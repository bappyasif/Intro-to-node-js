import React, { useEffect, useState } from 'react'
import { fetchAllBlogPosts, updateThisBlogPost } from '../utils';

function BlogPosts({newDataAvailable, setNewDataAvailable}) {
    let [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetchAllBlogPosts(setBlogPosts);
    }, [])

    useEffect(() => {
        fetchAllBlogPosts(setBlogPosts)
        // once refetched resetting flag state value to false so that when a new data becomes available this hook gets to run
        newDataAvailable && setNewDataAvailable(false)
    }, [newDataAvailable])

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
    let {title, body, authorName, posted, published} = {...blogPost}

    let [togglePublish, setTogglePublish] = useState()

    useEffect(() => setTogglePublish(published), [])

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
                <button onClick={handleClick}>{togglePublish ? "Unpublish" : "Publish"}</button>
            </p>
        </li>
    )
}

export default BlogPosts