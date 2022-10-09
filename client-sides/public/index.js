let fetchAllBlogPosts = () => {
    fetch("http://localhost:3000/blog/all-posts/")
        .then(resp => resp.json())
        .catch(err => console.error('Caught error: ', err))
            .then(data => renderData(data.posts))
            .catch(err => new Error("error occured", err))
}

let renderData = (data) => {
    let postsContainer = document.querySelector(".container")
    console.log(data, "!!")
    data.forEach(postObj => {
        if(postObj.published) {
            postMarkup(postObj, postsContainer)
        }
    })
}

let postMarkup = (postObj, container) => {
    let { title, body, authorName, posted } = { ...postObj }

    let postWrapper = document.createElement("div");
    let postTitle = createMarkup(title, 'h2', "post-title");
    let postBody = createMarkup(body, "p", "post-body");

    let infoWrapper = document.createElement("div");
    let postAuthor = createMarkup(authorName, "span", "post-author");
    let postDate = createMarkup(posted, "span", "post-date")
    infoWrapper.classList.add("info-wrapper");
    infoWrapper.append(postAuthor, postDate);

    postWrapper.append(postTitle, postBody, infoWrapper)
    container.appendChild(postWrapper);
}

let createMarkup = (data, type, className) => {
    let element = document.createElement(type);
    element.textContent = data || className;
    element.classList.add(className);
    return element
}

// begin fetching all posts
fetchAllBlogPosts();