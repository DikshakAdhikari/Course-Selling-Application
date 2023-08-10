import React from 'react'
import { Card, TextField, Typography,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate= useNavigate()
  return (
    <div style={{display:'flex' , justifyContent:"space-between"}}>
        <div style={{marginLeft:"50px", display:"flex", flexDirection:"column", gap: 50}}>
        <Typography variant={"h4"}>Admin Dashboard</Typography>
        <Button variant='outlined' onClick={()=> {
            navigate("/courses");
        }}>View Dashboard</Button>
        </div>
        <div style={{marginRight:60,  }}>
            <img style={{height:"60vh", width:"25vw",borderRadius:"30%", borderColor:"black"}} src='https://images.pexels.com/photos/17683236/pexels-photo-17683236/free-photo-of-people-festival-high-travel.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt="" />
        </div>
        
 
    </div>
  )
}
