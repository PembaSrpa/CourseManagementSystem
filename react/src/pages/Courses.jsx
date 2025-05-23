import { useState, useEffect, lazy, Suspense } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

// Lazy load components
const DataTable = lazy(() => import("../components/DataTable"));
const Button = lazy(() => import("../components/Button"));

const Courses = () => {
    const { courses, getCourses } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [editing, setEditing] = useState(false);

    // Add loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetch
        const timer = setTimeout(() => {
            getCourses();
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, []);

    const handleEdit = (row) => {
        setFormData({
            id: row.id,
            name: row.name,
            description: row.description,
        });
        setEditing(true);
        setShowForm(true);
    };

    const handleDelete = (row) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            deletecourse(row.id);
            getCourses();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.description) {
            if (editing === true) {
                updatecourse(formData.id);
                getCourses();
            } else {
                addcourse();
                getCourses();
            }
        }
        setShowForm(false);
        setFormData({ name: "", description: "" });
        setEditing(null);
    };

    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
    ];

    const addcourse = async () => {
        await axios
            .post("http://localhost:5050/api/createcourse", {
                name: formData.name,
                description: formData.description,
            })
            .then((response) => {
                console.log(response.data);
                setFormData({ name: "", description: "" });
            })
            .catch((error) => {
                console.error("Error creating course:", error);
            });
    };

    const updatecourse = async (id) => {
        await axios
            .post(`http://localhost:5050/api/updatecourse/${id}`, {
                name: formData.name,
                description: formData.description,
            })
            .then((response) => {
                console.log(response.data);
                setFormData({ name: "", description: "" });
            })
            .catch((error) => {
                console.error("Error updating course:", error);
            });
    };

    const deletecourse = async (id) => {
        await axios
            .post(`http://localhost:5050/api/deletecourse/${id}`)
            .then((response) => {
                console.log(response.data);
                setFormData({ name: "", description: "" });
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
            });
    };

    if (loading) {
        return <div className='text-gray-500'>Loading Courses...</div>;
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold'>Courses</h1>
                <Suspense fallback={<span>Loading...</span>}>
                    <Button
                        onClick={() => {
                            setShowForm(!showForm);
                            setFormData({ name: "", description: "" });
                            setEditing(null);
                        }}
                    >
                        {showForm ? "Cancel" : "Add Course"}
                    </Button>
                </Suspense>
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
                        <Suspense fallback={<span>Loading...</span>}>
                            <Button type='submit'>Save</Button>
                        </Suspense>
                    </form>
                </div>
            )}

            <Suspense fallback={<span>Loading table...</span>}>
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
