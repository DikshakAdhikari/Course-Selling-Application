import axios from "axios";
import React, { useEffect, useState } from "react";
import { PORT_LINK } from "../../Config";
import { Button, Card, Typography } from "@mui/material";
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
          variant={"h4"}
          style={{ display: "flex", justifyContent: "center", margin: 30 }}
        >
          Courses to Purchase
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
    // console.log("wwweeee");
    return (
      <div>
        <Card
          varint={"outlined"}
          style={{ padding: 20, height: "50vh", width: "20vw" }}
        >
          <center>
            <h1>{course.title}</h1>
            <h3>{course.description}</h3>
            <img
              src={course.imageLink}
              alt={course.title}
              style={{ height: "140px" }}
            />
            <h3>{course.price}</h3>
          
          </center>
        </Card>
      </div>
    );
  };
  