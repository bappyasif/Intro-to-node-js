const { check, validationResult } = require('express-validator');

// validation rules
const authValidation = [
    check("id", "user name must be of 2 characters long").isLength({ min: 2 }).trim().escape(),
    check("password", "user password must be of 2 characters long").isLength({ min: 2 }).trim().escape(),
]

const throwErrorWhenValidationHasFailed = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "validation errors", errors: errors.array() })
    } else {
        next()
    }
}

module.exports = {
    authValidation,
    throwErrorWhenValidationHasFailed
}

