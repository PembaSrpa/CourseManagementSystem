import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [courses, setCourses] = useState([
        { id: "1", name: "Yap", description: "yabadubaduba" },
        { id: "2", name: "Edge", description: "shiiiiiiii" },
    ]);
    const [students, setStudents] = useState([
        {
            id: "1",
            name: "Rigaysh1",
            email: "gay1@gmail.com",
            course: "Yap",
        },
        {
            id: "2",
            name: "Rigaysh2",
            email: "gay2@gmail.com",
            course: "Edge",
        },
    ]);
    const [teachers, setTeachers] = useState([
        {
            id: "1",
            name: "Tung Tung Tung Sahur",
            email: "tttsahur@gmail.com",
            subject: "rizz",
        },
    ]);

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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
