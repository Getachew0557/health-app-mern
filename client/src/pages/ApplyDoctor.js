import React from 'react';
import Layout from '../components/Layout';
import { Form, Row, Col } from 'antd';  // ✅ Import Col properly

function ApplyDoctor() {
  return (
    <Layout>
      <div className='page-title'>
        <h1>Apply Doctor</h1>
        <Form layout='vertical'>
            <h1 className='card-title mt-3'>Personal Information</h1>
          <Row gutter={16}>  {/* Add gutter to reduce space between columns */}
            <Col span={8} xs={24} sm={24} lg={8}>  
              <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="First Name" /> {/* Adjust width */}
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Last Name" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Email" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Phone" name="phonenumber" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Phone" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Website" name="website" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Website" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Address" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Specialization" name="specializatio" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Specialization" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Experience" name="experience" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Experience" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Fee Per Consultation" name="feePerConsultation" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Fee Per Consultation" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="Consultation Hours" name="consultationHours" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="Consultation Hours" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="From Time" name="fromTime" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="From Time" />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={24} lg={8}>
              <Form.Item label="To Time" name="toTime" rules={[{ required: true }]}>
                <input style={{ width: '100%' }} placeholder="To Time" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Layout>
  );
}

export default ApplyDoctor;
