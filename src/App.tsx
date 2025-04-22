import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Register from "./pages/Register";
import BlogsView from "./pages/Blogs/BlogsView";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Blogsview" element={<BlogsView />} />
      <Route element={<ProtectedRoute />}>
      
      </Route>

    </Routes>
  );
}
