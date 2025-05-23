import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [logData, setLogData] = React.useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleLog = (e) => {
        const { name, value } = e.target;
        setLogData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5050/api/checkUserLogin",
                logData
            );
            console.log("Login response:", res.data);

            // Check for a successful login (adjust according to your API)
            if (res.data && (res.data.result || res.data.user)) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.result || res.data.user)
                );
                console.log("Login successful");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 100); // Delay to allow alert to close
            } else {
                alert("Invalid email or password");
                setLogData((prev) => ({
                    ...prev,
                    password: "",
                }));
            }
        } catch (err) {
            alert("Invalid email or password");
            setLogData((prev) => ({
                ...prev,
                password: "",
            }));
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h1 className='text-3xl font-bold mb-4'>Login</h1>
            <form
                className='bg-white rounded shadow p-6 w-full max-w-sm'
                onSubmit={handleLogin}
            >
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-1'>Email</label>
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
                    <label className='block text-gray-700 mb-1'>Password</label>
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
    );
};

export default Login;
