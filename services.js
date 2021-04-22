const MongoClient = require("mongodb").MongoClient;

const dbURL = process.env.DB_URI || "mongodb://localhost";


//Service Listeners  
var service = function(app){
    
//Buy Now Button(Memberships page)
app.post('/membershipsRecord', function(req, res){
   var accD = new Date();
    var accID = "acc" + accD.getTime();
    
    console.log(accID);
    var accData = {
        accId: accID, membershipType: req.query.membershipType
    }
    
   MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
       if(err){
           return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
       }
       else{
           var dbo = client.db("Account");
           
           dbo.collection("memberships").insertOne(accData,function(err){
               if(err){
                   client.close();
                   return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
               }
               else{
                   client.close();
                   return res.status(200).send(JSON.stringify({msg: "SUCCESS", accId: accID}));
               }
           });
       }
   });
    
});
    
    
//SignUp
app.put('/signUpRecord', function(req, res){
   var accID = req.body.accId;
   var name = req.body.name;
   var address = req.body.address;
   var email = req.body.email;
   var birthday = req.body.birthday;
   var height = req.body.height;
   var weight = req.body.weight;
   var uName = req.body.uName;
   var password = req.body.password;

    console.log(name);
    console.log(uName);
    console.log(accID);
    
    var search = {accId: accID};
    var signUpData = {
        $set: {
            "name": name,
            "address": address,
            "email": email,
            "birthday": birthday,
            "height": height,
            "weight": weight,
            "uName": uName,
            "password": password
        }
    }
   
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
        }
        else{
            var dbo = client.db("Account");
            
            dbo.collection("memberships").updateOne(search, signUpData, function(err){
               if(err){
                    client.close();
                    return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                }
                else{
                    client.close();
                    return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));
                }
            });
        }
    });
    
});

//pDoneButton(Plan-loginHome)
app.put('/pDoneRecord', function(req, res){
    var accID = req.query.accId;
    var planRecord = req.query.planRecord;
    
    var search = {accId: accID};
    var planData ={
        $set: {
            workoutPlan: planRecord
        }
    }
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
            if(err){
               return res.status(200).send(JSON.stringify({msg:"Error: " + err})); 
            }
            else{
               var dbo = client.db("Account");
                
                dbo.collection("memberships").updateOne(search, planData, function(err){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                       return res.status(200).send(JSON.stringify({msg:"SUCCESS"})); 
                    }
                });
            }
        });
}); 
    
    
//Workoutplan update button
app.put('/planUpdateRecord', function(req, res){
    var accID = req.query.accId;
    var planRecord = req.query.planRecord;
    
    var search = {accId: accID};
    var planUpdateData ={
        $push: {
            workoutPlan: planRecord
        }
    }
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
            if(err){
               return res.status(200).send(JSON.stringify({msg:"Error: " + err})); 
            }
            else{
               var dbo = client.db("Account");
                
                dbo.collection("memberships").updateOne(search, planUpdateData, function(err){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                       return res.status(200).send(JSON.stringify({msg:"SUCCESS"})); 
                    }
                });
            }
        });
});
        
       
//submitButton-signupforClasses-loginHome
app.put('/cSubmitRecord', function(req, res){
    var accID = req.query.accId;
    var classRecord = req.query.classRecord
    
    
    var search = {accId: accID};
    var classesData = {
        $push: {
            signUpClasses: classRecord
        }
    }
    
    
     MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
            if(err){
               return res.status(200).send(JSON.stringify({msg:"Error: " + err})); 
            }
            else{
               var dbo = client.db("Account");
                
                dbo.collection("memberships").updateOne(search, classesData, function(err){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                       return res.status(200).send(JSON.stringify({msg:"SUCCESS"})); 
                    }
                });
            }
        });
});

//Meals Next Button
app.put('/nextDRRecord', function(req, res){
    var accID = req.query.accId;
    var dietType = req.query.dietType;
    
    var search = {accId: accID};
    var dietTypeData = {
        $set: {
            "dietType": dietType
        }
    }
    
     MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
            if(err){
               return res.status(200).send(JSON.stringify({msg:"Error: " + err})); 
            }
            else{
               var dbo = client.db("Account");
                
                dbo.collection("memberships").updateOne(search, dietTypeData, function(err){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                       return res.status(200).send(JSON.stringify({msg:"SUCCESS"})); 
                    }
                });
            }
        });
    
});
    
