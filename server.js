const express=require('express') 
const app=express();
const path = require('path');
const {logger}=require('./middleware/logEvents')
const errorHandlers=require('./middleware/errorHandler')


const cors=require('cors')
const PORT = process.env.PORT || 3500;

    //Custom Middleware logger
// app.use((req,res,next)=>{
//     logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
// console.log(`${req.method} ${req.path}`);
// next();
// });

app.use(logger)

//Cross origin resource sharing
const whitelist=[
    'https://www.google.com']//Allowed to access your backend

const corsOption={
    origin:(origin,callback)=>{
        if (whitelist.indexOf(origin) !== -1 || !origin)
            {
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus:200
}
app.use(cors(corsOption));


//BuildIn middleware to handle urlencoded data
//in other words,form data
//'content-type':application/x-www-form-urlencoded

app.use(express.urlencoded({extended:false}));

//Build-In middleware for json
app.use(express.json());

//Serve static files
app.use(express.static(path.join(__dirname,'/public')));

app.use('/subdir',require('./routes/subdir'));
app.use('/subdir',express.static(path.join(__dirname,'/public')));


//Route handlers
app.get(/.*/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

//Custom Error

// app.use(function(err,req,res,next){
//     console.error(err.stack)
//     res.status(500).send(err.message);
    
// })

// More cleaner and refined error handler from the above function
app.use(errorHandlers);
      

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));