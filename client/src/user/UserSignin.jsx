import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PORT_LINK } from "../../config";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atom/user";


export const UserSignin = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();
  const setRecolEmail= useSetRecoilState(userState)
 

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography style={{color:"#002244"}} fontWeight= "bold" variant={"h5"}>Login</Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            id="outlined-basic"
            fullWidth={true}
            label="username"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            fullWidth={true}
            label="password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            size={"large"}
            onClick={async () => {
              try {
                const response = await axios.post(`${PORT_LINK}/users/login`, {username: email , password: password} );
                let token= response.data.token;
                localStorage.setItem('tokenUser', token);
                setRecolEmail({
                  isLoading:false,
                  userEmail:email
                })
              
                  navigate('/user/userCourses');
                
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Signin
          </Button>
        </Card>
      </div>
      <Typography style={{marginLeft:630, marginTop:40}} variant='h8'>Dont't have account? <Link style={{textDecoration: "none"}} to='/user/signup'>Signup</Link> to register</Typography>
    </div>
  );
};
