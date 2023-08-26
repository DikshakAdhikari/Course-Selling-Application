const express = require('express');
const authenticateJwt = require("../middlewares/verifyAdmin");
const { getAdminUsername, adminSignup, adminSignin, adminCourses, updateAdminCourse, getAdminCourses, getParticularAdminCourse, deleteAdminCourse } = require("../controllers.js/adminController");
const router= express.Router()


router.get('/me', authenticateJwt,  getAdminUsername );

router.post('/signup', adminSignup)

router.post('/login', adminSignin);

router.post('/courses', authenticateJwt, adminCourses );

router.put('/courses/:courseId', authenticateJwt, updateAdminCourse);

router.get('/courses', authenticateJwt, getAdminCourses);

router.get('/:courseId', authenticateJwt, getParticularAdminCourse);

router.delete('/course/:courseId', authenticateJwt,deleteAdminCourse);


module.exports= router