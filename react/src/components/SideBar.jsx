import { NavLink } from "react-router-dom";
import Button from "./Button";
import { FiHome } from "react-icons/fi";

const Sidebar = () => {
    return (
        <div className='w-64 bg-gray-300 shadow-md h-full fixed flex flex-col'>
            <div className='p-4 flex-1 flex flex-col'>
                <div className='flex items-center justify-center'>
                    <NavLink
                        to='/dashboard'
                        className={({ isActive }) =>
                            `block p-2 rounded ${
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "hover:bg-gray-50"
                            }`
                        }
                    >
                        <FiHome className='text-6xl' />
                    </NavLink>
                </div>

                <div className='mt-8 flex-1'>
                    <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2'>
                        Resources
                    </h3>
                    <div className='space-y-1'>
                        <NavLink
                            to='/courses'
                            className={({ isActive }) =>
                                `flex justify-between items-center p-2 rounded ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "hover:bg-gray-50"
                                }`
                            }
                        >
                            <span>Courses</span>
                        </NavLink>

                        <NavLink
                            to='/students'
                            className={({ isActive }) =>
                                `flex justify-between items-center p-2 rounded ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "hover:bg-gray-50"
                                }`
                            }
                        >
                            <span>Students</span>
                        </NavLink>

                        <NavLink
                            to='/teachers'
                            className={({ isActive }) =>
                                `flex justify-between items-center p-2 rounded ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "hover:bg-gray-50"
                                }`
                            }
                        >
                            <span>Teachers</span>
                        </NavLink>
                    </div>
                </div>
                <div className='mt-auto ml-15'>
                    <Button>
                        <NavLink
                            to='/'
                            className='flex justify-between items-center p-2 rounded hover:bg-gray-50'
                        >
                            Logout
                        </NavLink>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
