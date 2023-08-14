import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //point to be noted my lord
import { Appbar } from '../src/components/admin/Appbar'
import { Signup } from '../src/components/admin/Signup'
import { Signin } from '../src/components/admin/Signin'
import { AddCourses } from '../src/components/admin/AddCourses';
import { Courses } from '../src/components/admin/Courses';
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

import { userState } from './store/atoms/user';
import { UpdateCourse } from '../src/components/admin/UpdateCourse';
import { Dashboard } from '../src/components/admin/Dashboard';
import { UserSignup } from './components/user/UserSignup';
import { UserSignin } from './components/user/UserSignin';
import { UserCourses } from './components/user/UserCourses';
import { PurchasedCourses } from './components/user/PurchasedCourses';
import { Purchase } from './components/user/Purchase';
import { userCourseState } from './store/atoms/userCourses';
import { Purchased } from './components/user/Purchased';
function App() {
  
  return (
    <div style={
      {backgroundColor: "#eeeeee", width:"100vw", height: "100vh" , margin:0 , padding:0}
    }>
      <RecoilRoot>
    <Router>
        <Appbar />
      <Init />
        {/* <InitUser /> */}
      <Routes>
        <Route path={"/"} element= {<Dashboard />} />
        <Route path={"/signup"} element= {<Signup />} />
        <Route path={"/signin"} element= {<Signin />} />
        <Route path={"/addCourses"} element= {<AddCourses />} />
        <Route path={"/courses"} element= {<Courses />} />
        <Route path={"/updateCourse/:courseId"} element= {<UpdateCourse />} />
        <Route path={"/user/signup"} element= {<UserSignup />} />
        <Route path={"/user/signin"} element= {<UserSignin />} />    
        <Route path={"/user/userCourses"} element= {<UserCourses />} />    
        <Route path={"/user/purchase/:courseId"} element= {<Purchase />} />    
        <Route path={"/user/purchased/:courseId"} element= {<Purchased />} />    
        <Route path={"/user/userPurchasedCourses"} element= {<PurchasedCourses />} />    

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

const InitUser = ()=> {
  const setUserEmail = useSetRecoilState(userCourseState); 
  useEffect(()=> {
    const username = async()=> {
   
        try{
          
            const response = await axios.get(`${PORT_LINK}/users/me`, {headers: {Authorization:`Bearer ${localStorage.getItem("tokenUser")}`}});
          console.log(response);
            if(response.data){
              setUserEmail({
                isLoading: false,
                userCourse: response.data
              });
            }else{
              setUserEmail({
                isLoading:false,
                userCourse: null
              })
            }

          }catch(err){
            setUserEmail({
              isLoading:false,
              userCourse: null
            })
            console.log(err);
          }
        
      }
      username();
    },[]);
    return (
      <></>
    )
}

export default App
