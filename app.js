const express=require('express');
const https=require('https');
const app=express();
 const bodyParser=require("body-parser");

 app.use(bodyParser.urlencoded({extended: true}));

app.listen(2001,function(req,res){

  console.log("server started at port 2001..")

});

app.get('/',function(req,res){

    res.sendFile(__dirname+"/index.html"); 
   
});

app.post('/',function(req,res){
var query=req.body.cityName;
var apiKey="f71331c2b893cc246372d1cad6aa4f6d";
var unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+ "&units="+unit +"&appid="+apiKey;

https.get(url,function(response){

    //console.log(response.statusCode);

    response.on("data",function(data){
    
    const weatherdata=   JSON.parse(data);

   //  console.log(weatherdata);
    
     const temp=weatherdata.main.temp;
    
   //  console.log(temp); 
    
     //console.log(weatherdata.weather[0].description);
    
     res.write("<p>The weather is currently </p>"+weatherdata.weather[0].description);
    
     res.write("<h1>the Temperature in "+weatherdata.name+' is '+weatherdata.main.temp+' degree Celcius</h1>');
      
    const icon=weatherdata.weather[0].icon;
    const imageURL="https://api.openweathermap.org/img/wn/"+icon+"@2x.png"

    res.write("<img src="+imageURL+">");
    res.send();
    });

});
})


