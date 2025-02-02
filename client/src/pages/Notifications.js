import React from 'react';
import Layout from '../components/Layout';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideloading, showloading } from '../redux/alertsSlice';
import {setUser} from '../redux/userSlice'
import axios from 'axios';
import { toast } from 'react-toast';
import { Header } from 'antd/es/layout/layout';

function Notifications() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const markAsAllAsSeen = async() =>{
        try {
            dispatch(showloading())
            const response = await axios.post('/api/user/mark-all-notifications-as-seen', 
                { userId: user._id }, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }); // Use await to wait for response
            dispatch(hideloading())
            if (response.data.success) {
              toast.success(response.data.message);
              dispatch(setUser(response.data.user))

            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideloading())
            toast.error("Something went wrong");
          }
    }

    return (
        <Layout>
            <h1 className='page-title'>Notifications</h1>
            <Tabs>
                <Tabs.TabPane tab="unseen" key={0}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor' onClick={markAsAllAsSeen}> Mark all as seen</h1>
                    </div>
                    {user?.unseenNotifications.map((notification) => (
                        <div className='card p-2' onClick={()=>navigate(notification.onClickPath)}>
                            <div className='card-text'>{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>

                <Tabs.TabPane tab="Seen" key={1}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor'>Delete All</h1>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
}

export default Notifications;