const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const dotenv=require("dotenv");
dotenv.config()
const app = express();

const allowedOrigins = [
    'https://dikshak-admin-course.vercel.app'
    // Add more allowed origins if needed
  ];
  
  const cors = require('cors');
  const corsOptions ={
      origin:allowedOrigins, 
      credentials:true,            //access-control-allow-credentials:true
      optionSuccessStatus:200
  }
  app.use(cors(corsOptions));
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/users", userRouter)

app.get("/", (req, res)=>{
  res.json('Server is Live');
})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })
 .then(()=>console.log('database connected'))
 .catch((err)=>console.log(err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' +  port));
