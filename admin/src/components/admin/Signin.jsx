import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";

import { userState } from "../../store/atoms/user"
import { PORT_LINK } from "../../Config";


export const Signin = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();
  const setRecolEmail= useSetRecoilState(userState);
 

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
        <Typography variant={"h6"}>Coursera</Typography>
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
                const response = await axios.post(`${PORT_LINK}/admin/login`, {username: email , password: password} );
                let token= response.data.token;
                localStorage.setItem('token', token);
              
                  setRecolEmail({
                    userEmail:email,
                    isLoading:false
                  });
                  navigate('/courses');
                
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
};
