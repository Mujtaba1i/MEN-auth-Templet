const express = require('express')
const router = express.Router()

router.get('/sign-up', async (req, res) =>{
    res.send('SIGN UP ROUTE')
})

module.exports = router;