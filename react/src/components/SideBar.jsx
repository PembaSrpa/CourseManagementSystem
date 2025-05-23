import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiUsers, FiUser } from "react-icons/fi";
import Button from "./Button";
import React from "react";

const navLinks = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: <FiHome className='w-5 h-5' />,
    },
];

const resourceLinks = [
    { to: "/courses", label: "Courses", icon: <FiBook className='w-5 h-5' /> },
    {
        to: "/students",
        label: "Students",
        icon: <FiUsers className='w-5 h-5' />,
    },
    {
        to: "/teachers",
        label: "Teachers",
        icon: <FiUser className='w-5 h-5' />,
    },
    {
        to: "/subjects",
        label: "Subjects",
        icon: <FiBook className='w-5 h-5' />,
    },
];

const SidebarContent = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    return (
        <div className='p-6 flex-1 flex flex-col'>
            <div className='mb-8 flex items-center justify-center'>
                <span className='text-xl font-bold text-blue-700 tracking-wide'>
                    Admin
                </span>
            </div>

            <nav>
                {navLinks.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 p-2 rounded transition-colors ${
                                isActive
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "hover:bg-blue-50 text-gray-700"
                            }`
                        }
                    >
                        {icon}
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className='mt-10 flex-1'>
                <h3 className='text-xs font-bold text-gray-500 uppercase tracking-wider mb-3'>
                    Resources
                </h3>
                <nav className='space-y-1'>
                    {resourceLinks.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 p-2 rounded transition-colors ${
                                    isActive
                                        ? "bg-blue-100 text-blue-700 font-semibold"
                                        : "hover:bg-blue-50 text-gray-700"
                                }`
                            }
                        >
                            {icon}
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
            

            <div className='mt-auto'>
                <Button className='w-full' onClick={handleLogout}>
                    <span className='flex items-center justify-center space-x-2 p-2 rounded hover:bg-gray-200 text-red-600 font-semibold'>
                        Logout
                    </span>
                </Button>
            </div>
        </div>
    );
};

const Sidebar = () => (
    <aside className='w-64 bg-gray-100 shadow-lg h-full fixed flex flex-col'>
        <SidebarContent />
    </aside>
);

export default Sidebar;
