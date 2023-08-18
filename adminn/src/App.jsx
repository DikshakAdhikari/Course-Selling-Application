import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //point to be noted my lord

import React from 'react';

import axios from 'axios';


import { Dashboard } from './user/Dashboard';
import { RecoilRoot } from 'recoil';
import { UserSignup } from './user/UserSignup';
import { UserSignin } from './user/UserSignin';
import { UserCourses } from './user/UserCourses';
import { Purchase } from './user/Purchase';
import { PurchasedCourses } from './user/PurchasedCourses';
import { NavbarUser } from './navbar/NavbarUser';


function App() {
  
  return (
    <div style={
      {backgroundColor: "#eeeeee", width:"100vw", height: "100vh" , margin:0 , padding:0}
    }>
  <RecoilRoot>
    <Router>
        {/* <Appbar /> */}
    <NavbarUser />
        {/* <InitUser /> */}
      <Routes>

        <Route path={"/"} element= {<Dashboard />} />
        <Route path={"/user/signup"} element= {<UserSignup />} />
        <Route path={"/user/signin"} element= {<UserSignin />} />    
        <Route path={"/user/userCourses"} element= {<UserCourses />} />    
        <Route path={"/user/purchase/:courseId"} element= {<Purchase />} />        
        <Route path={"/user/userPurchasedCourses"} element= {<PurchasedCourses />} />    

      </Routes>

    </Router>
    </RecoilRoot>

    </div>  
  )
}

// const Init = ()=> {
//   const setUserEmail = useSetRecoilState(userState); 
//   useEffect(()=> {
//     const username = async()=> {
//       if(localStorage.getItem('token')){
//         try{
          
//             const response = await axios.get(`${PORT_LINK}/admin/me`, {headers: {Authorization:`Bearer ${localStorage.getItem("token")}`}});
          
//             if(response.data){
//               setUserEmail({
//                 isLoading: false,
//                 userEmail: response.data
//               });
//             }else{
//               setUserEmail({
//                 isLoading:false,
//                 userEmail: null
//               })
//             }

//           }catch(err){
//             setUserEmail({
//               isLoading:false,
//               userEmail: null
//             })
//             console.log(err);
//           }
//         }
//       }
//       username();
//     },[]);
//     return (
//       <></>
//     )
// }

// const InitUser = ()=> {
//   const setUserEmail = useSetRecoilState(userCourseState); 
//   useEffect(()=> {
//     const username = async()=> {
   
//         try{
          
//             const response = await axios.get(`${PORT_LINK}/users/me`, {headers: {Authorization:`Bearer ${localStorage.getItem("tokenUser")}`}});
//           console.log(response);
//             if(response.data){
//               setUserEmail({
//                 isLoading: false,
//                 userCourse: response.data
//               });
//             }else{
//               setUserEmail({
//                 isLoading:false,
//                 userCourse: null
//               })
//             }

//           }catch(err){
//             setUserEmail({
//               isLoading:false,
//               userCourse: null
//             })
//             console.log(err);
//           }
        
//       }
//       username();
//     },[]);
//     return (
//       <></>
//     )
// }

export default App
