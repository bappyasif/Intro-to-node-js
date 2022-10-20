const sendDataToServer = (endpoint, dataObj, errorHandler) => {
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
        } else {
            let data = resp.json();
            data
                .then(respData => {
                    errorHandler(respData);
                })
                .catch(err => console.error('error occured', err))
        }
    })
        .catch(err => console.error('post request is failed', err))
}

export {sendDataToServer}