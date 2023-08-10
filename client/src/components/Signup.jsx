import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Card, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { PORT_LINK } from '../Config';

export const Signup = () => {
  const [email, setEmail]= useState([]);
  const [password, setPassword] =useState([]);
  const navigate = useNavigate();
  return (
    <div>
    <div style={{
      paddingTop: 150,
      marginBottom: 10,
      display: "flex",
      justifyContent: "center"
    }}>
    <Typography variant={"h6"} >Coursera</Typography>
      </div>
      
      <div style={{display: "flex",justifyContent:"center" }}>
      <Card varint={"outlined"} style={{width:400, padding: 20}}>
       <TextField id="outlined-basic"  fullWidth={true} label="email" variant="outlined" onChange={(e)=> {
        setEmail(e.target.value);
       }} />
       <br/><br/>
        <TextField id="outlined-basic"  fullWidth={true} label="password" variant="outlined" type='password' onChange={(e)=> {
          setPassword(e.target.value);
        }} />
        <br/><br/>
        <Button variant="contained" size={"large"} onClick={async()=> {
          const response = await axios.post(`${PORT_LINK}/admin/signup`, {username: email , password: password});
          let data = response.data.token;
          localStorage.setItem('token',data)
          navigate('/');

        }} >Signup</Button>
         
      </Card>
      </div>
      </div>

  )
}
