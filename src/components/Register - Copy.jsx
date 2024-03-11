import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Register() {

    const [errors, setErrors] = useState('');
    const navigate = useNavigate()
 
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })
 
    const handleRegisterChange = (e) => {
        const { name, value } = e.target
 
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    console.log("data", data)
 
    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch("http://localhost:4000/api/user/register", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const dataResponse = await response.json()
        setErrors(dataResponse)
        console.log("dataResponse", dataResponse)
 
        if (dataResponse.error) {
            if(dataResponse.messageM)
            {
             alert(dataResponse.messageM)
            }
            else if(dataResponse.messageP)
            {
             alert(dataResponse.messageP)
            }
            else
            {
                alert(dataResponse.messageU)
            }
        }
 
        if (dataResponse.success) {
            alert(dataResponse.message)
            setData({
                username: "",
                email: "",
                password: ""
            })
            navigate('/')
        }
 
    }
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
        <h1 style={{textAlign:'center',fontFamily:'Pacifico'}}>Buddy Electronics</h1><br />
            <div className="card">
                <div className="card-header">
                   Register
                </div>
                <div className="card-body">
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username"  onChange={handleRegisterChange} placeholder='Enter username' />
                            { errors.messageU && <small style={{color:"red"}}>{errors.messageU}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleRegisterChange} placeholder='Enter email' required="required"/>
                            { errors.messageM && <small style={{color:"red"}}>{errors.messageM}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password"  onChange={handleRegisterChange} placeholder='Enter password'/>
                            { errors.messageP && <small style={{color:"red"}}>{errors.messageP}</small>}
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Register</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
