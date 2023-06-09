const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const {getUserByEmail} = require('../models/user')
const isPasswordValid = (password, hash) => bcrypt.compareSync(password, hash)


router.get('/session', (req, res) => {
    const {user} = req.session
    if (!user){
      return res.status(401).json({message: 'not logged in'})
    }
    res.json({user})
})

router.post('/session', (req, res, next)=> {
    const {email, password} = req.body
    console.log('recieved body :', {email, password})

    return getUserByEmail(email)
        .then(user => {
            if (user && isPasswordValid(password, user.password_hash)) {
                console.log(user)
                delete user.password_hash
                req.session.user = user
                return res.json({ user })
            }
            const err = new Error('Invalid email or password')
            err.status = 400
            throw err   
        
        })
        .catch(err => {
            next(err)
        })
        

})

router.delete('/session', (req, res) => {
    req.session.destroy(() => {
        res.json({
            message: 'logged out'
        })
    })
})


module.exports = router