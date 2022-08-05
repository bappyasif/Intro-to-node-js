let express = require("express");
const members = require("../../Members");

let router = express.Router();

// all memebers
router.get("/", (req, res) => {
    console.table(members)
    res.json(members)
})

// single member
router.get("/:id", (req, res) => {
    let findMember = members.filter(item => item.id === parseInt(req.params.id))
    if(findMember.length) {
        res.json(findMember)
    } else {
        res.status(400).json({msg: `member is not found with an id of ${req.params.id}!!`})
    }    
})

// create member
router.post("/", (req, res) => {
    let newMember = {
        id: members.length+1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.json({msg: "no name or email is found"})
    }

    members.push(newMember)
    res.json(members);
    // res.redirect("/")
})

// update member
router.put("/:id", (req, res) => {
    let findMember = members.filter(item => item.id === parseInt(req.params.id))
    if(findMember.length) {
        let updateMember = req.body;
        members.forEach(item => {
            if(item.id === parseInt(req.params.id)) {
                item.name = updateMember.name ? updateMember.name : item.name;
                item.email = updateMember.name ? updateMember.email : item.email
            }

            res.json({msg: 'member updated', member: item})
        })
    } else {
        res.status(400).json({msg: `member is not found with an id of ${req.params.id}!!`})
    }
})

// delete member
router.delete("/:id", (req, res) => {
    let findMember = members.filter(item => item.id === parseInt(req.params.id))
    
    let filterMember = members.filter(item => item.id !== parseInt(req.params.id))

    if(findMember.length) {
        res.json({msg: "member delted", members: filterMember})
    } else {
        res.status(400).json({msg: `member is not found with an id of ${req.params.id}!!`})
    }    
})

module.exports = router