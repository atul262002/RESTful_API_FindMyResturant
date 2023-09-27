const resturantcontroller=require("../controller/resturant.controller");

module.exports=function(app){
   app.post("/api/resturant/add",resturantcontroller.addresturant);
   app.get("/api/resturant",resturantcontroller.getallresturant);
   app.get("/api/resturant/categories",resturantcontroller.getcategories);
   app.get("/api/resturant/categories/:categoryname",resturantcontroller.fetchingdineinortakeout);
   app.get("/api/resturant/:id",resturantcontroller.getresturantbyid);
   app.get("/api/resturant/rating/:ratingvalue",resturantcontroller.resturantbyrating);
   app.put("/api/resturant/:id",resturantcontroller.updateresturant);
   app.delete("/api/resturant/:id",resturantcontroller.deletearesturant);
   app.delete("/api/resturant/",resturantcontroller.deleteallresturant);
}