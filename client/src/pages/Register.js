import React from 'react';
import { Button, Form, Input } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toast';
// import { useState } from 'react';


const Register=()=> {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/user/register', values); // Use await to wait for response
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Login Page");
  
        console.log(response.data.message);
        navigate('/login'); // Redirect to Login page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    console.log('Received values of Form:', values);
  };
  
  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1 className="card-title">Create Your Account</h1>
        <p className="normal-text">Please fill in the form below to register</p>
        <Form layout="vertical" className="form" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="primary-button">
            Register
          </Button>
          <Link to="/login"> Click Here to Login</Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
