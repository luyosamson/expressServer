const express = require('express');
const router = express.Router();
const path = require('path');

// Matches /subdir/ or /subdir/index(.html)
router.get(['/', '/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

// Matches /subdir/test(.html)
router.get(['/test', '/test.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

module.exports = router;
