/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Lab from "./pages/Lab";
import Whiteboard from "./pages/Whiteboard";
import Textbooks from "./pages/Textbooks";
import Games from "./pages/Games";
import Admin from "./pages/Admin";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kirish" element={<Login />} />
        <Route path="/ro'yxatdan-o'tish" element={<Register />} />
        
        <Route element={<Layout />}>
          <Route path="/kabinet" element={<Dashboard />} />
          <Route path="/fanlar" element={<Subjects />} />
          <Route path="/laboratoriya" element={<Lab />} />
          <Route path="/doska" element={<Whiteboard />} />
          <Route path="/darsliklar" element={<Textbooks />} />
          <Route path="/o'yinlar" element={<Games />} />
          <Route path="/admin" element={<Admin />} />
        </Route>


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

