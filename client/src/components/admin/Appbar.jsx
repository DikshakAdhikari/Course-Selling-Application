import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { Typography } from "@mui/material";
import { useRecoilValue , useSetRecoilState } from 'recoil';
import { UserEmail } from "../../store/selectors/User";
import { userState } from "../../store/atoms/user";


export const Appbar = () => {
  const navigate = useNavigate();
  const email= useRecoilValue(UserEmail);
  const setRecoilEmail = useSetRecoilState(userState);
  return (
    <div>
      {email === null? (
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "10px",
            padding: 10,
            marginBottom:50
          }}
        >
          <Button variant="contained" onClick={() => navigate("/signup")}>
            Signup
          </Button>
          <Button variant="contained" onClick={() => navigate("/signin")}>
            Signin
          </Button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "10px",
            padding: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              setRecoilEmail({
                isLoading:false,
                userEmail: null
              });
              navigate('/');
            }}
          >
            Logout
          </Button>

          <Button variant="contained" onClick={() => navigate("/addCourses")}>
            Add Courses
          </Button>
          <Typography variant={"h6"}>{email}</Typography>
        </div>
      )}
    </div>
  );
};
