var pancake = require('../models/pancake');
// List of all pancakes

exports.pancake_list = async function(req, res) {
    try{
        thepancakes = await pancake.find();
    res.send(thepancakes);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific pancake.
exports.pancake_detail = async function(req, res) {
    console.log("detail"  + req.params.id) 
    try { 
        result = await pancake.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
};
// Handle pancake create on POST.
exports.pancake_create_post = async function(req, res) {
    console.log(req.body)
    let document = new pancake();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"pancake_type":"goat", "cost":12, "size":"large"}
    document.pancake_type = req.body.pancake_type;
    document.price = req.body.price;
    document.quantity = req.body.quantity;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// Handle pancake delete on DELETE.
exports.pancake_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await pancake.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };
// Handle pancake update form on PUT.
exports.pancake_update_put = async function(req, res) {
 //res.send('NOT IMPLEMENTED: pancake update PUT' + req.params.id);
 console.log(`update on id ${req.params.id} with body 
 ${JSON.stringify(req.body)}`) 
     try { 
         let toUpdate = await pancake.findById( req.params.id) 
         // Do updates of properties 
         if(req.body.pancake_type)  
            toUpdate.pancake_type = req.body.pancake_type; 
         if(req.body.price) 
            toUpdate.price = req.body.price; 
         if(req.body.quantity) 
            toUpdate.quantity = req.body.quantity; 
         let result = await toUpdate.save(); 
         console.log("Sucess " + result) 
         res.send(result) 
     } catch (err) { 
         res.status(500) 
         res.send(`{"error": ${err}: Update for id ${req.params.id} 
 failed`); 
     } 

};
exports.pancake_view_all_Page = async function(req, res) {
    try{
    thepancakes = await pancake.find();
    res.render('pancakes', { title: 'pancake Search Results', results: thepancakes });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   }; 

   // Handle a show one view with id specified by query 
exports.pancake_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await pancake.findById( req.query.id) 
        res.render('pancakedetail',  
{ title: 'pancake Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for creating a pancake. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.pancake_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('pancakecreate', { title: 'pancake Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 


// Handle building the view for updating a pancake. 
// query provides the id 
exports.pancake_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await pancake.findById(req.query.id) 
        res.render('pancakeupdate', { title: 'pancake Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.pancake_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await pancake.findById(req.query.id) 
        res.render('pancakedelete', { title: 'pancake Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 
