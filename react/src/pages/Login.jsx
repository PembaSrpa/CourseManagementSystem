import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Button from "../components/Button";

const Login = () => {
    const [logData, setLogData] = React.useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const handleLog = (e) => {
        const { name, value } = e.target;
        setLogData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(
                "http://localhost:5050/api/checkUserLogin",
                logData
            );
            if (res.data && (res.data.result || res.data.user)) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.result || res.data.user)
                );
                setTimeout(() => {
                    navigate("/dashboard");
                }, 100);
            } else {
                setError("Invalid email or password");
                setLogData((prev) => ({
                    ...prev,
                    password: "",
                }));
            }
        } catch (err) {
            setError("Invalid email or password");
            setLogData((prev) => ({
                ...prev,
                password: "",
            }));
        }
        setLoading(false);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200'>
            <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-100 relative'>
                {/* Cross icon in top-right corner */}
                <Button
                    className='absolute top-4 right-4 bg-transparent hover:bg-gray-100 rounded-full'
                    onClick={() => navigate("/home")}
                    aria-label='Back to Home'
                >
                    <FaUserCircle className='hidden' />{" "}
                    <span className='sr-only'>Back to Home</span>
                    <ImCancelCircle className=' h-6 w-6 text-gray-500 hover:text-gray-700' />
                </Button>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-blue-600 rounded-full p-3 mb-2'>
                        <FaUserCircle className='w-8 h-8 text-white' />
                    </div>
                    <h1 className='text-3xl font-extrabold text-blue-700 mb-1'>
                        Welcome Back
                    </h1>
                    <p className='text-gray-500 text-sm'>
                        Sign in to your account
                    </p>
                </div>
                <form onSubmit={handleLogin} className='space-y-5'>
                    <div>
                        <label className='block text-gray-700 mb-1 font-medium'>
                            Email
                        </label>
                        <input
                            onChange={handleLog}
                            type='email'
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                            placeholder='Enter your email'
                            name='email'
                            value={logData.email}
                            required
                            autoComplete='username'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 mb-1 font-medium'>
                            Password
                        </label>
                        <input
                            type='password'
                            onChange={handleLog}
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                            placeholder='Enter your password'
                            name='password'
                            value={logData.password}
                            required
                            autoComplete='current-password'
                        />
                    </div>
                    {error && (
                        <div className='text-red-600 text-sm text-center'>
                            {error}
                        </div>
                    )}
                    <button
                        className={`w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition flex items-center justify-center ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <FaSpinner className='animate-spin h-5 w-5 mr-2 text-white' />
                        ) : null}
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                {/* <div className='mt-6 text-center text-sm text-gray-500'>
                    Don't have an account?{" "}
                    <a
                        href='/register'
                        className='text-blue-600 hover:underline'
                    >
                        Sign up
                    </a>
                </div> */}
            </div>
        </div>
    );
};

export default Login;
