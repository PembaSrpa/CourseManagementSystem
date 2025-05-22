import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useEffect } from "react";


const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
        const getCourses = async () => {
         await axios.get("http://localhost:5050/api/getcourse")
         .then((response) => {
            setCourses(response.data.result);
         })
            .catch((error) => {
                console.error("Error fetching courses:", error);
            });
        }
        





        // const getStudents = async () => {
        //     await axios.get("http://localhost:5050/api/getstudent")
        //         .then((response) => {
        //             setStudents(response.data.result);
        //         })
        //         .catch((error) => {
        //             console.error("Error fetching students:", error);
        //         });
        // }   




        

        // yaha kina error aauxa Comment cancel garo vanna



        // const getTeachers = async () => {
        //     await axios.get("http://localhost:5050/api/getteacher")
        //         .then((response) => {
        //             setTeachers(response.data.result);
        //         })
        //         .catch((error) => {
        //             console.error("Error fetching teachers:", error);
        //         });
        // }



        useEffect(() => {
            getCourses();
            // getStudents();
            // getTeachers();
            
         

        },[courses]);
        


    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                courses,
                setCourses,
                students,
                setStudents,
                teachers,
                setTeachers,
                getCourses,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
