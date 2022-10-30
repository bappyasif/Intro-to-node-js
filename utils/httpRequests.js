let { TwitterApi } = require("twitter-api-v2")
let needle = require("needle")

let getTweetsFromMultipleAccountIds = async (endpointURL, params) => {
     // this is the HTTP header that adds bearer token authentication
     console.log(endpointURL, process.env.TWITTER_BEARER_TOKEN)
     const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    })

    if(res.body) {
        return res.body
    } else {
        throw new Error("unsuccessful request")
    }
}

module.exports = {
    getTweetsFromMultipleAccountIds
}