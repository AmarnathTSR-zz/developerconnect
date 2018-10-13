const express = require('express');

const router = express.Router();

// @route:  /api/users/test 
// Desc:   Test users get
// Access: Public  

router.get('/test', (req, res) => {
    res.json({
        Router: 'users'
    });
});

module.exports = router;