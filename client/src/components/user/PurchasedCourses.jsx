import axios from "axios";
import React, { useEffect, useState } from "react";
import { PORT_LINK } from "../../Config";
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PurchasedCourses = () => {
  const [purchased, getPurchased]= useState([]);
    useEffect(()=> {
        const fun = async()=> {
          try{
            const purchased = await axios.get(`${PORT_LINK}/users/purchasedCourses`,{headers:{Authorization: `Bearer ${localStorage.getItem('tokenUser')}`}});
            //console.log(purchased.data.purchasedCourses);
            getPurchased(purchased.data.purchasedCourses);
          }catch(err){
            console.log(err);
          }
            
        }
        fun();
    },[])

    return (
      <div>
        <Typography
         fontWeight="bold"
          variant={"h4"}
          style={{ display: "flex", justifyContent: "center", margin: 30 }}
        >
          Purchased Courses
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 15,
          }}
        >
          {purchased.map((course) => (
            <div key={course._id}>
              <Course course={course} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const Course = ({ course }) => {
    const navigate = useNavigate();
  
    return (
      <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
           component="img"
            height="200"
           
            image={course.imageLink}
            alt= {course.title}
          />
          <CardContent>
            <Typography  fontWeight="bold" gutterBottom variant="h5" component="div">
            {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <h3>{course.description}</h3>
            </Typography>
            <Typography gutterBottom variant="h8" fontWeight="bold" component="div">
             ${course.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  
      </div>
  
    );
  };
  