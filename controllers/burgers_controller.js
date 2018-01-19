var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.

var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burger: data
        };
        console.log("hbsObject " + JSON.stringify(hbsObject));
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function() {

      // Send back the ID of the new quote, need to use res.redirect to make it work
        
      res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("put condition ", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});

router.delete("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("delete condition ", condition);

    burger.delete(condition, function() {
        res.redirect("/");
    });
});

// Export router

module.exports = router;