const express = require('express');
const mongoose = require('mongoose');
const { User, Course, Admin } = require("../connection/db");
const jwt = require('jsonwebtoken');


exports.getUsername = async (req, res) => {
    try {
        const username = req.user;
        //console.log(username.username);

        res.json(username.username);
    } catch (err) {
        console.log(err);
        res.sendStatus(403)
    }

}

exports.getParticularCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        //console.log(course);
        if (course) {
            res.json({ course });
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.json(err);
    }

}


exports.userSignup = async (req, res) => {
    const { username, password } = req.body;
    //console.log(req.body);
    const user = await User.findOne({ username: username });
    if (user) {
        return res.json({ message: "User already exists" });
    }
    const newUser = new User(req.body);
    newUser.save();
    const token = jwt.sign({ username, role: 'user' }, process.env.SECRET_KEY_USER, { expiresIn: '1h' });
    res.json({ message: 'User registered successfully', token });

}

exports.userSignin = async (req, res) => {
    const { username, password } = req.body
    //console.log(username);
    const user = await User.findOne({ username: username, password: password });
    if (user) {
        const token = jwt.sign({ username, role: 'user' }, process.env.SECRET_KEY_USER, { expiresIn: "1h" });
        res.json({ message: "User logged in successfully", token });
    } else {
        return res.status(403).json({ message: "Logged in failed" });
    }
};

exports.getUserCourses = async (req, res) => {
    try {
        const userCourses = await Course.find({ published: true });
        //console.log(userCourses);
        //const userCourses= await Course.find({});
        res.json({ userCourses });
    } catch (err) {
        res.sendStatus(403);
    }


};

exports.postUserCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    //console.log(course);
    if (course) {
        const user = await User.findOne({ username: req.user.username });
        //console.log(req.user);
        if (user) {
            user.purchasedCourses.push(course._id);
            await user.save();
            //console.log(user);
            res.json({ purchasedCourses: user.purchasedCourses });
        } else {
            res.json({ message: "User not found" });
        }
    } else {
        res.json({ message: "Course does not exist" });
    }
};

exports.getUserPurchasedCourses = async (req, res) => {
    // const user1 = await User.findOne({ username: req.user.username })
    // console.log(user1);
    const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');

    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
};

exports.getUserPurchaseCoursesIds = async (req, res) => { // trying to get id's of courses inside user.purchasedCourses
    const user = await User.findOne({ username: req.user.username });

    if (user) {
        res.json({ purchasedCoursesIds: user.purchasedCourses || [] });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
}
