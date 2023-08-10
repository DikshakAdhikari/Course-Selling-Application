import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //point to be noted my lord
import { Appbar } from './components/Appbar'
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { AddCourses } from './components/AddCourses';
import { Courses } from './components/Courses';
import { useSetRecoilState } from "recoil";

import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import axios from 'axios';
import { PORT_LINK } from './Config';
import { UserEmail } from './store/selectors/User';
import { userState } from './store/atoms/user';
import { UpdateCourse } from './components/UpdateCourse';
import { Dashboard } from './components/Dashboard';

function App() {
  
  return (
    <div style={
      {backgroundColor: "#eeeeee", width:"100vw", height: "100vh" , margin:0 , padding:0}
    }>
      <RecoilRoot>
    <Router>
      <Appbar />
        <Init />
      <Routes>
        <Route path={"/"} element= {<Dashboard />} />
        <Route path={"/signup"} element= {<Signup />} />
        <Route path={"/signin"} element= {<Signin />} />
        <Route path={"/addCourses"} element= {<AddCourses />} />
        <Route path={"/courses"} element= {<Courses />} />
        <Route path={"/updateCourse/:courseId"} element= {<UpdateCourse />} />
      </Routes>

    </Router>
    </RecoilRoot>
    </div>  
  )
}

const Init = ()=> {
  const setUserEmail = useSetRecoilState(userState); 
  useEffect(()=> {
    const username = async()=> {
      if(localStorage.getItem('token')){
        try{
          
            const response = await axios.get(`${PORT_LINK}/admin/me`, {headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}});
          
            if(response.data){
              setUserEmail({
                isLoading: false,
                userEmail: response.data
              });
            }else{
              setUserEmail({
                isLoading:false,
                userEmail: null
              })
            }

          }catch(err){
            setUserEmail({
              isLoading:false,
              userEmail: null
            })
            console.log(err);
          }
        }
      }
      username();
    },[]);
    return (
      <></>
    )
}

export default App
