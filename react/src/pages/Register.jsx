import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Button from "../components/Button";

const Register = () => {
    const [regData, setRegData] = React.useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const navigate = useNavigate();

    const handleReg = (e) => {
        const { name, value } = e.target;
        setRegData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError("");
        setSuccess("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await axios.post(
                "http://localhost:5050/api/addUser",
                regData
            );
            if (res.data && (res.data.result || res.data.user)) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 1200);
            } else {
                setError(res.data?.message || "Registration failed");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Registration failed. Please try again."
            );
        }
        setLoading(false);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200'>
            <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-100 relative'>
                <Button
                    className='absolute top-4 right-4 bg-transparent hover:bg-gray-100 rounded-full'
                    onClick={() => navigate("/home")}
                    aria-label='Back to Home'
                >
                    <span className='sr-only'>Back to Home</span>
                    <ImCancelCircle className=' h-6 w-6 text-gray-500 hover:text-gray-700' />
                </Button>
                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-blue-600 rounded-full p-3 mb-2'>
                        <FaUserPlus className='w-8 h-8 text-white' />
                    </div>
                    <h1 className='text-3xl font-extrabold text-blue-700 mb-1'>
                        Create Account
                    </h1>
                    <p className='text-gray-500 text-sm'>
                        Sign up to get started
                    </p>
                </div>
                <form onSubmit={handleRegister} className='space-y-5'>
                    <div>
                        <label className='block text-gray-700 mb-1 font-medium'>
                            Email
                        </label>
                        <input
                            onChange={handleReg}
                            type='email'
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                            placeholder='Enter your email'
                            name='email'
                            value={regData.email}
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
                            onChange={handleReg}
                            className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
                            placeholder='Enter your password'
                            name='password'
                            value={regData.password}
                            required
                            autoComplete='new-password'
                        />
                    </div>
                    {error && (
                        <div className='text-red-600 text-sm text-center'>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className='text-green-600 text-sm text-center'>
                            {success}
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
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <div className='mt-6 text-center text-sm text-gray-500'>
                    Already have an account?{" "}
                    <NavLink
                        to='/login'
                        className='text-blue-600 hover:underline'
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;
