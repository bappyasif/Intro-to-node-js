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
  res.render('index', { title: "Mini Messageboard", msgs: 'messages' })
});

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