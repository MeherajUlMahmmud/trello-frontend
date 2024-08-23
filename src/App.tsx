import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { aboutRoute, contactUsRoute, dashboardRoute, homeRoute, loginRoute, profileRoute, signUpRoute } from './utils/app_routes';

import { ErrorBoundary } from './components/ErrorBoundary';
import { Spinner } from './components/Loading/Spinner';
import Navbar from './components/Navbar/Navbar';
import SignUpPage from './pages/auth/SignUpPage';

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
            <Route path={homeRoute} element={<HomePage />} />
            <Route path={dashboardRoute} element={<DashboardPage />} />
            <Route path="/workspace/:id/:projectId" element={<WorkspaceDetailsPage />} />
            <Route path={aboutRoute} element={<AboutPage />} />
            <Route path={contactUsRoute} element={<ContactUsPage />} />
            <Route path={profileRoute} element={<ProfilePage />} />

            <Route path={loginRoute} element={<LoginPage />} />
            <Route path={signUpRoute} element={<SignUpPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
