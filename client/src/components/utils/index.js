const sendDataToServer = (endpoint, dataObj, errorHandler, handleData) => {
    fetch(endpoint, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObj)
    }).then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) {
            // console.log("data is sent to server side", resp)
            // just making all previously existing error to be removed with an empty array
            errorHandler([]);
            return resp.json()
        } else {
            let data = resp.json();
            data
                .then(respData => {
                    errorHandler(respData);
                })
                .catch(err => console.error('error occured', err))
        }
    }).then(data => {
        alert("login successfull, will be redirected to home page")
        console.log(data, "!!")
        handleData(data)

    })
        .catch(err => console.error('post request is failed', err))
}

const readDataFromServer = (endpoint, dataUpdater) => {
    fetch(endpoint)
        .then(resp => resp.json())
        .catch(err => {
            dataUpdater({ errors: [err], data: [] })
        })
        .then(data => {
            dataUpdater({ data: data, errors: [] })
        })
        .catch(err => dataUpdater({ errors: [err], data: [] }))
}

const getAuthenticatedUserDataFromServer = (endpoint, dataUpdater) => {
    fetch(
        endpoint,
        {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Credentials": true
            }
        }
    ).then(resp => {
        if (resp.status === 200) {
            return resp.json()
        }
    }).catch(err => console.error(err, "response err!!"))
        .then(data => {
            console.log(data, "!data!")
            dataUpdater({ data: data, errors: [] })
        })
        .catch(err => dataUpdater({ errors: [err], data: [] }))
}

export {
    sendDataToServer,
    readDataFromServer,
    getAuthenticatedUserDataFromServer
}