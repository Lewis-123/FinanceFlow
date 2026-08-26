const express = require('express');

const router = express.Router();


const auth = require("../middleware/auth");

const Transaction = require("../models/Transaction");




// ==================================
// Home Page
// ==================================

router.get('/', function(req, res, next) {


    res.render('index');


});




// ==================================
// Dashboard Analytics
// ==================================

router.get('/dashboard', auth, async function(req,res,next){


    try {



        const transactions = await Transaction.find({

            user:req.session.user.id

        })
        .sort({

            date:-1

        });




        let income = 0;

        let expenses = 0;



        transactions.forEach(transaction => {


            if(transaction.type === "income"){

                income += Number(transaction.amount);

            }


            else if(transaction.type === "expense"){


                expenses += Number(transaction.amount);


            }


        });




        const balance = income - expenses;





        res.render(

            "dashboard",

            {


                user:req.session.user,


                transactions,


                income,


                expenses,


                balance,


                totalTransactions: transactions.length



            }

        );




    }catch(error){


        console.log(error);

        res.send("Dashboard error");


    }


});





module.exports = router;