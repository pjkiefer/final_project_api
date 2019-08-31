const router = require('express').Router({ mergeParams: true })
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')
const { validate } = require('../middleware/users')


router.post('/', isLoggedIn, isSameUser, async (req, res, next) => {

    try {
        const status = 201

        const { userId } = req.params
        const query = { _id: userId }
        const user = await User.findOne(query)

        user.assignments.push(req.body)
        await user.save()

        const assignment = user.assignments[user.assignments.length - 1]
        res.status(status).json({ status, response: assignment})
    } catch (e) {
        console.log(e.message)
        const error = Error(message)
        error.status = 500
        next(error)
    }
})

router.delete('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {

    try {
        const status = 200
        const { userId, assignmentId } = req.params
        console.log(`userId: ${userId} and assignmentId: ${assignmentId}`)
        const user = await User.findById(userId)
        user.assignments = user.assignments.filter(assign => assign.id !== assignmentId)
        await user.save()
        res.status(status).json({status, user })
    } catch (e) {
        const message = `${e.message}`
        const error = Error(message)
        error.status = 401
        next(error)
    }
})

router.put('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {

    try {
        const status = 200
        const { userId, assignmentId } = req.params
        console.log(`userId: ${userId} and assignmentId: ${assignmentId}`)
        const user = await User.findById(userId)
        const assignment = user.assignments.id(assignmentId)
        const {assignment_title, project_link, description} = req.body
        assignment.assignment_title = assignment_title
        assignment.project_link = project_link
        assignment.description = description
        await user.save()
        res.status(status).json({ status, user })
    } catch (e) {
        const message = `${e.message}`
        const error = Error(message)
        error.status = 401
        next(error)
    }
})



module.exports = router