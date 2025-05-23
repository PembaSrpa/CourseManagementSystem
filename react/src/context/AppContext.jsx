import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const getCourses = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/getcourse"
            );
            setCourses(response.data.result);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const getStudents = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/getstudent"
            );
            setStudents(response.data.result);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const getTeachers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/getteacher"
            );
            setTeachers(response.data.result);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const getsubjects = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/getfees"
            );
            setSubjects(response.data.result);
        } catch (error) {
            console.error("Error fetching fees:", error);
        }
    };

    // ✅ Fetch only once on app mount
    useEffect(() => {
        getCourses();
        getStudents();
        getTeachers();
        getsubjects();
    }, []);

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
                getStudents,
                getTeachers,
                subjects,
                setSubjects,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
