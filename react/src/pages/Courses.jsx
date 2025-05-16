import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import DataTable from "../components/DataTable";
import Button from "../components/Button";

const Courses = () => {
    const { courses } = useAppContext();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });

    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
    ];

    return (
        <div className='ml-64 p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold'>Courses</h1>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add Course"}
                </Button>
            </div>

            {showForm && (
                <div className='mb-6 p-4 border rounded-lg'>
                    <h2 className='text-lg font-semibold mb-4'>
                        Add New Course
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (formData.name && formData.description) {
                                courses.push({
                                    id: courses.length + 1,
                                    name: formData.name,
                                    description: formData.description,
                                });
                            }
                            setShowForm(false);
                            setFormData({ name: "", description: "" });
                        }}
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

            <DataTable data={courses} columns={columns} />
        </div>
    );
};

export default Courses;
