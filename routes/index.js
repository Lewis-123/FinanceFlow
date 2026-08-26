var express = require('express');

var router = express.Router();

const auth = require("../middleware/auth");

const Transaction = require("../models/Transaction");



router.get('/', function(req, res, next) {


    res.render('index');


});




// Dashboard

router.get('/dashboard', auth, async function(req,res,next){


    try{


        const transactions = await Transaction.find({

            user: req.session.user.id

        })
        .sort({

            date: -1

        });



        res.render(
            "dashboard",
            {

                user: req.session.user,

                transactions

            }
        );



    }catch(error){


        console.log(error);

        res.send("Dashboard error");


    }


});



module.exports = router;