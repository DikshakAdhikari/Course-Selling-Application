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
import { PORT_LINK } from "../../Config";



export const Purchase = () => {
  const params= useParams();
  const {courseId} = params
  const [course, setCourse]= useState({});
  const [courseValues, setValues]= useState([])
  const navigate= useNavigate()
  useEffect(()=> {
    const fun  = async()=> {
      const course = await axios.get('http://localhost:3000/users/'+courseId , {headers: {Authorization:'Bearer '+localStorage.getItem('tokenUser')}});
     // console.log(course.data.course);
      setCourse(course.data.course)
    }

    const purchasedIds= async ()=> {
      const courseIds= await axios.get('http://localhost:3000/users/ids/purchasedCourses', {headers: {Authorization:'Bearer '+localStorage.getItem('tokenUser')}});
      console.log(courseIds.data.purchasedCoursesIds);
      setValues(courseIds.data.purchasedCoursesIds)

    }
    purchasedIds();

    fun();
  },[]);

  const isCourseAdded =(courseId)=> 
     courseValues.includes(courseId)
  
  return (
    <div>
    <div style={{display:"flex", marginTop:80,  justifyContent:"center", gap:90}}>
      <img src={course.imageLink} alt={course.title}  style={{borderRadius:50, width:"20vw", height:"30vh", marginLeft:400}}/>
      <img src={imgg} alt="" style={{height:"30vh", width:"40vw", }} />
    </div>
      <Typography color="#002D62" variant="h4" fontWeight="bold" style={{marginLeft:490, marginTop:30, fontSize:50}} >{course.title}</Typography>
      <Typography fontWeight="bold" style={{marginLeft:490, marginTop:30,marginRight:400, fontSize:20}} >{course.description}</Typography>
      <Button variant="contained" style={{marginLeft:490,marginTop:30}} onClick={async () => {
             try {
               
                const responsee = await axios.post(
                  `${PORT_LINK}/users/courses/${course._id}`, {params}, {headers:{Authorization: `Bearer ${localStorage.getItem('tokenUser')}`}}
                );
               // console.log(responsee.data.purchasedCourses);
                setValues(responsee.data.purchasedCourses)
                
              } catch (err) {
                console.log(err);
              }
            }}
            
            disabled= {isCourseAdded(courseId)}
            >{isCourseAdded(courseId) ? 'Purchased':'Purchase'}</Button>
    </div>
  );
};
