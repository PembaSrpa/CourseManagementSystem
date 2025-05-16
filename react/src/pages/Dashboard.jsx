import { useAppContext } from "../context/AppContext";
import Card from "../components/Card";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
    const { user, courses, students, teachers } = useAppContext();

    return (
        <div className='ml-64 p-6'>
            <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                <Card className='p-6 bg-blue-50 border-blue-100'>
                    <h2 className='text-lg font-semibold text-blue-800 mb-2'>
                        Total Courses
                    </h2>
                    <p className='text-3xl font-bold text-blue-600'>
                        {courses.length}
                    </p>
                </Card>

                <Card className='p-6 bg-green-50 border-green-100'>
                    <h2 className='text-lg font-semibold text-green-800 mb-2'>
                        Total Students
                    </h2>
                    <p className='text-3xl font-bold text-green-600'>
                        {students.length}
                    </p>
                </Card>

                <Card className='p-6 bg-purple-50 border-purple-100'>
                    <h2 className='text-lg font-semibold text-purple-800 mb-2'>
                        Total Teachers
                    </h2>
                    <p className='text-3xl font-bold text-purple-600'>
                        {teachers.length}
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
