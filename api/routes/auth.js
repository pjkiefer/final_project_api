const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { decodeToken, generateToken } = require('../lib/token')

const excludeKeys = '-__v -password -admin -instructor'

router.get('/profile', async (req, res, next) => {
  try {
    const payload = decodeToken(req.token)
    const user = await User.findOne({ _id: payload.id }).select('-__v -password')

    const status = 200
    res.json({ status, user })
  } catch (e) {
    console.error(e)
    const error = new Error('You are not authorized to access this route.')
    error.status = 401
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
    const { email, password, first_name, last_name } = req.body
    const rounds = 10
    const hashed = await bcrypt.hash(password, rounds)
  
    const alreadyExists = await User.findOne({ email })
    if (alreadyExists) {
      const error = new Error(`Email '${email}' is already taken.`)
      error.status = 400
  
      return next(error)
    }
  
    try{
    const status = 201
    const user = await User.create({ email, first_name, last_name, password: hashed, admin: false })
    const token = generateToken(user._id)
    
    res.status(status).json({status, token: token, id: user._id})
    }catch(e){
        
        const error = new Error(`Validation failed - ${e.message}`)
        error.status = 400
        next(error)
    }
  })

  router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      const valid = await bcrypt.compare(password, user.password)
      if (valid) {
        const status = 200
        const response = 'You have successful logged in.'
        const token = generateToken(user._id)
        return res.status(status).json({status, response, token, id:user._id, admin:user.admin })
      }
    }
  
    const message = `Username or password incorrect. Please check credentials and try again.`
    const error = Error(message)
    error.status = 401
    next(error)
  })
  
  module.exports = router
  