let blogsData = []
let postsContainer = document.querySelector(".blogs")
let CHUNK = 1;
let CURRENT = 0;

let fetchAllBlogPosts = () => {
    fetch("http://localhost:3000/blog/all-posts/")
        .then(resp => resp.json())
        .catch(err => console.error('Caught error: ', err))
        .then(data => {
            renderDataByChunk(data.posts, CHUNK, CURRENT);
            blogsData = data.posts.filter(item => item.published);
            CURRENT = CURRENT + CHUNK;
            // console.log(blogsData, "blogsData")
        })
        .catch(err => new Error("error occured", err))
}

let handlePrevious = () => {
    // console.log("before prev", CURRENT)
    if (CURRENT > 0) {
        let temp = CURRENT - CHUNK

        cleanExistingBlogPosts();

        renderDataByChunk(blogsData, CURRENT, temp)
        CURRENT = temp;
    }
    // console.log("after prev", CURRENT)

    // Keeping CURRENT at 1 as a starting point for next cycle operations
    if (CURRENT == 0) {
        CURRENT = 1
    }
}

let handleNext = () => {
    // console.log("before next", CURRENT)
    if (CURRENT <= blogsData.length - 1) {
        let temp = CURRENT + CHUNK

        cleanExistingBlogPosts();

        renderDataByChunk(blogsData, temp, CURRENT)
        CURRENT = temp;
    }
    // console.log("after next", CURRENT)
    
    // keeping CURRENT at previous point so that "previous" cycle doesnt have to wait a click
    if (CURRENT == blogsData.length) {
        CURRENT = CURRENT - CHUNK
    }
}

let cleanExistingBlogPosts = () => {
    postsContainer.childNodes.forEach(node => {
        node.textContent = ''
    })
}

let renderDataByChunk = (data, limit, starting) => {
    data.forEach((postObj, idx) => {
        if (idx >= starting && idx < limit) {
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

// next button event listener
let nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", handleNext)

// previous button event listener
let prevBtn = document.querySelector(".prev-btn");
prevBtn.addEventListener("click", handlePrevious)

// begin fetching all posts
fetchAllBlogPosts();

/**
 * 
 * 
 let renderDataByChunk = (data, limit, starting) => {
    data.forEach((postObj, idx) => {
        if (postObj.published) {
            if (idx >= starting && idx < limit) {
                postMarkup(postObj, postsContainer)
            }
        }
        // if(postObj.published && idx >= CURRENT && idx < limitBy) {
        //     postMarkup(postObj, postsContainer)
        // }
    })
}
 * 
 * 
 // let handlePrevious = () => {
//     let temp = CURRENT - CHUNK;

//     if(temp >= 0) {
//         if (blogsData[temp].published) {
//             cleanExistingBlogPosts();
//             renderDataByChunk(blogsData, CURRENT, temp)        
//         } else {
//             temp = CURRENT - CHUNK;
//         }
//     }

//     CURRENT = temp;
    
//     console.log(temp,"<><>", CURRENT, blogsData[temp], "[][]", blogsData[CURRENT])
    
//     // if (temp >= 0 && CURRENT <= blogsData.length - 1) {
//     //     renderDataByChunk(blogsData, CURRENT, temp)
//     //     CURRENT = temp;
//     // }
// }
 * 
 * 
 // let handlePrevious = () => {
//     let temp = CURRENT - CHUNK;

//     if (blogsData[temp].published) {
//         cleanExistingBlogPosts();
//     }
    
//     console.log(temp,"<><>", CURRENT, blogsData[temp], "[][]", blogsData[CURRENT])
    
//     if (temp >= 0 && CURRENT <= blogsData.length - 1) {
//         renderDataByChunk(blogsData, CURRENT, temp)
//         CURRENT = temp;
//     }
// }
 * 
 * 
 
// let handlePrevious = () => {
//     let temp = CURRENT - CHUNK
//     if (blogsData[temp].published) {
//         cleanExistingBlogPosts();
//     }
    
//     console.log(temp,"<><>", CURRENT)
    
//     if (temp >= 0 && CURRENT <= blogsData.length - 1) {

//         renderDataByChunk(blogsData, CURRENT, temp)
//         CURRENT = temp;
//     }
// }
 * 
 * 
 
// let initialRender = (data) => {
//     // let postsContainer = document.querySelector(".blogs")
//     console.log(data, "!!")
//     // data.forEach((postObj, idx) => {
//     //     if(postObj.published && idx < 1) {
//     //         postMarkup(postObj, postsContainer)
//     //     }
//     // })
//     renderDataByChunk(data, 1)
// }

// let handlePrevious = () => {
//     if(CURRENT > 0 && CURRENT <= blogsData.length - 1) {
//         console.log(CURRENT, "<1><1>", CHUNK)
//         let temp = CURRENT - CHUNK

//         if(blogsData[temp].published) {
//             cleanExistingBlogPosts();
//         }

//         renderDataByChunk(blogsData, CURRENT);
//         CURRENT = temp;
//         console.log(CURRENT, "<2><2>", CHUNK)
//     }
// }

// let handlePrevious = () => {
//     if(CURRENT > 0 && CURRENT <= blogsData.length - 1) {
//         let temp = CURRENT - CHUNK
//         if(blogsData[temp].published) {
//             cleanExistingBlogPosts();
//         }
//         renderDataByChunk(blogsData, CURRENT, temp)
//         CURRENT = temp;
//     }
// }
 */