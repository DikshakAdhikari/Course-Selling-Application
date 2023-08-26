const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/adminRouter");
const userRouter = require("./routes/userRouter");
const dotenv=require("dotenv");
dotenv.config()
const app = express();

const allowedOrigins = [
    'https://dikshak-admin-course.vercel.app',
    'https://dikshak-client-course.vercel.app'
    // Add more allowed origins if needed
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

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
