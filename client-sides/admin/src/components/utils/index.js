export let sendDataToServer = (blogPostObj, errorUpdater, endpoint) => {
    fetch((endpoint || "http://localhost:3000/blog/create"), {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogPostObj)
    }).then((resp) => {
        if(resp.status >= 200 && resp.status <= 299) {
            console.log("data is sent to server side")
            errorUpdater([]);
        } else {
            let data = resp.json();
            data
            .then(respData => {
                console.log(respData);
                errorUpdater(respData);
            })
            .catch(err => console.error('error occured', err))
            // console.log(resp.status, "errors!!", data)
        }
    })
    .catch(err => console.error('error occured', err))
}

export let updateThisBlogPost = blogPostObj => {
    // console.log(blogPostObj, "<<>>")
    fetch("http://localhost:3000/blog/update", {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogPostObj)
    }).then(() => console.log("blog data is sent to server to update"))
    .catch(err => console.error('error occured', err))
}