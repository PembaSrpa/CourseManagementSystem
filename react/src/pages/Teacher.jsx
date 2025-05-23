import { lazy, Suspense, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Button from "../components/Button";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // <-- Add this line

// Lazy load DataTable
const DataTable = lazy(() => import("../components/DataTable"));

const Teachers = () => {
    const { teachers, getTeachers } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const initial = {
        name: "",
        email: "",
        subject: "",
    };
    const [formData, setFormData] = useState(initial);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            await getTeachers();
            setLoading(false);
        };
        fetchTeachers();
        // eslint-disable-next-line
    }, []);

    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "subject", title: "Subject" },
    ];

    const handleEdit = (row) => {
        setFormData({
            id: row.id,
            name: row.name,
            email: row.email,
            subject: row.subject,
        });
        setEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (row) => {
        if (window.confirm("Are you sure you want to delete this teacher?")) {
            await deleteTeacher(row.id);
            await getTeachers();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.subject) {
            if (editing === true) {
                await updateTeacher(formData.id);
                await getTeachers();
            } else {
                await addTeacher();
                await getTeachers();
            }
            setShowForm(false);
            setFormData({ name: "", email: "", subject: "" });
            setEditing(null);
        }
    };

    const addTeacher = async () => {
        await axios
            .post("http://localhost:5050/api/createteacher", {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
            })
            .then((response) => {
                console.log(response.data);
                setFormData({ name: "", email: "", subject: "" });
            })
            .catch((error) => {
                console.error("Error creating teacher:", error);
            });
    };

    const updateTeacher = async (id) => {
        await axios
            .post(`http://localhost:5050/api/updateteacher/${id}`, {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
            })
            .then((response) => {
                console.log(response.data);
                setFormData({ name: "", email: "", subject: "" });
            })
            .catch((error) => {
                console.error("Error updating teacher:", error);
            });
    };

    const deleteTeacher = async (id) => {
        await axios
            .post(`http://localhost:5050/api/deleteteacher/${id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error deleting teacher:", error);
            });
    };

    if (loading) {
        return (
            <div className='flex items-center text-gray-500'>
                <FaSpinner className='animate-spin mr-2' /> Loading Teachers...
            </div>
        );
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold mb-6'>Teachers</h1>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add Teacher"}
                </Button>
            </div>
            {showForm && (
                <div className='mb-6 p-4 border rounded-lg'>
                    <h2 className='text-lg font-semibold mb-4'>
                        {editing ? "Edit Teacher" : "Add New Teacher"}
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
                            <label className='block mb-2'>Subject</label>
                            <input
                                type='text'
                                className='w-full p-2 border rounded'
                                value={formData.subject}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        subject: e.target.value,
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
                    data={teachers}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Suspense>
        </div>
    );
};

export default Teachers;
