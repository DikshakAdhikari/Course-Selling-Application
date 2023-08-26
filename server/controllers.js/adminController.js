const { Course, Admin } = require("../connection/db");
const jwt = require('jsonwebtoken');

exports.adminSignup = (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "user already registered" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Admin registered successfully', token });
    }
  }

  Admin.findOne({ username }).then(callback);
};

exports.adminSignin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
}

exports.adminCourses = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course saved successfully", courseId: course.id });
}

exports.updateAdminCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(403).json({ message: "Course not found" });
  }

}

exports.getAdminCourses = async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
}

exports.getParticularAdminCourse = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (course) {
    res.json({ course });
  } else {
    res.status(403).json({ message: 'Course does not exists' });
  }
}

exports.deleteAdminCourse = async (req, res) => {
  const { courseId } = req.params;
  //console.log(courseId);
  try {
    await Course.findByIdAndDelete(courseId);
    res.json({ message: 'Course deleted successfully' })

  } catch (err) {
    res.status(403).json(err);
  }
}

exports.getAdminUsername = async (req, res) => {
  try {
    const username = req.user;
   // console.log(username);
    res.json(username);
  } catch (err) {
    res.status(500).json(err)
  }

}