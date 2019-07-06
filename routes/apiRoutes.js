var db = require("../models");
var axios = require("axios")

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    var queryURL = "http://api.carmd.com/v3.0/maint?year=1998&make=toyota&model=camrey&mileage=123456"
    console.log(queryURL);
 
    axios.get({
        url: "http://api.carmd.com/v3.0/maint?year=1998&make=toyota&model=camrey&mileage=123456",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic YWZkZTNhMzktYmYxYy00YTcyLWEyMGItMGY5NWUzZmNiODM2",
            "Partner-Token": "803f8ca0031f4691aa0ff652d94ad778"
        }
        
    }).then(function(response) {
        console.log(response)
        // Creating an object to store the data
        var maintenanceData = {};
        // An array to store all the data properties
        maintenanceData.maintenanceServices = [];
        var res = response.data.data
 
        for (var i = 0; i < res.length; i++) {
                maintenanceServiceItem = {};
                maintenanceServiceItem.description = res[i].desc;
                maintenanceServiceItem.dueMileage = res[i].due_mileage;
                maintenanceServiceItem.totalCost = res[i].repair.total_cost, res[i].repair_difficulty, res[i].repair.repair_hours;
                maintenanceServiceItem.parts = res[i].parts.desc, res[i].parts.price, res[i].parts.qty
                maintenanceServiceItem.completed = false;
                maintenanceData.maintenanceServices.push(maintenanceServiceItem);
            }
            console.log(maintenanceData);
    })
    .catch(function(err) {
        console.log(err.message, "No available maintenance! ")
    })
     res.send("hello")
    
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
