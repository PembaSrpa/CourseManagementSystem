import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import DataTable from "../components/DataTable";
import Button from "../components/Button";
import axios from "axios";
import { useEffect } from "react";

const Courses = () => {
    const { courses, getCourses } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [editing, setEditing] = useState(false);

    const handleEdit=(row) =>{
        setFormData({id: row.id ,name: row.name, description: row.description})
        setEditing(true)
        setShowForm(true)
    }

    const handleDelete =(row)=>{
        if (window.confirm("Are you sure you want to delete this course?")) {
            deletecourse(row.id);
            getCourses();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.description) {
            if (editing === true) {
                // Update existing
                updatecourse(formData.id);
                getCourses();
            } else {
                // Add new
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
        { key: "description", title: "Description" }
    ];

    const addcourse = async () => {
        await axios.post("http://localhost:5050/api/createcourse", {
            name: formData.name,
            description: formData.description,
        })
        .then((response) => {
            console.log(response.data);
            setFormData({ name: "", description: "" });
        }
        )
        .catch((error) => {
            console.error("Error creating course:", error);
        }
        );
    }

    const updatecourse = async (id) => {
        await axios.post(`http://localhost:5050/api/updatecourse/${id}`, {
            name: formData.name,
            description: formData.description,
        })
        .then((response) => {
            console.log(response.data);
            setFormData({ name: "", description: "" });
        }
        )
        .catch((error) => {
            console.error("Error updating course:", error);
        }
        );
    }

    const deletecourse = async (id) => {
        await axios.post(`http://localhost:5050/api/deletecourse/${id}`)
        .then((response) => {
            console.log(response.data);
            setFormData({ name: "", description: "" });
        }
        )
        .catch((error) => {
            console.error("Error deleting course:", error);
        }
        );
    }



   

    return (
        <div className='ml-64 p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold'>Courses</h1>
                <Button onClick={() => {setShowForm(!showForm)
                    setFormData({name:"", description:""})
                    setEditing(null)
                }}>
                    {showForm ? "Cancel" : "Add Course"}
                </Button>
            </div>

            {showForm && (
                <div className='mb-6 p-4 border rounded-lg'>
                    <h2 className='text-lg font-semibold mb-4'>
                        {editing ? "Edit Course" :"Add New Course"}
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                    >
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

            <DataTable data={courses} columns={columns}  onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Courses;
