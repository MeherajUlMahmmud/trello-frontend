import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Spinner } from './components/Loading/Spinner';
import Navbar from './components/Navbar/Navbar';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/main/DashboardPage'));
const WorkspaceDetailsPage = lazy(() => import('./pages/main/WorkspaceDetailsPage'));
const AboutPage = lazy(() => import('./pages/utility/AboutPage'));
const ContactUsPage = lazy(() => import('./pages/utility/ContactUsPage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const ProfilePage = lazy(() => import('./pages/user/ProfilePage'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/workspace/:id" element={<WorkspaceDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
