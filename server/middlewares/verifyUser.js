const express = require('express');
const jwt= require('jsonwebtoken');


const userAuthenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    
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

  module.exports= userAuthenticateJwt