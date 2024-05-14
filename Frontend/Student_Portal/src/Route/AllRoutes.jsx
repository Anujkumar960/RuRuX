import React from 'react';
import { Route, Routes} from 'react-router-dom';
// import StreamsPage from './Admin/StreamsPage';
// import SubjectsPage from './Admin/SubjectsPage';
// import MarksPage from './Admin/MarksPage';
// import StudentListPage from './Admin/StudentListPage';
// import MyProfilePage from './Student/MyProfilePage';
// import MyPerformancePage from './Student/MyPerformancePage';
import StudentPortalDashboard from '../Component/dashboard';

export const AllRoutes = () => {
  return (
    <Routes>
        <Route  path="/" component={<StudentPortalDashboard/>} />
        {/* <Route path="/admin/streams" component={StreamsPage} />
        <Route path="/admin/subjects" component={SubjectsPage} />
        <Route path="/admin/marks" component={MarksPage} />
        <Route path="/admin/student-list" component={StudentListPage} />

        <Route path="/student/profile" component={MyProfilePage} />
        <Route path="/student/performance" component={MyPerformancePage} /> */}
    </Routes>
  );
};


