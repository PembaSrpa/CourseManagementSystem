import { useAppContext } from "../context/AppContext";
import DataTable from "../components/DataTable";

const Teachers = () => {
    const { teachers } = useAppContext();

    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "subject", title: "Subject" },
    ];

    return (
        <div className='ml-64 p-6'>
            <h1 className='text-2xl font-bold mb-6'>Teachers</h1>
            <DataTable data={teachers} columns={columns} />
        </div>
    );
};

export default Teachers;
