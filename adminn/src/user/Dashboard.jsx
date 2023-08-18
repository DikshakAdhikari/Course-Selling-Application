import React from 'react'
import { Card, TextField, Typography,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate= useNavigate()
  return (
    <div style={{display:'flex' , marginTop:50, justifyContent:"space-between"}}>
        <div style={{marginLeft:"150px", display:"flex", flexDirection:"column", gap: 50}}>
        <Typography style={{color:"#002244"}} variant={"h3"}>Believe in yourself</Typography>
        <Button variant='outlined' style={{borderColor:"green", color:"#002244"}} onClick={()=> {
            navigate("/user/signup");
        }}>Register now</Button>
        </div>
        <div style={{marginRight:90,  }}>
            <img style={{height:"40vh", width:"20vw",  borderColor:"black"}} src='https://images.pexels.com/photos/102061/pexels-photo-102061.jpeg?auto=compress&cs=tinysrgb&w=600' alt="" />
        </div>
        
 
    </div>
  )
}
