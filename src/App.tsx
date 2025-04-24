import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Register from "./pages/Register";
import BlogsView from "./pages/Blogs/BlogsView";
import BlogManager from "./pages/Blogs/BlogManager";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/Blogsview" element={<BlogsView />} />
        <Route path="/Blogmanager" element={<BlogManager />} />

      </Route>

    </Routes>
  );
}
