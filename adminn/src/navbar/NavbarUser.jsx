import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { LoginData } from './LoginData';
// import { useRecoilValue } from 'recoil';
// import { userState } from '../store/atom/user';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/atom/user';

export const NavbarUser= ()=> {
  const [sidebar, setSidebar] = useState(false);
  const email = useRecoilValue(userState);
  const setRecoilValue= useSetRecoilState(userState)
 // console.log(email);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate= useNavigate();

  if(email.userEmail !== null){
    return(
      <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
         
          <Button
          style={{marginRight:30, backgroundColor:"#AA0000"}}
            variant="contained"
            onClick={() => {
              localStorage.clear('tokenUser')
              setRecoilValue({
                isLoading:false,
                userEmail:null
              })
              navigate('/');
            }}
          >
            Logout
          </Button>
       
       </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            
            {LoginData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
         
        </nav>
       

      </IconContext.Provider>
      </>
    )
  }
  else{
  return (
    <>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
          }
   }


