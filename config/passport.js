const GitHubStrategy = require("passport-github2").Strategy;

const User = require("../models/User");



module.exports = function(passport){



passport.use(

new GitHubStrategy(

{


clientID: process.env.GITHUB_CLIENT_ID,


clientSecret: process.env.GITHUB_CLIENT_SECRET,


callbackURL:

"http://localhost:3000/users/github/callback"


},



async function(

accessToken,

refreshToken,

profile,

done

){



try{


let user = await User.findOne({

githubId: profile.id

});



if(user){


return done(null,user);


}





user = new User({

username: profile.username,

email:

profile.emails 
? profile.emails[0].value 
: profile.username + "@github.com",

password:"github",

githubId:profile.id


});




await user.save();



done(null,user);



}catch(error){


done(error,null);


}



}



)

);



passport.serializeUser(

(user,done)=>{

done(null,user.id);

}

);



passport.deserializeUser(

async(id,done)=>{


const user = await User.findById(id);


done(null,user);


}

);



};
