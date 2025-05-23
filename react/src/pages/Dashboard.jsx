import { useAppContext } from "../context/AppContext";
import React, { Suspense } from "react";
import {
    FaBook,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaArrowUp,
} from "react-icons/fa";

const Card = React.lazy(() => import("../components/Card"));

const Dashboard = () => {
    const { courses, students, teachers } = useAppContext();

    // Get recent items (show last 5)
    const recentCourses = courses.slice(-5).reverse();
    const recentStudents = students.slice(-5).reverse();
    const recentTeachers = teachers.slice(-5).reverse();

    return (
        <div className='p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen'>
            <h1 className='text-3xl font-extrabold mb-8 text-blue-900 flex items-center gap-2'>
                <FaArrowUp className='text-blue-500 animate-bounce' /> Dashboard
                Overview
            </h1>
            <Suspense fallback={<div>Loading...</div>}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
                    <Card className='p-6 bg-blue-100 border-blue-200 shadow-lg hover:scale-105 transition-transform'>
                        <div className='flex items-center gap-3 mb-2'>
                            <FaBook className='text-2xl text-blue-700' />
                            <h2 className='text-lg font-semibold text-blue-800'>
                                Total Courses
                            </h2>
                        </div>
                        <p className='text-4xl font-extrabold text-blue-700 animate-pulse'>
                            {courses.length}
                        </p>
                    </Card>

                    <Card className='p-6 bg-green-100 border-green-200 shadow-lg hover:scale-105 transition-transform'>
                        <div className='flex items-center gap-3 mb-2'>
                            <FaUserGraduate className='text-2xl text-green-700' />
                            <h2 className='text-lg font-semibold text-green-800'>
                                Total Students
                            </h2>
                        </div>
                        <p className='text-4xl font-extrabold text-green-700 animate-pulse'>
                            {students.length}
                        </p>
                    </Card>

                    <Card className='p-6 bg-purple-100 border-purple-200 shadow-lg hover:scale-105 transition-transform'>
                        <div className='flex items-center gap-3 mb-2'>
                            <FaChalkboardTeacher className='text-2xl text-purple-700' />
                            <h2 className='text-lg font-semibold text-purple-800'>
                                Total Teachers
                            </h2>
                        </div>
                        <p className='text-4xl font-extrabold text-purple-700 animate-pulse'>
                            {teachers.length}
                        </p>
                    </Card>
                </div>

                {/* Recent Added Section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Card className='p-4 bg-white border-blue-100 shadow hover:shadow-lg transition-shadow'>
                        <h3 className='font-semibold mb-3 text-blue-700 flex items-center gap-2'>
                            <FaBook /> Recently Added Courses
                        </h3>
                        <ul className='text-sm'>
                            {recentCourses.length === 0 ? (
                                <li className='text-gray-400 italic'>
                                    No courses found.
                                </li>
                            ) : (
                                recentCourses.map((course, idx) => (
                                    <li
                                        key={course.id}
                                        className='mb-1 flex items-center gap-2'
                                    >
                                        <span className='w-2 h-2 bg-blue-400 rounded-full inline-block'></span>
                                        <span className='font-medium'>
                                            {course.name}
                                        </span>
                                        <span className='text-xs text-gray-400 ml-auto'>
                                            #{courses.length - idx}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </Card>
                    <Card className='p-4 bg-white border-green-100 shadow hover:shadow-lg transition-shadow'>
                        <h3 className='font-semibold mb-3 text-green-700 flex items-center gap-2'>
                            <FaUserGraduate /> Recently Added Students
                        </h3>
                        <ul className='text-sm'>
                            {recentStudents.length === 0 ? (
                                <li className='text-gray-400 italic'>
                                    No students found.
                                </li>
                            ) : (
                                recentStudents.map((student, idx) => (
                                    <li
                                        key={student.id}
                                        className='mb-1 flex items-center gap-2'
                                    >
                                        <span className='w-2 h-2 bg-green-400 rounded-full inline-block'></span>
                                        <span className='font-medium'>
                                            {student.name}
                                        </span>
                                        <span className='text-xs text-gray-400 ml-auto'>
                                            #{students.length - idx}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </Card>
                    <Card className='p-4 bg-white border-purple-100 shadow hover:shadow-lg transition-shadow'>
                        <h3 className='font-semibold mb-3 text-purple-700 flex items-center gap-2'>
                            <FaChalkboardTeacher /> Recently Added Teachers
                        </h3>
                        <ul className='text-sm'>
                            {recentTeachers.length === 0 ? (
                                <li className='text-gray-400 italic'>
                                    No teachers found.
                                </li>
                            ) : (
                                recentTeachers.map((teacher, idx) => (
                                    <li
                                        key={teacher.id}
                                        className='mb-1 flex items-center gap-2'
                                    >
                                        <span className='w-2 h-2 bg-purple-400 rounded-full inline-block'></span>
                                        <span className='font-medium'>
                                            {teacher.name}
                                        </span>
                                        <span className='text-xs text-gray-400 ml-auto'>
                                            #{teachers.length - idx}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    </Card>
                </div>
            </Suspense>
        </div>
    );
};

export default Dashboard;
