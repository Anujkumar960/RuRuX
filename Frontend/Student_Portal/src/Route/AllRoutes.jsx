import React from "react";
import { Route, Routes } from "react-router-dom";

import StudentPortalDashboard from "../Component/dashboard";
import { Login } from "../pages/Authentication";
import StreamList from "../Admin/stream";
import StudentList from "../Admin/Students";
import SubjectList from "../Admin/Subjects";
import MarksList from "../Admin/marks";
import PerformancePage from "../Students/performancepage";


export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentPortalDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="admin/dashboard" element={<StreamList />} />
      <Route path="admin/students" element={<StudentList />} />
      <Route path="admin/subjects" element={<SubjectList />} />
      <Route path="admin/marks" element={<MarksList />} />
      <Route path="/student/performance" element={<PerformancePage/>} />
      
    </Routes>
  );
};



