var express = require('express');
const pancake_controlers= require('../controller/pancake');
var router = express.Router();
/* GET costumes */
router.get('/', pancake_controlers.pancake_view_all_Page );
router.get('/pancakes/:id', pancake_controlers.pancake_detail); 
// PUT request to update pancake.
router.put('/pancakes/:id',pancake_controlers.pancake_update_put);
module.exports = router;