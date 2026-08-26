const express = require('express');

const router = express.Router();


const bcrypt = require('bcryptjs');


const passport = require('passport');


const User = require('../models/User');





// ===============================
// Register Page
// ===============================

router.get('/register', function(req,res){

    res.render('register');

});






// ===============================
// Register User
// ===============================

router.post('/register', async function(req,res){


try{


const {

username,

email,

password


}=req.body;



const existingUser = await User.findOne({

email

});



if(existingUser){

return res.send("User already exists");

}



const hashedPassword = await bcrypt.hash(

password,

10

);



const user = new User({

username,

email,

password:hashedPassword


});



await user.save();



res.redirect('/users/login');



}catch(error){


console.log(error);

res.send("Registration error");


}



});








// ===============================
// Login Page
// ===============================


router.get('/login', function(req,res){


res.render('login');


});








// ===============================
// Local Login
// ===============================


router.post('/login', async function(req,res){



try{


const user = await User.findOne({

email:req.body.email

});



if(!user){

return res.send("Invalid login");

}




const match = await bcrypt.compare(

req.body.password,

user.password

);



if(!match){

return res.send("Invalid login");

}



req.session.user={


id:user._id,

username:user.username,

email:user.email


};



res.redirect('/dashboard');



}catch(error){


console.log(error);

res.send("Login error");


}



});









// ===============================
// GitHub Authentication
// ===============================


router.get(

'/github',

passport.authenticate(

'github',

{

scope:['user:email']

}

)

);







router.get(

'/github/callback',

passport.authenticate(

'github',

{

failureRedirect:'/users/login'

}

),



function(req,res){


req.session.user={


id:req.user._id,


username:req.user.username,


email:req.user.email



};



res.redirect('/dashboard');


}



);







// ===============================
// Logout
// ===============================


router.get('/logout',function(req,res){



req.logout(function(){


res.redirect('/');


});



});







module.exports = router;