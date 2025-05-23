import { Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/SideBar";
import ProtectedRoute from "./ProtectedRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Courses = lazy(() => import("./pages/Courses"));
const Students = lazy(() => import("./pages/Student"));
const Teachers = lazy(() => import("./pages/Teacher"));
const Login = lazy(() => import("./pages/Login"));

function App() {
    return (
        <AppProvider>
            <Router>
                <div className='min-h-screen'>
                    <Suspense
                        fallback={
                            <div className='text-gray-500'>Loading...</div>
                        }
                    >
                        <Routes>
                            <Route path='/' element={<Login />} />
                            <Route path='/login' element={<Login />} />
                            <Route
                                element={
                                    <ProtectedRoute>
                                        <div className='flex'>
                                            <Sidebar />
                                            <div className='ml-64 flex-1 p-6'>
                                                <Outlet />
                                            </div>
                                        </div>
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<Dashboard />} />
                                <Route
                                    path='dashboard'
                                    element={<Dashboard />}
                                />
                                <Route path='courses' element={<Courses />} />
                                <Route path='students' element={<Students />} />
                                <Route path='teachers' element={<Teachers />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
