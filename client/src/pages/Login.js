import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toast";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/login", values); // Use await to wait for response
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home Page");
        localStorage.setItem("token", response.data.data);

        console.log(response.data.message);
        navigate("/"); // Redirect to Home page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    console.log("Received values of Form:", values); // Correcting the log statement
  };
  return (
    <div className="authentication">
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
