const express = require('express');
const mongoose = require("mongoose");
const jwt= require('jsonwebtoken');

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

  module.exports= authenticateJwt