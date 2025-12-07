// imports =======================================================================================

const express = require('express')
const router = express.Router()

// ===============================================================================================

router.get('/sign-up', async (req, res) =>{
    // res.render('sign-up')
    res.send('SIGN UP ROUTE')
})

// exports ========================================================================================

module.exports = router