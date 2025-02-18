import React, { useState, useEffect } from "react";
import { Form, Upload, message, Row, Col } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let response;
        if (user?.isAdmin) {
          response = await axios.get("/api/admin/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        } else if (user?.isDoctor) {
          response = await axios.get("/api/doctor/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        } else {
          response = await axios.get("/api/user/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }
        setProfileData(response.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        message.error(error.response?.data?.message || "Error fetching profile");
      }

    };
    fetchProfile();
  }, [user]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = async () => {
    try {
      const formData = new FormData();
      if (fileList.length > 0) {
        formData.append("profilePhoto", fileList[0].originFileObj);
        
        const response = await axios.post("/api/user/update-profile", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          message.success("Profile photo updated successfully");
        }
      }
    } catch (error) {
      message.error("Error updating profile photo");
    }
  };


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <Layout>
      <div className="page-title">
        <h1>Profile</h1>
        <hr />
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        
          <Form layout="vertical" onFinish={onFinish}>
            <div className="profile-values">
              <div className="profile-photo">
                {profileData.profilePhoto ? (
                  <img src={profileData.profilePhoto} alt="Profile" />
                ) : (
                  <Upload
                    fileList={fileList}
                    onChange={handleFileChange}
                    beforeUpload={() => false}
                    maxCount={1}
                  >
                    <button className="upload-button" icon={<UploadOutlined />}>
                      {fileList.length > 0 ? 'Change Photo' : 'Upload Photo'}
                    </button>
                  </Upload>
                )}
              </div>
              
              <div className="profile-info">
                <div>{profileData.firstName} {profileData.lastName}</div>
                <div>{profileData.email}</div>
              </div>

              {user?.isDoctor && (
                <div className="professional-info">
                  <div>{profileData.specialization}</div>
                  <div>{profileData.experience} years experience</div>
                </div>
              )}

              {fileList.length > 0 && (
                <div className="d-flex justify-content-end">
                  <button className="primary-button" type="submit">
                    Update Profile Photo
                  </button>
                </div>
              )}
            </div>


        </Form>
      </div>
    </Layout>
  );
}

export default Profile;
