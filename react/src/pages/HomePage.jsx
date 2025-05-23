import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import bgImg from "../assets/bg.jpg";

// Simple Card component
const Card = ({ title, data }) => (
    <div className='bg-white shadow-lg rounded-2xl p-8 m-6 w-80 transition-transform hover:scale-105 border border-gray-100'>
        <h3 className='font-bold text-2xl mb-6 text-blue-700'>{title}</h3>
        <ul>
            {data && data.length > 0 ? (
                data.map((item) => (
                    <li key={item.id || item} className='mb-4'>
                        {title === "Courses" && (
                            <>
                                <span className='font-semibold text-lg text-gray-800'>
                                    {item.name}
                                </span>
                                {item.description && (
                                    <span className='text-gray-500 block text-sm mt-1'>
                                        {item.description}
                                    </span>
                                )}
                            </>
                        )}
                        {title === "Students" && (
                            <>
                                <span className='font-semibold text-lg text-gray-800'>
                                    {item.name}
                                </span>
                                {item.course && (
                                    <span className='text-gray-500 block text-sm mt-1'>
                                        Course: {item.course}
                                    </span>
                                )}
                            </>
                        )}
                        {title === "Teachers" && (
                            <>
                                <span className='font-semibold text-lg text-gray-800'>
                                    {item.name}
                                </span>
                                {item.subject && (
                                    <span className='text-gray-500 block text-sm mt-1'>
                                        Subject: {item.subject}
                                    </span>
                                )}
                            </>
                        )}
                        {title === "Subjects" && (
                            <>
                                <span className='font-semibold text-lg text-gray-800'>
                                    {item.subject}
                                </span>
                                {item.code && (
                                    <span className='text-gray-500 block text-sm mt-1'>
                                        Code: {item.code}
                                    </span>
                                )}
                            </>
                        )}
                        {/* fallback for plain string */}
                        {!item.name && typeof item === "string" && (
                            <span>{item}</span>
                        )}
                    </li>
                ))
            ) : (
                <li className='text-gray-400 italic'>No data</li>
            )}
        </ul>
    </div>
);

// Navbar component
const Navbar = () => (
    <nav className='flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-5 shadow-md'>
        <div className='text-white font-extrabold text-3xl tracking-wide drop-shadow-lg'>
            Course Management System
        </div>
        <Button className='bg-white hover:bg-blue-100 text-blue-700 font-semibold px-5 py-2 rounded-lg shadow transition'>
            <NavLink to='/register' className='text-blue-700'>
                Register
            </NavLink>
        </Button>
    </nav>
);

const Head = () => (
    <div
        className='mx-auto mt-5 w-11/12 md:w-4/5 rounded-3xl overflow-hidden relative shadow-xl'
        style={{ height: "50vh", minHeight: 220, maxWidth: 1100 }}
    >
        <img
            src={bgImg}
            alt='Background'
            className='absolute inset-0 w-full h-full object-cover brightness-75'
            style={{ height: "100%" }}
        />
        <div className='relative z-10 flex flex-col justify-center h-full pl-10'>
            <h1 className='text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg'>
                Welcome to CMS
            </h1>
            <Button className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition w-fit'>
                <NavLink to='/login' className='text-white'>
                    Become an Admin
                </NavLink>
            </Button>
        </div>
    </div>
);

// Body component
const Body = () => {
    const { courses, teachers, students, subjects } = useAppContext();

    return (
        <div className='flex flex-wrap justify-center gap-8 my-5 w-full'>
            <Card title='Courses' data={courses} />
            <Card title='Teachers' data={teachers} />
            <Card title='Students' data={students} />
            <Card title='Subjects' data={subjects} />
        </div>
    );
};

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Head />
            <Body />
        </>
    );
};

export default HomePage;
