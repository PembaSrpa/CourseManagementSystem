import React, { Suspense } from "react";
const Button = React.lazy(() => import("./Button"));

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
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
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
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <Suspense fallback={<span>Loading...</span>}>
                                    <Button
                                        className='inline-flex items-center px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 shadow'
                                        onClick={() => onEdit(row)}
                                        aria-label='Edit'
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className='inline-flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 shadow'
                                        onClick={() => onDelete(row)}
                                        aria-label='Delete'
                                    >
                                        Delete
                                    </Button>
                                </Suspense>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
