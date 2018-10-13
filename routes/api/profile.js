const express = require('express');

const router = express.Router();

// @route:  /api/profile/test 
// Desc:   Test profile get
// Access: Public  

router.get('/test', (req, res) => {
    res.json({
        Router: 'Profile'
    });
});

module.exports = router;