import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { userCourseState } from "../../store/atoms/userCourses";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import imgg from '../../pic/picCourse.png'



export const Purchase = () => {
  const params= useParams();
  const {courseId} = params
  const [course, setCourse]= useState({});
  useEffect(()=> {
    const fun  = async()=> {
      const course = await axios.get('http://localhost:3000/users/'+courseId , {headers: {Authorization:'Bearer '+localStorage.getItem('tokenUser')}});
     // console.log(course.data.course);
      setCourse(course.data.course)
    }

    fun();
  },[])
  return (
    <div>
    <div style={{display:"flex", marginTop:80,  justifyContent:"center", gap:80}}>
      <img src={course.imageLink} alt={course.title}  style={{borderRadius:50, width:"20vw", height:"30vh", marginLeft:400}}/>
      <img src={imgg} alt="" style={{height:"30vh", width:"40vw", }} />
    </div>
      <Typography color="#002D62" variant="h4" fontWeight="bold" style={{marginLeft:490, marginTop:30, fontSize:50}} >{course.title}</Typography>
      <div><Typography fontWeight="bold" style={{marginLeft:490, marginTop:30, fontSize:20}} >{course.description}</Typography></div>
      <Button variant="contained" style={{marginLeft:490,backgroundColor:"red",marginTop:30}}>Purchase</Button>
    </div>
  );
};
