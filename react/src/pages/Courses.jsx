import { lazy, Suspense, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Button from "../components/Button";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const DataTable = lazy(() => import("../components/DataTable"));

const Courses = () => {
    const { courses, getCourses } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const initial = { name: "", description: "" };
    const [formData, setFormData] = useState(initial);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            await getCourses();
            setLoading(false);
        };
        fetchCourses();
        // eslint-disable-next-line
    }, []);

    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
    ];

    const handleEdit = (row) => {
        setFormData({
            id: row.id,
            name: row.name,
            description: row.description,
        });
        setEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (row) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteCourse(row.id);
            await getCourses();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.description) {
            if (editing === true) {
                await updateCourse(formData.id);
                await getCourses();
            } else {
                await addCourse();
                await getCourses();
            }
            setShowForm(false);
            setFormData(initial);
            setEditing(null);
        }
    };

    const addCourse = async () => {
        await axios
            .post("http://localhost:5050/api/createcourse", {
                name: formData.name,
                description: formData.description,
            })
            .then((response) => {
                console.log(response.data);
                setFormData(initial);
            })
            .catch((error) => {
                console.error("Error creating course:", error);
            });
    };

    const updateCourse = async (id) => {
        await axios
            .post(`http://localhost:5050/api/updatecourse/${id}`, {
                name: formData.name,
                description: formData.description,
            })
            .then((response) => {
                console.log(response.data);
                setFormData(initial);
            })
            .catch((error) => {
                console.error("Error updating course:", error);
            });
    };

    const deleteCourse = async (id) => {
        await axios
            .post(`http://localhost:5050/api/deletecourse/${id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
            });
    };

    if (loading) {
        return (
            <div className='flex items-center text-gray-500'>
                <FaSpinner className='animate-spin mr-2' /> Loading Courses...
            </div>
        );
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold mb-6'>Courses</h1>
                <Button
                    onClick={() => {
                        setShowForm(!showForm);
                        setFormData(initial);
                        setEditing(null);
                    }}
                >
                    {showForm ? "Cancel" : "Add Course"}
                </Button>
            </div>
            {showForm && (
                <div className='mb-6 p-4 border rounded-lg'>
                    <h2 className='text-lg font-semibold mb-4'>
                        {editing ? "Edit Course" : "Add New Course"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label className='block mb-2'>Name</label>
                            <input
                                type='text'
                                className='w-full p-2 border rounded'
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2'>Description</label>
                            <textarea
                                className='w-full p-2 border rounded'
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <Button type='submit'>Save</Button>
                    </form>
                </div>
            )}
            <Suspense
                fallback={
                    <div className='flex items-center'>
                        <FaSpinner className='animate-spin mr-2' /> Loading
                        table...
                    </div>
                }
            >
                <DataTable
                    data={courses}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Suspense>
        </div>
    );
};

export default Courses;
