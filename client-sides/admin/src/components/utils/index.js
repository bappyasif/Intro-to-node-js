import moment from "moment";

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
            console.log("data is sent to server side", resp)
            errorUpdater([]);
        } else {
            let data = resp.json();
            data
            .then(respData => {
                console.log(respData);
                errorUpdater(respData);
            })
            .catch(err => console.error('error occured', err))
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

export let beginUserAuthenticationProcess = (blogPostObj, errorUpdater, endpoint, authUpdater) => {
    fetch((endpoint), {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(blogPostObj)
    }).then((resp) => {
        if(resp.status >= 200 && resp.status <= 299) {
            console.log("data is sent to server side", resp)
            
            let response = resp.json();
            response.then(data => {
                console.log(data, "<<data>>");
                // localStorage.setItem("token", data.token);
                // localStorage.setItem("expires", data.expiresIn);
                setLocalStorageItems(data)
            })
            .catch(err => console.error(err))

            errorUpdater([]);
        } else {
            let data = resp.json();
            data
            .then(respData => {
                console.log(respData);
                errorUpdater(respData);
            })
            .catch(err => console.error('error occured', err))
        }
    })
    .catch(err => console.error('error occured', err))
}

let setLocalStorageItems = (authObject) => {
    let expires = moment().add(authObject.expiresIn)

    localStorage.setItem("token", authObject.token);
    // localStorage.setItem("expires", expires);
    localStorage.setItem("expires", JSON.stringify(expires.valueOf())); // sets time in millis
}

const getExpiration = () => {
    const expiration = localStorage.getItem("expires");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt)
}

const isLoggedIn = () => moment().isBefore(getExpiration());

const isLoggedOut = () => !isLoggedIn()