import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const LoginData = [
  {
    title: 'All Courses',
    path: "/user/userCourses",
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Purchased Courses',
    path: "/user/userPurchasedCourses",
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
 
  
];
