import { lazy, Suspense, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Button from "../components/Button";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // <-- Add this line

// Lazy load DataTable
const DataTable = lazy(() => import("../components/DataTable"));

const Students = () => {
    const { students, getStudents } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const initial = {
        name: "",
        email: "",
        course: "",
    };
    const [formData, setFormData] = useState(initial);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            await getStudents();
            setLoading(false);
        };
        fetchStudents();
        // eslint-disable-next-line
    }, []);

    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "course", title: "Course" },
    ];

    const handleEdit = (row) => {
        setFormData({
            id: row.id,
            name: row.name,
            email: row.email,
            course: row.course,
        });
        setEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (row) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            await deleteStudent(row.id);
            await getStudents();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.course) {
            if (editing === true) {
                await updateStudent(formData.id);
                await getStudents();
            } else {
                await addStudent();
                await getStudents();
            }
            setShowForm(false);
            setFormData({ name: "", email: "", course: "" });
            setEditing(null);
        }
    };

    const addStudent = async () => {
        await axios
            .post("http://localhost:5050/api/createstudent", {
                name: formData.name,
                email: formData.email,
                course: formData.course,
            })
            .then((response) => {
                console.log(response.data);
                setFormData({ name: "", email: "", course: "" });
            })
            .catch((error) => {
                console.error("Error creating student:", error);
            });
    };

    const updateStudent = async (id) => {
        await axios
            .post(`http://localhost:5050/api/updatestudent/${id}`, {
                name: formData.name,
                email: formData.email,
                course: formData.course,
            })
            .then((response) => {
                console.log(response.data);
                setFormData({ name: "", email: "", course: "" });
            })
            .catch((error) => {
                console.error("Error updating student:", error);
            });
    };

    const deleteStudent = async (id) => {
        await axios
            .post(`http://localhost:5050/api/deletestudent/${id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error deleting student:", error);
            });
    };

    if (loading) {
        return (
            <div className='flex items-center text-gray-500'>
                <FaSpinner className='animate-spin mr-2' /> Loading Students...
            </div>
        );
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold mb-6'>Students</h1>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add Student"}
                </Button>
            </div>
            {showForm && (
                <div className='mb-6 p-4 border rounded-lg'>
                    <h2 className='text-lg font-semibold mb-4'>
                        {editing ? "Edit Student" : "Add New Student"}
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
                            <label className='block mb-2'>Email</label>
                            <input
                                type='text'
                                className='w-full p-2 border rounded'
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2'>Course</label>
                            <input
                                type='text'
                                className='w-full p-2 border rounded'
                                value={formData.course}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        course: e.target.value,
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
                    data={students}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Suspense>
        </div>
    );
};

export default Students;
