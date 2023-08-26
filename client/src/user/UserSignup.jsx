import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Card, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { PORT_LINK } from '../../Config';



export const UserSignup = () => {
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
    <Typography style={{color:"#002244"}} fontWeight= "bold" variant={"h5"}>Signup</Typography>
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
          const response = await axios.post(`${PORT_LINK}/users/signup`, {username: email , password: password});
          let data = response.data.token;
          localStorage.setItem('tokenUser',data);
          alert("Registered Successfully! Now login")
          navigate('/user/signin');

        }} >Signup</Button>
         
      </Card>
      </div>
      <Typography style={{marginLeft:630, marginTop:40}} variant='h8'>Already registered? <Link style={{textDecoration: "none"}} to='/user/signin'>Signin</Link> to continue</Typography>
      </div>

  )
}
