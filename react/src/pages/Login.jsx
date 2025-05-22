import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [logData, setLogData] = React.useState({
        email: "",
        password: "",
    });
    const handleLog = (e) => {
        setLogData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const checkLogin = async (e) => {
        e.preventDefault();
        await axios
            .post("http://localhost:5050/api/checkUserLogin", logData)
            .then((res) => {
                console.log(res.message);
                setLoggedIn(true);
                setLogData({
                    email: "",
                    password: "",
                });
            })
            .catch((err) => {
                console.log(err, ":error in get form data");
                setLoggedIn(false);
            });
    };
    return (
        <>
            {loggedIn && <Navigate to='/dashboard' replace />}
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <h1 className='text-3xl font-bold mb-4'>Login</h1>
                <form
                    className='bg-white rounded shadow p-6 w-full max-w-sm'
                    onSubmit={checkLogin}
                >
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-1'>
                            Email
                        </label>
                        <input
                            onChange={handleLog}
                            type='email'
                            className='w-full border border-gray-300 rounded px-3 py-2'
                            placeholder='Email'
                            name='email'
                            value={logData.email}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-1'>
                            Password
                        </label>
                        <input
                            type='password'
                            onChange={handleLog}
                            className='w-full border border-gray-300 rounded px-3 py-2'
                            placeholder='Password'
                            name='password'
                            value={logData.password}
                            required
                        />
                    </div>
                    <button
                        className='w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition'
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
