const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')
const { validate } = require('../middleware/users')

const excludeKeys = '-__v -password -admin -instructor'

router.get('/:userId', isLoggedIn, isSameUser, isAdmin, async (req, res, next) => {
    const status = 200
    const query = { instructor: false }
    const response = await User.find(query).select('first_name last_name email possible_score student_score')
    res.status(status).json({ response })
})

router.get('/:userId/min-value/:min/max-value/:max', isLoggedIn, isSameUser, isAdmin, async (req, res, next) => {
    const status = 200
    const {min, max} = req.params
    const query = { instructor: false, student_score: {$gt: min, $lt: max}}
    const response = await User.find(query).select('first_name last_name email possible_score student_score')
    res.status(status).json({ response })
})

router.get('/:userId/ungraded', isLoggedIn, isSameUser, isAdmin, async (req, res, next) => {
    const status = 200
    const {min, max} = req.params
    const query = { instructor: false, 'assignments.graded':false}
    const response = await User.find(query).select(excludeKeys)
    response.forEach(user => {
        user.assignments = user.assignments.filter(assignment=> assignment.graded === false)
    })
    res.status(status).json({ response })
})

router.get('/:userId/graded', isLoggedIn, isSameUser, isAdmin, async (req, res, next) => {
    const status = 200
    const {min, max} = req.params
    const query = { instructor: false, 'assignments.graded':true}
    const response = await User.find(query).select(excludeKeys)
    response.forEach(user => {
        user.assignments = user.assignments.filter(assignment=> assignment.graded === true)
    })
    res.status(status).json({ response })
})

module.exports = router