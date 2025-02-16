import React, { use } from "react";
import "../Layout.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  //define the menu items
  const userMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-user-2-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
  ];
  const adminMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "ri-home-line",
    },
    {
      name: "users",
      path: "/users",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-nurse-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "ri-home-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu :userMenu
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2 className="logo">e-Doc</h2>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div className={`d-flex menu-item `} onClick={() =>{
                localStorage.clear();
                navigate('/login');
            }}>
              <i className="ri-logout-circle-line"></i>
              {collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-menu-line menu-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-2">
                <Badge count={user?.unseenNotifications.length} onClick={() => navigate("/notifications")}>
                  <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>
              
              <Link className="anchor mx-3" to="/profile">
                {user?.name}{" "}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
