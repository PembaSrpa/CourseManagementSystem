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
    const { courses, students, teachers, subjects } = useAppContext();

    // Get recent items (show last 5)
    const recentCourses = courses.slice(-5).reverse();
    const recentStudents = students.slice(-5).reverse();
    const recentTeachers = teachers.slice(-5).reverse();
    const recentSubjects = subjects.slice(-5).reverse();

    return (
        <div className='p-6 min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100'>
            <h1 className='text-4xl font-black mb-10 text-blue-900 flex items-center gap-3 drop-shadow-lg'>
                <FaArrowUp className='text-blue-500 animate-bounce' /> Dashboard
                Overview
            </h1>
            <Suspense fallback={<div>Loading...</div>}>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
                    <Card className='p-7 bg-blue-200 border-2 border-blue-300 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200'>
                        <div className='flex items-center gap-4 mb-3'>
                            <FaBook className='text-3xl text-blue-700 drop-shadow' />
                            <h2 className='text-xl font-bold text-blue-800'>
                                Total Courses
                            </h2>
                        </div>
                        <p className='text-5xl font-extrabold text-blue-700 animate-pulse'>
                            {courses.length}
                        </p>
                    </Card>
                    <Card className='p-7 bg-green-200 border-2 border-green-300 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200'>
                        <div className='flex items-center gap-4 mb-3'>
                            <FaUserGraduate className='text-3xl text-green-700 drop-shadow' />
                            <h2 className='text-xl font-bold text-green-800'>
                                Total Students
                            </h2>
                        </div>
                        <p className='text-5xl font-extrabold text-green-700 animate-pulse'>
                            {students.length}
                        </p>
                    </Card>
                    <Card className='p-7 bg-purple-200 border-2 border-purple-300 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200'>
                        <div className='flex items-center gap-4 mb-3'>
                            <FaChalkboardTeacher className='text-3xl text-purple-700 drop-shadow' />
                            <h2 className='text-xl font-bold text-purple-800'>
                                Total Teachers
                            </h2>
                        </div>
                        <p className='text-5xl font-extrabold text-purple-700 animate-pulse'>
                            {teachers.length}
                        </p>
                    </Card>
                    <Card className='p-7 bg-yellow-200 border-2 border-yellow-300 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200'>
                        <div className='flex items-center gap-4 mb-3'>
                            <FaBook className='text-3xl text-yellow-700 drop-shadow' />
                            <h2 className='text-xl font-bold text-yellow-800'>
                                Total Subjects
                            </h2>
                        </div>
                        <p className='text-5xl font-extrabold text-yellow-700 animate-pulse'>
                            {subjects.length}
                        </p>
                    </Card>
                </div>

                {/* Recent Added Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    <Card className='p-5 bg-white border border-blue-200 rounded-xl shadow hover:shadow-xl transition-shadow'>
                        <h3 className='font-bold mb-4 text-blue-700 flex items-center gap-2 text-lg'>
                            <FaBook /> Recently Added Courses
                        </h3>
                        <ul className='text-base space-y-2'>
                            {recentCourses.length === 0 ? (
                                <li className='text-gray-400 italic'>
                                    No courses found.
                                </li>
                            ) : (
                                recentCourses.map((course, idx) => (
                                    <li
                                        key={course.id}
                                        className='flex items-center gap-3'
                                    >
                                        <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
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
                    <Card className='p-5 bg-white border border-green-200 rounded-xl shadow hover:shadow-xl transition-shadow'>
                        <h3 className='font-bold mb-4 text-green-700 flex items-center gap-2 text-lg'>
                            <FaUserGraduate /> Recently Added Students
                        </h3>
                        <ul className='text-base space-y-2'>
                            {recentStudents.length === 0 ? (
                                <li className='text-gray-400 italic'>
                                    No students found.
                                </li>
                            ) : (
                                recentStudents.map((student, idx) => (
                                    <li
                                        key={student.id}
                                        className='flex items-center gap-3'
                                    >
                                        <span className='w-2 h-2 bg-green-400 rounded-full'></span>
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
                    <Card className='p-5 bg-white border border-purple-200 rounded-xl shadow hover:shadow-xl transition-shadow'>
                        <h3 className='font-bold mb-4 text-purple-700 flex items-center gap-2 text-lg'>
                            <FaChalkboardTeacher /> Recently Added Teachers
                        </h3>
                        <ul className='text-base space-y-2'>
                            {recentTeachers.length === 0 ? (
                                <li className='text-gray-400 italic'>
                                    No teachers found.
                                </li>
                            ) : (
                                recentTeachers.map((teacher, idx) => (
                                    <li
                                        key={teacher.id}
                                        className='flex items-center gap-3'
                                    >
                                        <span className='w-2 h-2 bg-purple-400 rounded-full'></span>
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
                    <Card className='p-5 bg-white border border-yellow-200 rounded-xl shadow hover:shadow-xl transition-shadow'>
                        <h3 className='font-bold mb-4 text-yellow-700 flex items-center gap-2 text-lg'>
                            <FaBook /> Recently Added Subjects
                        </h3>
                        <ul className='text-base space-y-2'>
                            {recentSubjects.length === 0 ? (
                                <li className='text-gray-400 italic'>
                                    No subjects found.
                                </li>
                            ) : (
                                recentSubjects.map((subject, idx) => (
                                    <li
                                        key={subject.id}
                                        className='flex items-center gap-3'
                                    >
                                        <span className='w-2 h-2 bg-yellow-400 rounded-full'></span>
                                        <span className='font-medium'>
                                            {subject.name}
                                        </span>
                                        <span className='text-xs text-gray-400 ml-auto'>
                                            #{subjects.length - idx}
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
