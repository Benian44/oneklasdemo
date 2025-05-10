import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';

// Layout components
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Educational content pages
import Cycles from './pages/education/Cycles';
import Classes from './pages/education/Classes';
import Subjects from './pages/education/Subjects';
import Lessons from './pages/education/Lessons';
import LessonDetail from './pages/education/LessonDetail';
import ExamPrep from './pages/education/ExamPrep';
import ExamSubjects from './pages/education/ExamSubjects';
import PastPapers from './pages/education/PastPapers';

// Optional services
import TutoringServices from './pages/services/TutoringServices';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ContentProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="cycles" element={<Cycles />} />
              <Route path="cycles/:cycleId/classes" element={<Classes />} />
              <Route path="classes/:classId/subjects" element={<Subjects />} />
              <Route path="subjects/:subjectId/lessons" element={<Lessons />} />
              <Route path="lessons/:lessonId" element={<LessonDetail />} />
              <Route path="exam-prep" element={<ExamPrep />} />
              <Route path="exam-prep/:examType/subjects" element={<ExamSubjects />} />
              <Route path="exam-prep/:examType/:subjectId" element={<PastPapers />} />
              <Route path="tutoring" element={<TutoringServices />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ContentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;