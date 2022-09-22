let crypto = require("crypto");

let validatePassword = (password, hash, salt) => {
    let genHash = crypto.pbkdf2Sync(password, salt, 10001, 64, "sha512").toString();
    return hash === genHash
}

let genPassword = (password) => {
    let salt = crypto.randomBytes(24).toString("hex");
    let genHash = crypto.pbkdf2Sync(password, salt, 10001, 64, "sha512").toString();

    return {
        salt,
        hash: genHash
    }
}

module.exports = {
    validatePassword,
    genPassword
}