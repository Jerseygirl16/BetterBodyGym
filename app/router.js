const path = require("path");


//Router Listeners
var router = function(app){
//home
app.get('/home', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/index.html'));
});
    
//shop
app.get('/shop', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/shop.html'));
});
    
//memberTools
app.get('/memTools', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/memberTools.html'));
});

//memberLogin
app.get('/memberLogin', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/memberLogin.html'));
});

//signUp
app.get('/signUp', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/signUp.html'));
});

//
app.get('/memberships', function(req,res){
    res.status(200).sendFile(path.join(__dirname + '/../client/memberships.html'));
});
    
//career
app.get('/career', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/career.html'));
});

//settings
app.get('/settings', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/settings.html'));
});

//loginHome
app.get('/loginHome', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/loginHome.html'));
});

//Meals
app.get('/meals', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/meals.html'));
});
    
//buynow
app.get('/buynow', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/buynow.html'));
});  
    
//mealCategories
app.get('/mealCategories', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/mealCategories.html'));
});

//MemberTools
app.get('/memberTools', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/memberTools.html'));
});

//MealPlan
app.get('/mealPlan', function(req, res){
    res.status(200).sendFile(path.join(__dirname + '/../client/mealPlan.html'));
});
    
}
module.exports = router;