//dRDoneButton(Dietary Restrictions-Meals)
app.put('/dRDoneRecord', function(req, res){
    var accID = req.query.accId;
    var otherFoods = JSON.parse(req.query.otherFoods);
    var dRFoods = JSON.parse(req.query.dRFoods);
   // var type = parseInt(req.query.type);
    console.log("arraylength=" + dRFoods.length);
    console.log("arraylengthOther=" + otherFoods.length);
    var search = {accId: accID};
    
    if(dRFoods.length > 0 && otherFoods.length > 0){
         var dRFoodsData = {
        $addToSet: {
            "dRFoods": {$each:  dRFoods},
            "otherFoods": {$each:  otherFoods}
        }
    }
    }
    else if(dRFoods.length > 0 ) {
         var dRFoodsData = {
        $addToSet: {
            "dRFoods": {$each:  dRFoods}
        }
    }
    }
    else if(otherFoods.length > 0){
         var dRFoodsData = {
        $addToSet: {
            "otherFoods": {$each:  otherFoods}
        }
    }
    }
    else{
        return res.status(200).send(JSON.stringify({msg:"Error: " + "No foods were selected"}));
    }
    
   console.log(dRFoodsData);
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
            if(err){
               return res.status(200).send(JSON.stringify({msg:"Error: " + err})); 
            }
            else{
               var dbo = client.db("Account");
                
                dbo.collection("memberships").updateOne(search, dRFoodsData, function(err){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                       return res.status(200).send(JSON.stringify({msg:"SUCCESS"})); 
                    }
                });
            }
        });
    
});

//updateButton(Dietary Restrictions-Meals)
app.put('/dRUpdateRecord', function(req, res){
    var accID = req.query.accId;
    var addFoods = req.query.addFoods;
    var type = parseInt(req.query.type);
    
    var search = {accId: accID};
    
    if(type===1){
         var dRFoodsData = {
        $addToSet: {
            "dRFoods": addFoods
        }
    }
    }
    else{
         var dRFoodsData = {
        $addToSet: {
            "otherFoods": addFoods
        }
    }
    }
    
   
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
            if(err){
               return res.status(200).send(JSON.stringify({msg:"Error: " + err})); 
            }
            else{
               var dbo = client.db("Account");
                
                dbo.collection("memberships").updateOne(search, dRFoodsData, function(err){
                    if(err){
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                    }
                    else{
                        client.close();
                       return res.status(200).send(JSON.stringify({msg:"SUCCESS"})); 
                    }
                });
            }
        });
    
});


    
//Delete Foods from Meal Plan
app.put('/deleteFoodsRecord', function(req, res){
   var accID = req.query.accId;
    var deletedDR = JSON.parse(req.query.deletedDR);
    var deletedOther = JSON.parse(req.query.deletedOther);
    var search = {accId: accID};
    
    console.log("deleted dR" + deletedDR.length);
    console.log(deletedDR);
    console.log(search);
    console.log(deletedOther);
    var deleteFoodsData = {
        $pull: {
            dRFoods: {$in: deletedDR}, otherFoods: {$in: deletedOther}
        }
    }
     MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
        }
        else{
            var dbo = client.db("Account");
            
            dbo.collection("memberships").updateOne(search,deleteFoodsData, function(err){
                if(err){
                    return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                }
                else{
                    client.close();
                    return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));
                }
            });
        }
    });
});
    
//View Account Info
app.get('/readAccountRecord', function(req, res){
    var accID = req.query.accId;
    
    var search = {accId: accID};
     MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
        }
        else{
            var dbo = client.db("Account");
            
            dbo.collection("memberships").findOne(search, function(err, accData){
              if(err){
                  return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
              }
                else{
                  client.close();
                  return res.status(200).send(JSON.stringify({msg:"SUCCESS", accountsData: accData}));
              }  
            });
        }
    });
});
    

//Settings Update Button
app.put('/updateRecord', function(req, res){
    var accID = req.query.accId;
    var name = req.query.name;
    var address = req.query.address;
    var email = req.query.email;
    var weight = req.query.weight;
    var uName = req.query.uName;
    var password = req.query.password;
    
    console.log(weight);
    var search = {accId: accID};
    var settingsData = {
        $set: {
            name: name,
            address: address,
            email: email,
            weight: weight,
            uName: uName,
            password: password
    }
    };
    
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
        }
        else{
            var dbo = client.db("Account");
            
            dbo.collection("memberships").updateOne(search, settingsData, function(err){
                if(err){
                    client.close();
                    return res.status(200).send(JSON.stringify({msg: "Error: " + err}));
                }
                else{
                    client.close();
                    return res.status(200).send(JSON.stringify({msg: "SUCCESS"}));
                }
            });
        }
    });
    
});
    

//Delete Button(settings)
app.delete('/deleteRecord', function(req, res){
    var accID = req.query.accId;
    
    var search = {accId: accID};
    console.log(search);
    MongoClient.connect(dbURL, {useUnifiedTopology: true}, function(err, client){
        if(err){
            return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
        }
        else{
            var dbo = client.db("Account");
            
            dbo.collection("memberships").deleteOne(search, function(err){
                if(err){
                    return res.status(200).send(JSON.stringify({msg:"Error: " + err}));
                }
                else{
                    client.close();
                    return res.status(200).send(JSON.stringify({msg:"SUCCESS"}));
                }
            });
        }
    });
    
  
});
    
};
module.exports = service;