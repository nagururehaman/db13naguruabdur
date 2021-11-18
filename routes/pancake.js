var express = require('express');
const pancake_controlers= require('../controller/pancake');
var router = express.Router();
/* GET pancakes */
router.get('/', pancake_controlers.pancake_view_all_Page );
router.get('/pancakes/:id', pancake_controlers.pancake_detail); 
// PUT request to update pancake.
router.put('/pancakes/:id',pancake_controlers.pancake_update_put);
/* GET detail pancake page */ 
router.get('/detail', pancake_controlers.pancake_view_one_Page); 
 
module.exports = router;
