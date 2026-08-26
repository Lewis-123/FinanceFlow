const express = require("express");

const router = express.Router();


const auth = require("../middleware/auth");

const Transaction = require("../models/Transaction");



// ==================================
// View All Transactions
// ==================================

router.get('/', auth, async function(req, res){


    try {


        const transactions = await Transaction.find({

            user: req.session.user.id

        })
        .sort({

            date: -1

        });



        res.render(

            "transactions",

            {

                transactions,

                user: req.session.user

            }

        );



    } catch(error){


        console.log(error);

        res.send("Unable to load transactions");


    }


});




// ==================================
// Add Transaction Page
// ==================================

router.get('/add', auth, function(req,res){


    res.render("add_transaction");


});




// ==================================
// Create Transaction
// ==================================

router.post('/add', auth, async function(req,res){


    try{


        const {

            title,

            amount,

            type,

            category,

            date


        } = req.body;




        const transaction = new Transaction({


            user:req.session.user.id,

            title,

            amount,

            type,

            category,

            date



        });



        await transaction.save();



        res.redirect("/transactions");



    }catch(error){


        console.log(error);

        res.send("Transaction creation failed");


    }


});





// ==================================
// Edit Transaction Page
// ==================================

router.get('/edit/:id', auth, async function(req,res){


    try{


        const transaction = await Transaction.findOne({

            _id:req.params.id,

            user:req.session.user.id

        });



        res.render(

            "edit_transaction",

            {

                transaction

            }

        );



    }catch(error){


        console.log(error);

        res.send("Unable to edit transaction");


    }


});





// ==================================
// Update Transaction
// ==================================

router.post('/edit/:id', auth, async function(req,res){


    try{


        await Transaction.findOneAndUpdate(

            {

                _id:req.params.id,

                user:req.session.user.id

            },


            {

                title:req.body.title,

                amount:req.body.amount,

                type:req.body.type,

                category:req.body.category,

                date:req.body.date

            }


        );



        res.redirect("/transactions");



    }catch(error){


        console.log(error);

        res.send("Update failed");


    }


});





// ==================================
// Delete Transaction
// ==================================

router.get('/delete/:id', auth, async function(req,res){


    try{


        await Transaction.findOneAndDelete({

            _id:req.params.id,

            user:req.session.user.id

        });



        res.redirect("/transactions");



    }catch(error){


        console.log(error);

        res.send("Delete failed");


    }


});





module.exports = router;