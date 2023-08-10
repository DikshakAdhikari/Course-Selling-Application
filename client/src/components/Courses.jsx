import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, TextField, Typography,Button } from '@mui/material';
import { PORT_LINK } from '../Config';
import { useNavigate } from 'react-router-dom';


export const Courses = () => {
    const [courses, getCourses]= useState([]);
    const navigate = useNavigate();
   

    useEffect(()=> {
        const data = async()=> {
            const response = await axios.get(`${PORT_LINK}/users/courses`, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}});
            //console.log(response.data);
            getCourses(response.data.userCourses);
        }
        data();
    },[]);
  return (
    <div style={{display: "flex", flexDirection:"row", flexWrap:"wrap", justifyContent: "center", gap:"20px", backgroundColor:"#eee"}}>
      {courses.map((course)=> (
        <div key= {course.title}>
         <Course course= {course} />
        </div>
      ))}
    </div>
  )
}



const Course = ({course})=> {
  const navigate= useNavigate();
 // console.log("wwweeee");
       return (<div >
        <Card varint={"outlined"} style={{width:400, padding: 20, height:"50vh", width:"20vw"}}>
          <center>
            <h1>{course.title}</h1>
            <h3>{course.description}</h3>
            <img src={course.imageLink} alt={course.title} style={{height:"140px"}} />
            <h3>{course.price}</h3>
            <Button variant="contained"
            onClick={()=> {
        
             navigate(`/updateCourse/${course._id}`)
            }}>Edit</Button>
            </center>
            </Card>
        </div>
       )
}
