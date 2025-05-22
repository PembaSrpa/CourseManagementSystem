import React from "react";
import axios from "axios";

const Login = () => {
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
            .post("http://localhost:5055/api/checkUserLogin", logData)
            .then((res) => {
                console.log(res.message);
                setLogData({
                    email: "",
                    password: "",
                });
            })
            .catch((err) => {
                console.log(err, ":error in get form data");
            });
    };
    return (
        <>
            <div className='LoginForm container mx-auto mt-5 flex flex-col items-center justify-center'>
                <h2 className='text-2xl font-bold mb-4'>Login Form</h2>
                <form
                    className='bg-yellow-200 rounded-2xl p-8 border-black border-2 w-[30vw]'
                    onSubmit={checkLogin}
                >
                    <div className='mb-4'>
                        <label className='block text-sm text-gray-700'>
                            Email :
                        </label>
                        <input
                            onChange={handleLog}
                            type='email'
                            className='w-full border border-gray-300 rounded-md p-2'
                            placeholder='Enter your email'
                            name='email'
                            value={logData.email}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm text-gray-700'>
                            Password :
                        </label>
                        <input
                            type='password'
                            onChange={handleLog}
                            className='w-full border border-gray-300 rounded-md p-2'
                            placeholder='Enter your password'
                            name='password'
                            value={logData.password}
                            required
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <button
                            className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
                            type='submit'
                        >
                            <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                                Login
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
