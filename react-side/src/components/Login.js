import React, { useState } from "react";   
import './Login.css';
import axios from "axios";    
import { useNavigate } from "react-router-dom";  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    // var status;
    // console.log("type",typeof status);
    const navigate = useNavigate()
    const [data, setData] = useState({
        email : "",
        password : "",
        role: "",
    })
    const showToastMessage1 = () => {
        toast.error('Login failed !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showToastMessage = () => {
        toast.success('Login Successfull !', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const url = "http://localhost:9000/login"
    function submit(e) {
        if ((data.email !== '') && (data.password !== '')){
        console.log("submit");  
        e.preventDefault()
        axios.post(url, {
            email: data.email,
            password: data.password,
            role: data.role,
        }).then(res => {
            function toastMessage(){
                if(res.data.sucess=="True"){
                    showToastMessage()
                }else if(res.data.sucess=="False"){
                    showToastMessage1()
                }
            }
            toastMessage()
            if(res.data.sucess == "True"){
                let role = res.data.role;
                if(role=='User'){
                    navigate('/User');
                }else if (role=='Admin'){
                    navigate('/Admin')
                }
                else {
                    toast.error('Please select the role!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    e.preventDefault()
                }
            }
    })}
    else {
        toast.error('Please enter all details !', {
            position: toast.POSITION.TOP_CENTER
        });
        e.preventDefault()
    }
    }
    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    return (
        <div className="login-form">
            <div>
            <h1 className="heading">Log in</h1>
            </div>
            <div>
            <form onSubmit={(e)=>submit(e)}>
                <input onChange={(e) => handle(e)} type="email" id="email" placeholder="Email" className="input-box" value={data.email}/><br /><br />
                <input onChange={(e) => handle(e)} type="password" id="password" placeholder="Password" className="input-box" value={data.password}/><br /><br />
                <select onChange={(e) => handle(e)} id="role" className="input-box drop-box" required>
                <option value="null" disabled selected><strong>Select Your Role</strong></option>
                    <option value="Admin"><strong>Admin</strong></option>
                    <option value="User"><strong>User</strong></option>
                </select><br /><br />
                <button type="submit" className="btn input-box">Log in</button>
            </form>
            </div>
        </div>
    )
}
export default Login;