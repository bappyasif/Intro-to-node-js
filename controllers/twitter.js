let { TwitterApi } = require("twitter-api-v2")
let needle = require("needle");
const { getTweetsFromRecentTermSearch } = require("../utils/httpRequests");
// let endpoint = '';

let getTweetsFromAccount = (req, res, next) => {
    let accountId = req.params.name;
    res.send("get tweet from account")
}

let getTweetsFromMultipleAccounts = (req, res, next) => {
    let endpoint = "https://api.twitter.com/2/users/?ids="
    // let endpoint = "https://api.twitter.com/2/users/by?usernames="
    
    for(let key in req.query) {
        endpoint+= req.query[key].toString() +","
    }
    
    let accountId = req.params.names;
    
    console.log(req.params, "<><>", req.query, endpoint)
    
    const params = {
        // "usernames": "bappyasif,hoxieloxie",
        ids: "1957404727,3040721962",
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

let searchRecentTweetsAboutTopic = (req, res, next) => {
    let endpoint = "https://api.twitter.com/2/tweets/search/recent"
    let searchTerm = req.params.term;
    let focusedTopic = req.params.topic.toLowerCase();
    // let focusedTopicCapitalized = focusedTopic[0].toUpperCase()+focusedTopic.substr(1)

    console.log(searchTerm, focusedTopic)

    const params = {
        // "query": "Womens league",
        "query": `${searchTerm} -is:retweet`,
        "user.fields": "created_at,description,name,username,public_metrics", // Edit optional query parameters here
        "tweet.fields": "author_id,context_annotations",
        "max_results": 11,
        "expansions": "attachments.media_keys",
        "media.fields": "url,preview_image_url",
    }
 
    getTweetsFromRecentTermSearch(endpoint, params, "v2RecentSearchJS").then(results => {
        // let filtered = results?.data?.filter(item => item?.context_annotations?.domain?.name.includes("Sport"))
        let filtered = []

        console.log(results, "results.includes<><>")
        
        if(results?.includes) { filtered.push(results.includes) }

        results?.data?.forEach(item => {
            if(item?.context_annotations?.length) {
                item?.context_annotations?.forEach(elem => {
                    
                    // console.log(elem.domain.name.includes(`${focusedTopic}`), "chk1")

                    if(elem.domain.name.toLowerCase().includes(focusedTopic)) {
                        let findIdx = filtered.findIndex(item2 => item2.id === item.id)
                        let chkTxt = filtered.findIndex(item2 => item2.text === item.text)
                        if(findIdx === -1 && chkTxt === -1) {
                            filtered.push(item)
                        }
                    }
                })
            } else {
                
                // console.log(item?.context_annotations?.domain?.name.includes(focusedTopic.toLowerCase()), "chk2")
                
                if(item?.context_annotations?.domain?.name.toLowerCase().includes(focusedTopic.toLowerCase())) {
                    filtered.push(item)
                }
            }
        })
        // console.log(filtered)
        res.status(200).json({success: true, data: filtered})
    }).catch(err=>console.error(err))
    // res.send("search recent tweets about this topic")
}

let getSingleTweetData = (req, res, next) => {
    let endpoint = `https://api.twitter.com/2/tweets/${req.params.id}`
    let params = {
        "user.fields": "created_at,description,name,username", // Edit optional query parameters here
        "tweet.fields": "author_id,context_annotations",
        "expansions": "attachments.media_keys",
        "media.fields": "url,preview_image_url",
    }
}

module.exports = {
    searchRecentTweetsAboutTopic,
    getTweetsFromAccount,
    getTweetsFromMultipleAccounts,
    getTweetsAboutTopic,
    getTweetsAboutMultipleTopics,
    getTopTwitterNews,
    getCurrentTrendingTweets
}