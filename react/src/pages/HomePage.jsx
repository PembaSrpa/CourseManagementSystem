import React from "react";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

import { useAppContext } from "../context/AppContext";

// Simple Card component
const Card = ({ title, data }) => (
    <div className='bg-white shadow-md rounded p-4 m-2 w-64'>
        <h3 className='font-bold text-lg mb-2'>{title}</h3>
        <ul>
            {data && data.length > 0 ? (
                data.map((item) => (
                    <li key={item.id || item}>{item.name || item}</li>
                ))
            ) : (
                <li>No data</li>
            )}
        </ul>
    </div>
);

// Navbar component
const Navbar = () => (
    <nav className='flex justify-between items-center bg-blue-700 p-4'>
        <div className='text-white font-bold text-xl'>My App</div>
        <Button>
            <NavLink to='/login' className='flex items-center'>
                <span className='text-white'>Become an Admin</span>
            </NavLink>
        </Button>
    </nav>
);

// Body component
const Body = () => {
    const { courses, teachers, students } = useAppContext();

    return (
        <div className='flex flex-wrap justify-center my-8'>
            <Card title='Courses' data={courses} />
            <Card title='Teachers' data={teachers} />
            <Card title='Students' data={students} />
        </div>
    );
};

// ContactUs component
const ContactUs = () => (
    <div className='max-w-md mx-auto my-8 p-6 bg-gray-100 rounded shadow'>
        <h2 className='text-xl font-bold mb-4'>Contact Us</h2>
        <form className='flex flex-col gap-4'>
            <input
                type='email'
                placeholder='Your Email'
                className='p-2 border rounded'
                required
            />
            <textarea
                placeholder='Your Message'
                className='p-2 border rounded'
                rows={4}
                required
            />
            <Button type='submit'>Send</Button>
        </form>
    </div>
);

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Body />
            <ContactUs />
        </>
    );
};

export default HomePage;
