const express = require("express");
const { getTopTwitterNews, getCurrentTrendingTweets, getTweetsFromAccount, getTweetsAboutTopic, getTweetsFromMultipleAccounts, getTweetsAboutMultipleTopics } = require("../controllers/twitter");
let twitterRoutes = express();

twitterRoutes.get("/accounts/:name", getTweetsFromAccount)
twitterRoutes.get("/accounts/multiple/:names", getTweetsFromMultipleAccounts)

twitterRoutes.get("/topics/:name", getTweetsAboutTopic)
twitterRoutes.get("/topics/multiple/:names", getTweetsAboutMultipleTopics)

twitterRoutes.get("/top-news", getTopTwitterNews);
twitterRoutes.get("/trends", getCurrentTrendingTweets);

module.exports = twitterRoutes