import React, { use } from 'react'
import '../Layout.css'
import { Link, useLocation } from 'react-router-dom';


function Layout({children}) {
 const location = useLocation()
 //define the menu items
 const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: 'ri-home-line'   
    },
    {
      name: "Appointments",
      path: "/appointments",
        icon: 'ri-file-list-line'
    },
    {
      name: "Patients",
      path: "/patients",
        icon: 'ri-user-2-line'
    },
    {
      name: "Doctors",  
      path: "/doctors",
        icon: 'ri-nurse-line'    
    },
    {
        name: "Profile",
        path: "/profile",
        icon: 'ri-profile-line'
    },

    {
      name: "Logout",
      path: "/logout",
        icon: 'ri-logout-circle-line'
    },

 ];
 const menuToBeRendered = userMenu
  return (
    <div className='main'>
        <div className='d-flex layout'>
            <div className='sidebar'>
                <div className='sidebar-header'>
                    <h1>HA</h1>
                </div>
                <div className='menu'>
                    {
                        menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (
                                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`} >
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                            )

                        })
                        } 

                </div>


            </div>

            <div className='content'>
                <div className='header'>
                    header

                </div>
                <div className='body'>
                    {children}

                </div>
                 
            </div>
        </div>
    </div>
  )
}

export default Layout