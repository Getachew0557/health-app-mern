import React from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, TimePicker } from "antd"; // ✅ Import Col and TimePicker properly
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../redux/alertsSlice";
import { toast } from "react-toast";
import axios from "axios";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Form values before sending:", values); 
    try {
      dispatch(showloading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      console.log("Response:", response.data); // ✅ Log response
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error in apply-doctor request:", error); // ✅ Log full error
      toast.error("Something went wrong");
      dispatch(hideloading());
    }
  };
  
  return (
    <Layout>
      <div className="page-title">
        <h1>Apply Doctor</h1>
        <hr />

        <Form layout="vertical" onFinish={onFinish}>
          <h1 className="card-title mt-3" style={{ textAlign: "left" }}>
            Personal Information
          </h1>
          <Row gutter={16}>
            {" "}
            {/* Add gutter to reduce space between columns */}
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <input style={{ width: "100%" }} placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <input style={{ width: "100%" }} placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Phone"
                name="phonenumber"
                rules={[{ required: true }]}
              >
                <input style={{ width: "100%" }} placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                rules={[{ required: true }]}
              >
                <input style={{ width: "100%" }} placeholder="Website" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <input style={{ width: "100%" }} placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>

          <hr />
          <h1 className="card-title mt-3" style={{ textAlign: "left" }}>
            Professional Information
          </h1>
          <Row gutter={16}>
            {" "}
            {/* Add gutter to reduce space between columns */}
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[{ required: true }]}
              >
                <input style={{ width: "100%" }} placeholder="Specialization" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true }]}
              >
                <input style={{ width: "100%" }} placeholder="Experience" />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Fee Per Consultation"
                name="feePerConsultation"
                rules={[{ required: true }]}
              >
                <input
                  style={{ width: "100%" }}
                  placeholder="Fee Per Consultation"
                />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timing"
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end">
            <button className="primary-button" htmlType="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default ApplyDoctor;
