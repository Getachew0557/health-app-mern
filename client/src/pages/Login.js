import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toast";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { showloading, hideloading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showloading())
      const response = await axios.post("/api/user/login", values); // Use await to wait for response
      dispatch(hideloading())

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Dashboard Page");
        localStorage.setItem("token", response.data.data);

        console.log(response.data.message);
        navigate("/"); // Redirect to Dashboard page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading())
      toast.error("Something went wrong");
    }
    console.log("Received values of Form:", values); // Correcting the log statement
  };
  return (
    <div className="authentication">
      <ToastContainer />
      <div className="authentication-form card p-2">
        <h1 className="card-title">Login to Your Account</h1>
        <Form layout="vertical" className="form" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="primary-button">
            Login
          </Button>
          <Link to="/register"> Click Here to Register</Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
