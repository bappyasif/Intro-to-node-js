let acDiv = document.querySelector(".all-comments");

let removeComments = () => {
    acDiv.childNodes.forEach(node => node.remove());
}

let showBlogPostComments = () => {
    let blogDiv = document.querySelector(".bp-wrapper");
    console.log(blogDiv.id)
    fetchCommentsForPost(blogDiv.id)
}

let fetchCommentsForPost = (blogId) => {
    fetch(`http://localhost:3000/comment/${blogId}/all-comments`)
    .then(res =>res.json())
    .catch(err => console.error(err, 'response error'))
    .then(data => {
        removeComments();
        commenceRenderingPostComments(data)
    })
    .catch(err => console.error('error occured', err))
}

let commenceRenderingPostComments = data => {
    // console.log(data, "chk1", data.data.length)
    if(data.data.length) {
        let acDiv = document.querySelector(".all-comments");
        data.data.forEach(item => {
            // console.log(commentMarkup(item))
            acDiv.append(commentMarkup(item))
        })
    }
}

let commentMarkup = (commentData) => {
    let domStr = `<div class="comment-wrapper">
        <div>Name: ${commentData.name}</div>
        <div>Body: ${commentData.body}</div>
        <div>Posted: ${commentData.posted}</div>
    </div>`

    return document.createRange().createContextualFragment(domStr).firstChild
}