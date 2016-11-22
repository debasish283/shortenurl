var router = require('express').Router();
var wrapper = require('../server/wrapper');

router.get('/', wrapper.home);
router.post('/api/shorten', wrapper.shorten);
router.get('/:encoded_id', wrapper.encodedId);

module.exports = router;