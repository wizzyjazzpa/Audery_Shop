
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./server/config/db');
require ('dotenv').config();




const app = express();
const port =  process.env.PORT
connectDB();

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//calling Static Files
app.use(express.static('public'));
app.set('view engine','ejs');


app.use ('/',require('./server/routes/routePages'));
app.use('/api',require('./server/routes/api_router'));
app.use((req,res,next)=>{
    
    locals={
        title:"404"
    }
    res.render('userPages/404',locals)
    //res.render('pages/app-404',{locals})
})


app.listen(port,()=>{
     console.log(`Audrey's Application Listening to http://localhost:${port}`);
})