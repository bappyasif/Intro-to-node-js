let { TwitterApi } = require("twitter-api-v2")
let needle = require("needle");
const { getTweetsFromMultipleAccountIds } = require("../utils/httpRequests");

let getTweetsFromAccount = (req, res, next) => {
    let accountId = req.params.name;
    res.send("get tweet from account")
}

let getTweetsFromMultipleAccounts = (req, res, next) => {
    // let endpoint = "https://api.twitter.com/2/users/?ids="
    let endpoint = "https://api.twitter.com/2/users/by?usernames="
    
    for(let key in req.query) {
        endpoint+= req.query[key].toString() +","
    }
    
    let accountId = req.params.names;
    
    console.log(req.params, "<><>", req.query, endpoint)
    
    const params = {
        "usernames": "bappyasif,hoxieloxie",
        "user.fields": "created_at,description", // Edit optional query parameters here
        "expansions": "pinned_tweet_id"
    }

    getTweetsFromMultipleAccountIds(endpoint, params).then(results => console.log(results)).catch(err=>console.error(err))
    // getTweetsFromMultipleAccountIds("https://api.twitter.com/2/users?ids=1957404727,3040721962").then(results => console.log(results)).catch(err=>console.error(err))
    
    res.send("get tweets from multiple account")
}

let getTweetsAboutTopic = (req, res, next) => {
    let topicName = req.params.name;
    res.send("get tweets about topic")
}

let getTweetsAboutMultipleTopics = (req, res, next) => {
    let topicName = req.params.name;
    res.send("get tweets about multiple topic")
}

let getTopTwitterNews = (req, res, next) => {
    res.send("get top twitter news")
}

let getCurrentTrendingTweets = (req, res, next) => {
    res.send("get current trending tweets")
}

module.exports = {
    getTweetsFromAccount,
    getTweetsFromMultipleAccounts,
    getTweetsAboutTopic,
    getTweetsAboutMultipleTopics,
    getTopTwitterNews,
    getCurrentTrendingTweets
}