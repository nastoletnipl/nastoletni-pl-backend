const User = require("../models/user"),
      Category    = require("../models/categories");

let userId = "";

module.exports = {

    isAuthorized : (req,res,next) => {

         if ( req.isAuthenticated()) {
             return next();
         } 


         res.redirect("/logowanie")  
         req.flash("errorMsg", " Nie posiadasz uprawnień do przeglądania tej strony")  
            
    },

    sendAuthentication : (req,res,next) => {

        if (!req.isAuthenticated()) {
             return  next();
        }
        
        let category;
      
        Category.find()
    
             .then( cat => {    
    
                 category = cat
    
                 res.render("index", {
    
                     isAuthenticated:req.user,
                     title:" Strona główna",
                     csrfToken: req.csrfToken(),
                     categories:category
           
                });
    
             })
    
             .catch(err => {           
    
                const error                = new Error(err);
                      error.httpStatusCode = 500;
        
                 return next(error);
             });

         userId = req.user._id

    },

    isAdmin : (req,res,next) => {


        if(req.user.isAdmin === true){
            return next();
        } else {
            res.redirect('/')
        }

    }

}