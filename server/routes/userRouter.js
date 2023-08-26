const mongoose = require("mongoose");
const express = require('express');
const jwt = require('jsonwebtoken');
const userAuthenticateJwt = require("../middlewares/verifyUser");
const { getUsername, getUserCourses, userSignup, userSignin, getParticularCourse, postUserCourse, getUserPurchasedCourses, getUserPurchaseCoursesIds } = require("../controllers.js/userController");
const router= express.Router()

router.get('/me' , userAuthenticateJwt, getUsername );

router.post('/signup', userSignup);

router.post('/login', userSignin);

router.get('/courses', userAuthenticateJwt, getUserCourses);

router.post('/courses/:courseId',userAuthenticateJwt, postUserCourse);

router.get('/purchasedCourses', userAuthenticateJwt, getUserPurchasedCourses);
router.get('/:courseId', userAuthenticateJwt, getParticularCourse)  

router.get('/ids/purchasedCourses', userAuthenticateJwt, getUserPurchaseCoursesIds)

module.exports= router
