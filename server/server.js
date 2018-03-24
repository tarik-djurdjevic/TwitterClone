var express=require('express');
var app=express();
var routes=require('./routes/routes');
var port=process.env.PORT || 3000;

app.use('/',routes);
app.use(express.static('./client'));


app.listen(port,(err) => {
	if(err)
		return console.log("Error occured",err);
    console.log("Listening on port : " + port);
});