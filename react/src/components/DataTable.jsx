import Button from "./Button";
const DataTable = ({ data, columns, onEdit, onDelete }) => {
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                               
                                {column.title}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className='px-6 py-4 whitespace-nowrap'
                                >
                                    {row[column.key]}
                                </td>

            
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Button className="text-blue-400 hover:bg-green-300 mr-2" onClick={() =>{onEdit(row)}}>Edit</Button>
                                <Button className="text-red-400 hover:bg-green-300" onClick={() =>{
                                    onDelete(row)
                                }}>Delete</Button>
                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
