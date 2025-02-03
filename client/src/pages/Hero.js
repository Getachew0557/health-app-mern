import React from "react";
import { Button, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../Hero.css"; // Assuming you have a CSS file for custom styles
import backgroundImage from "../assets/about.jpg"; // Import the image

const Hero = () => {
  return (
    <div className="hero-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Menu mode="horizontal" theme="dark" className="navbar">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="doctors">
          <Link to="/doctors">Doctors</Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
      <div className="container text-center mt-4">
        <h1 className="display-4">Welcome to <span className="text-primary">HabariDOC</span></h1>
        <p className="lead">
          The one-stop platform for easy and efficient medical consultations. Book an appointment with a doctor of your choice!
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button type="primary" size="large">Book Appointment</Button>
          <Button type="default" size="large">Download the App</Button>
        </div>
        <div className="search-bar mt-5">
          <Input
            size="large"
            placeholder="Search by name, specialty, or hospital"
            prefix={<SearchOutlined />}
            className="w-50"
          />
          <Button type="primary" size="large" className="ms-2">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;