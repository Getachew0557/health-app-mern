import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showloading, hideloading } from '../redux/alertsSlice';
import { toast } from 'react-toastify';

function UserList() {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const getUsersData = async () => {
        try {
            dispatch(showloading());
            const response = await axios.get('/api/admin/get-all-users', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideloading());
            if (response.data.success) {
                setUsers(response.data.users);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideloading());
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        getUsersData();
    }, []);

    return (
        <Layout>
            <h1 className="page-title">User List</h1>
            <div className="user-list">
                {users.map(user => (
                    <div key={user._id} className="user-card">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default UserList;