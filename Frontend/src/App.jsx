// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import JobSearch from './components/JobSeeker/JobSearch';
import JobDetails from './components/JobSeeker/JobDetails';
import ApplyJob from './components/JobSeeker/ApplyJob';
import MyApplications from './components/JobSeeker/MyApplications';
import ApplicationDetails from './components/JobSeeker/ApplicationDetails';
import CompanyProfile from './components/Recruiter/CompanyProfile';
import MyJobs from './components/Recruiter/MyJobs';
import PostJob from './components/Recruiter/PostJob';
import ViewApplication from './components/Recruiter/ViewApplication';
import AdminDashboard from './components/Admin/Dashboard';
import UsersList from './components/Admin/UsersList';
import RecruiterApprovals from './components/Admin/RecruiterApprovals';
import Reports from './components/Admin/Reports';
import PrivateRoute from './components/Layout/PrivateRoute';
import NotificationsPage from './components/Notifications/NotificationsPage';
import Profile from './components/JobSeeker/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Navbar />
          <div className="container">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/jobs/:id" element={<JobDetails />} />

              {/* Protected routes - Job Seeker */}
              <Route element={<PrivateRoute roles={['jobseeker']} />}>
                <Route path="/profile" element={<Profile/>} />
                <Route path="/apply/:jobId" element={<ApplyJob />} />
                <Route path="/my-applications" element={<MyApplications />} />
                <Route path="/applications/:id" element={<ApplicationDetails />} />
              </Route>

              {/* Protected routes - Recruiter */}
              <Route element={<PrivateRoute roles={['recruiter', 'employer']} />}>
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/my-jobs" element={<MyJobs />} />
                <Route path="/jobs/:jobId/applications" element={<JobApplications />} />
                <Route path="/applications/:id/manage" element={<ViewApplication />} />
              </Route>

              {/* Protected routes - Admin */}
              <Route element={<PrivateRoute roles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/admin/approvals" element={<RecruiterApprovals />} />
                <Route path="/admin/reports" element={<Reports />} />
              </Route>

              {/* Notifications (any authenticated user) */}
              <Route element={<PrivateRoute/>}>
                <Route path="/notifications" element={<NotificationsPage />} />
              </Route>

              <Route path="/" element={<Navigate to="/jobs" />} />
            </Routes>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

