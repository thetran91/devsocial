const express = require('express');
const router = express.Router();

// @route   GET api/posts/test
// desc     Test post route
// @acess   Public route

router.get('/test', (req, res)=>{
    res.json({message: 'Posts route test worked!'});
})

module.exports = router;