import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Student";
import Teachers from "./pages/Teacher";

function App() {
    return (
        <AppProvider>
            <Router>
                <div className='flex min-h-screen'>
                    <Sidebar />
                    <div className='flex-1'>
                        <Routes>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/courses' element={<Courses />} />
                            <Route path='/students' element={<Students />} />
                            <Route path='/teachers' element={<Teachers />} />
                            <Route path='/' element={<Dashboard />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
