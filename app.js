const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
	
});

app.post("/", function(req, res){
	console.log(req.body.cityName);
	
	const query= req.body.cityName;
	const apiKey="a52d5c7c6c92561dd18baf45c261998f";
	const unit = "metric";
	const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" +unit;
		
	https.get(url, function(response){
		console.log(response.statusCode);
		
		response.on("data", function(data){
			const weatherData = JSON.parse(data)
			const temp= weatherData.main.temp   
			const weather= weatherData.weather[0].description  
			const icon= weatherData.weather[0].icon
			const imageURL= "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
				
			res.write("<p> the weather is <h3>" + weather + "</h3></p>");
			res.write("<h1> The temp in "+ req.body.cityName + "is  "+ temp + "   hblg </h1>");
			res.write("<img src=" +imageURL+ ">");
			res.send()
		})
	})

	
});
	
	

app.listen(3000, function(){
	console.log("Server is running in 3000  ");
});