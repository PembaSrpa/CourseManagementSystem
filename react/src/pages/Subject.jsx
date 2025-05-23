import { useAppContext } from "../context/AppContext";
import DataTable from "../components/DataTable";
import {useState } from "react";
import Button from "../components/Button";
import axios from "axios";



const Subject = () => {
    const {subjects,getsubjects} = useAppContext();
    const[showForm,setShowForm]=useState(false);
    const intial={
        code:"",
        subject:"",
    }
    const[formData,setFormData]=useState(intial);
    const [editing, setEditing] = useState(false);


    
    const handleEdit=(row) =>{
        setFormData({id:row.id, code: row.code, subject: row.subject})
        setEditing(true)
        setShowForm(true)
    }
    
    const handleDelete = (row) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            deleteSubjects(row.id);
            getfees();
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.subject && formData.fees) {
            if (editing === true) {
                updateSubjects(formData.id);
               getsubjects();
                // Edit existing       
            }else{
                // Add new
                addSubjects();
                getsubjects();
            }
        }
        setShowForm(false);
        setFormData({ code: "", subject: "" });
        setEditing(null);
    };
    
    const columns = [
        { key: "id", title: "ID" },
        { key: "code", title: "Code" },
        { key: "subject", title: "Subject" },
        
    ];
    
    const addSubjects = async () => {
        await axios.post("http://localhost:5050/api/createstudent", {
            name: formData.name,
            subject: formData.subject,
        })
        .then((response) => {
            console.log(response.data);
            setFormData({ code: "", subject: "" });
        }
        )
        .catch((error) => {
            console.error("Error creating fees:", error);
        }
        );
    }


    const updateSubjects = async (id) => {
        await axios.post(`http://localhost:5050/api/updatefees/${id}`, {
            code: formData.code,
          subject: formData.subject   
        })
        .then((response) => {
            console.log(response.data);
            setFormData({ code: "", subject: ""});
        }
        )
        .catch((error) => {
            console.error("Error updating fees:", error);
        }
        );
    }


    const deleteSubjects = async (id) => {   
        await axios.post(`http://localhost:5050/api/deletefees/${id}`)
        .then((response) => {
            console.log(response.data);
            setFormData({ code: "", subject: "" });
        }
        )
        .catch((error) => {
            console.error("Error deleting fees:", error);
        }
        );
    }



    return (
        <div className='p-6'>
            <div className="flex justify-between items-center mb-6">
                
            <h1 className='text-2xl font-bold mb-6'>Subject</h1>
             <Button onClick={() => {setShowForm(!showForm)
                setFormData({code:"", subject:""})
                setEditing(null)
             }}>
                    {showForm ? "Cancel" : "Add Suject"}
                </Button>
            
            </div>
            {showForm && (
                <div className='mb-6 p-4 border rounded-lg'>
                    <h2 className='text-lg font-semibold mb-4'>
                        {editing ? "Edit Fees" : "Add New Subject"}
                    </h2>
                    <form onSubmit={handleSubmit}
                   
                    >
                        <div className='mb-4'>
                            <label className='block mb-2'>Name</label>
                            <input
                                type='text'
                                className='w-full p-2 border rounded'
                                value={formData.code}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        code: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2'>Subject</label>
                            <input
                                type='text'
                                className='w-full p-2 border rounded'
                                value={formData.email}
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
            <DataTable data={subjects} columns={columns}  onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default Subject;
