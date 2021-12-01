var express = require('express');
const pancake_controlers= require('../controller/pancake');
var router = express.Router();

// A little function to check if we have an authorized user and continue on 
//or 
// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 

/* GET pancakes */
router.get('/', pancake_controlers.pancake_view_all_Page );
router.get('/pancakes/:id', pancake_controlers.pancake_detail); 
// PUT request to update pancake.
router.put('/pancakes/:id',pancake_controlers.pancake_update_put);
/* GET detail pancake page */ 
router.get('/detail', pancake_controlers.pancake_view_one_Page); 
/* GET create pancake page */ 
router.get('/create',secured, pancake_controlers.pancake_create_Page); 
/* GET create update page */ 
router.get('/update',secured, pancake_controlers.pancake_update_Page); 
 /* GET create pancake page */ 
 router.get('/delete',secured, pancake_controlers.pancake_delete_Page); 

module.exports = router;
