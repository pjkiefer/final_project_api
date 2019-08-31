const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')
const { validate } = require('../middleware/users')

const excludeKeys = '-__v -password -admin -instructor'



router.get('/', isLoggedIn, async (req, res, next) => {
    const status = 200
    const query = { instructor: false }
    const response = await User.find(query).select(excludeKeys)
    res.status(status).json({ status, response })
})

router.get('/all', isLoggedIn, async (req, res, next) => {
    const status = 200
    const query = { instructor: false }
    const response = await User.find(query).select('first_name last_name email -_id')
    res.status(status).json({ status, response })
})

router.get('/:userId', isLoggedIn, async (req, res, next) => {
    const status = 200
    const response = await User.findById(req.params.userId).select(excludeKeys)
    res.status(status).json({ response })
})



module.exports = router