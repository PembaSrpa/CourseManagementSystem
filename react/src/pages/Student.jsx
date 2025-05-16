import { useAppContext } from "../context/AppContext";
import DataTable from "../components/DataTable";

const Students = () => {
    const { students } = useAppContext();

    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "course", title: "Course" },
    ];

    return (
        <div className='ml-64 p-6'>
            <h1 className='text-2xl font-bold mb-6'>Students</h1>
            <DataTable data={students} columns={columns} />
        </div>
    );
};

export default Students;
