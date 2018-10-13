const express = require('express');

const router = express.Router();

// @route:  /api/posts/test 
// Desc:   Test post get
// Access: Public  

router.get('/', (req, res, err) => {
    res.json({
        Router: 'Posts'
    });

});


module.exports = router;