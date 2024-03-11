import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useUser } from './context/userContext';


export default function Login() {

    const { login, admin } = useUser();
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
 
    const [data, setData] = useState({
        email: "",
        password: ""
    })

 
    const handleLoginChange = (e) => {
        const { name, value } = e.target
 
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    console.log("data", data)
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const response = await fetch('http://localhost:4000/api/user/authenticate', {
                method: 'post',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(data.email === "admin@gmail.com" && data.password === "admin")
            {
                admin();
            }
 
            const dataResponse = await response.json();

            setErrors(dataResponse);
 
            console.log("dataResponse", dataResponse);
 
            if (dataResponse.error) {
               if(dataResponse.messageM)
               {
                alert(dataResponse.messageM)
               }
               else
               {
                alert(dataResponse.messageP)
               }
            }
 
            if (dataResponse.success) {
                alert(dataResponse.message);
                localStorage.setItem('token', dataResponse.token);
                login();
                navigate('/products');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while processing your request.');
        }
    };
 
 
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                <h1 style={{textAlign:'center',fontFamily:'Pacifico'}}>Buddy Electronics</h1><br />
                    <div className="card">
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" onChange={handleLoginChange} placeholder='Enter email'/>
                                    { errors.messageM && <small style={{color:"red"}}>{errors.messageM}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" onChange={handleLoginChange} placeholder='Enter password'/>
                                    { errors.messageP && <small  style={{color:"red"}}>{errors.messageP}</small>}
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Submit</button>
                                    <button type="button" className="btn btn-secondary">Cancel</button>
                                </div>
                                Not a user ? <NavLink to="/register">Register</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
}
