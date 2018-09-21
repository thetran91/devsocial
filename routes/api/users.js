const express = require('express');
const router = express.Router();

// @route   GET api/users/test
// desc     Test user route
// @acess   Public route

router.get('/test', (req, res)=>{
    res.json({message: 'Users route test worked!'});
})

module.exports = router;