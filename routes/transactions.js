const express = require("express");

const router = express.Router();


const auth = require("../middleware/auth");

const Transaction = require("../models/Transaction");



// ==================================
// Add Transaction Page
// ==================================

router.get('/add', auth, function(req, res){


    res.render('add_transaction');


});





// ==================================
// Create Transaction
// ==================================

router.post('/add', auth, async function(req, res){


    try {


        const {

            title,

            amount,

            type,

            category,

            date


        } = req.body;




        const transaction = new Transaction({


            user: req.session.user.id,


            title: title,


            amount: amount,


            type: type,


            category: category,


            date: date || Date.now()



        });




        await transaction.save();




        res.redirect('/dashboard');




    } catch(error){


        console.log(error);

        res.send("Unable to save transaction");


    }


});





module.exports = router;
