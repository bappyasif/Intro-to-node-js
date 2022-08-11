var express = require('express');
var router = express.Router();

// some messages
const messages = [
  {
    text: "Hi there!",
    user: "Amanda",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: "Mini Messageboard", messages: messages })
});

/* Get Form page. */
router.get("/new", (req, res, next) => {
  res.render("form")
})

/* Post Form page. */
router.post("/new", (req, res, next) => {
  let formData = req.body
  // console.log(formData)
  messages.push({text: formData.msgText, user: formData.name, added: new Date()})
  // console.log(messages)
  // res.render("form")
  res.redirect("/")
})

module.exports = router;

/**
 * 
 * 
 <% msgs.forEach(item => { %>
      <ul>
        <li><%= item.user %> </li>
        <li><%= item.text %> </li>
        <li><%= item.date %> </li>
      </ul>
    <% }) %> 
 */