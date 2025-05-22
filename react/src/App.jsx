import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Student";
import Teachers from "./pages/Teacher";
import Login from "./pages/Login";

function App() {
    return (
        <AppProvider>
            <Router>
                <div className='flex min-h-screen'>
                    <div className='flex-1'>
                        <Routes>
                            <Route path='/' element={<Login />} />
                            <Route
                                path='/dashboard'
                                element={
                                    <>
                                        <Sidebar />
                                        <Dashboard />
                                    </>
                                }
                            />
                            <Route
                                path='/courses'
                                element={
                                    <>
                                        <Sidebar />
                                        <Courses />
                                    </>
                                }
                            />
                            <Route
                                path='/students'
                                element={
                                    <>
                                        <Sidebar />
                                        <Students />
                                    </>
                                }
                            />
                            <Route
                                path='/teachers'
                                element={
                                    <>
                                        <Sidebar />
                                        <Teachers />
                                    </>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
