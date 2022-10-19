const getAllUsers = (req, res, next) => {
    res.send("all users")
}

const getAnUser = (req, res, next) => {
    res.send("get user")
}

const registerUser = (req, res, next) => {
    res.send("register user")
}

const loginUser = (req, res, next) => {
    res.send("login user")
}

const updateUser = (req, res, next) => {
    res.send("update user")
}

const deleteUser = (req, res, next) => {
    res.send("delete user")
}

module.exports = {
    getAllUsers,
    getAnUser, 
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}