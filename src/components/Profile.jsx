
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CiUser } from 'react-icons/ci';
import { jwtDecode } from 'jwt-decode';
import './Profile.css'

function Profile() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const id = decoded._id;
    const [user, setUser] = useState({
        username: "",
        email: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/user/getDetails/${id}`);
                const userData = response.data; 

                setUser({
                    username: userData.username,
                    email: userData.email
                });
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        fetchData();
    }, [id]); // Include id in dependency array to fetch data whenever id changes

    const handleUpdateClick = () => {
        // Populate form data with current user details
        setFormData({
            username: user.username,
            email: user.email
        });
        // Set editing mode to true
        setIsEditing(true);
    }

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit form data to backend for update
        try {
            await axios.put(`http://localhost:4000/api/user/updateUser/${id}`, formData);
            // Update user state with new data
            setUser({
                username: formData.username,
                email: formData.email
            });
            // Exit editing mode
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    return (
        <div className="card mb-3 custom-card" style={{ maxWidth: 540 }}>
            <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    {/* Center the CiUser icon */}
                    <CiUser style={{ fontSize: '3rem' }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleFormChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleFormChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        ) : (
                            <>
                                <h5 className="card-title">{user.username}</h5>
                                <p className="card-text">{user.email}</p>
                                <p className="card-text"><small className="text-body-secondary"><button onClick={handleUpdateClick}>Update</button></small></p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
