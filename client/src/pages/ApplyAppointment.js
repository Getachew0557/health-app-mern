import React, { useState } from "react";
import { Form, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../redux/alertsSlice";
import axios from "axios";
import Layout from "../components/Layout";

function ApplyAppointment() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      dispatch(showloading());
      
      const appointmentData = {
        firstName: values.firstName,
        middleName: values.middleName || '',
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        message: values.message,
        prescription: fileList.length > 0 ? fileList[0].originFileObj : null,
        userId: user._id
      };

      // Convert to FormData if there's a file, else send as JSON
      let formData;
      if (appointmentData.prescription) {
        formData = new FormData();
        Object.keys(appointmentData).forEach(key => {
          formData.append(key, appointmentData[key]);
        });
      } else {
        formData = appointmentData;
      }


      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": appointmentData.prescription ? "multipart/form-data" : "application/json"
      };

      const response = await axios.post("/api/user/create-appointment", formData, { headers });


      dispatch(hideloading());
      
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      message.error("Something went wrong");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Layout>
      <div className="page-title">
        <h1>Book Appointment</h1>
        <hr />
        
        <Form layout="vertical" onFinish={onFinish}>
          <h1 className="card-title mt-3">Personal Information</h1>
          <Row gutter={16}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Middle Name"
                name="middleName"
              >
                <input placeholder="Middle Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true }]}
              >
                <input placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>

          <h1 className="card-title mt-3">Appointment Details</h1>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Prescription (Optional)"
                name="prescription"
              >
                <Upload
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <button icon={<UploadOutlined />}>Upload Prescription</button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Message"
                name="message"
                rules={[{ required: true }]}
              >
                <textarea rows={4} placeholder="Describe your medical needs" />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <button className="primary-button" type="submit">
              Book Appointment
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default ApplyAppointment;
