import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
    const { courses, students, teachers } = useAppContext();

    return (
        <div className='w-64 bg-gray-300 shadow-md h-full fixed'>
            <div className='p-4'>
                <div className='text-center'>
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
                        <h1 className='text-3xl font-bold p-1'>Home</h1>
                    </NavLink>
                </div>

                <div className='mt-8'>
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
            </div>
        </div>
    );
};

export default Sidebar;
