const express = require('express');
const app = express();
const mongoose= require('mongoose')
const cors= require('cors');
const jwt= require('jsonwebtoken');
//console.log
app.use(express.json());
app.use(cors());
const dotenv= require('dotenv')
dotenv.config()

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  
});

const userSchema = new mongoose.Schema({
  username : {type:String , unique: true},
  password: String ,
  purchasedCourses: [{type : mongoose.Schema.Types.ObjectId, ref: 'Course'}],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: String
});

const User= mongoose.model('User', userSchema);
const Admin= mongoose.model('Admin', adminSchema);
const Course= mongoose.model('Course', courseSchema);

mongoose.connect(process.env.MONGO_URI , { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" })
.then(()=> console.log("Database connected"))
.catch((err)=> {
  console.log("failed database connection");
  console.log(err);
});
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
    //   console.log(user);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const userAuthenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.SECRET_KEY_USER, (err, payload) => {
      if (err) {
        return res.sendStatus(403)
      }
     // console.log(payload);
      req.user = payload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Admin routes
app.post('/admin/signup', (req, res) => {
  const {username , password} = req.body;
  function callback(admin){
    if(admin){
      res.status(403).json({message: "user already registered"});
    }else{
      const obj = {username: username , password: password};
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token= jwt.sign({username , role:'admin'}, process.env.SECRET_KEY, {expiresIn : '1h'});
      res.json({message: 'Admin registered successfully', token});
    }
  }
  
  Admin.findOne({username}).then(callback);
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});


app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const course= new Course(req.body);
  await course.save();
  res.json({message: "Course saved successfully", courseId: course.id});
});

app.put('/admin/courses/:courseId',authenticateJwt, async (req, res) => {
  const course= await Course.findByIdAndUpdate(req.params.courseId , req.body , {new: true});
  if(course){
    res.json({message: "Course updated successfully"});
  }else{
    res.status(403).json({message: "Course not found"});
  }

});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
   const courses = await Course.find({});
  res.json({courses});
});

// User routes
app.post('/users/signup', async (req, res) => {
    const {username, password} = req.body;
    //console.log(req.body);
    const user = await User.findOne({username: username});
    if(user){
      return res.json({message: "User already exists"});
    }
      const newUser= new User(req.body);
      newUser.save();
      const token = jwt.sign({username, role:'user'}, process.env.SECRET_KEY_USER, {expiresIn: '1h'});
      res.json({message: 'User registered successfully', token});
    
});

app.post('/users/login', async (req, res) => {
  const {username, password}=  req.body
  console.log(username);
  const user= await User.findOne({username:username , password:password});
  if(user){
    const token= jwt.sign({username, role:'user'}, process.env.SECRET_KEY_USER, {expiresIn: "1h"});
    res.json({message: "User logged in successfully" , token});
  }else{
    return res.status(403).json({message: "Logged in failed"});
  }
});

app.get('/users/courses', userAuthenticateJwt, async (req, res) => {
  const userCourses= await Course.find({published: true});
  //console.log(userCourses);
  //const userCourses= await Course.find({});
res.json({userCourses});
  
});

app.post('/users/courses/:courseId',userAuthenticateJwt, async (req, res) => {
  const course=  await Course.findById(req.params.courseId);
  //console.log(course);
  if(course){
    const user = await User.findOne({username: req.user.username});
    console.log(req.user);
    if(user){
      user.purchasedCourses.push(course);
      await user.save();
      res.json({message: "Course added successfully"});
    }else{
      res.json({message: "User not found"});
    }
  }else{
    res.json({message: "Course does not exist"});
  }
});

app.get('/users/purchasedCourses', userAuthenticateJwt, async (req, res) => {
  // const user1 = await User.findOne({ username: req.user.username })
  // console.log(user1);
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');

  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.get('/admin/me' , authenticateJwt, async (req,res)=> {
  try{
    const username= req.user.username;
 
  res.json(username);
  }catch(err){
    res.json(err)
  }
  
} );

app.get('/users/me' , userAuthenticateJwt, async (req,res)=> {
  try{
    const username= req.user;
    //console.log(username);
 
  res.json(username);
  }catch(err){
    console.log(err);
    res.json(err)
  }
  
} );

app.get('/users/:courseId', userAuthenticateJwt, async (req,res)=> {
  const {courseId} = req.params;
  try{
    const course = await Course.findById(courseId);
  //console.log(course);
  if(course){
    res.json({course});
  }else{
    res.sendStatus(403);
  }
  }catch(err){
    res.json(err);
  }
  
})

app.get('/admin/:courseId', authenticateJwt, async (req,res)=> {
  const {courseId}=  req.params;
  const course= await Course.findById(courseId);
  if(course){
    res.json({course});
  }else{
    res.status(403).json({message: 'Course does not exists'});
  }
} )

app.delete('/admin/course/:courseId', authenticateJwt, async (req,res)=> {
  const {courseId}= req.params;
  //console.log(courseId);
  try{
     await Course.findByIdAndDelete(courseId);
     res.json({message: 'Course deleted successfully'})
    
  }catch(err){    
    res.status(404).json(err);
  }
});





app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
