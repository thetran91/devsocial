const express = require('express');
const router = express.Router();

// @route   GET api/profile/test
// desc     Test profile route
// @acess   Public route

router.get('/test', (req, res)=>{
    res.json({message: 'Profile route test worked!'});
})

module.exports = router;