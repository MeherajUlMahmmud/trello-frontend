import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppUrls } from './utils/constants';

import { ErrorBoundary } from './components/Common/ErrorBoundary';
import Spinner from './components/Loading/Spinner';
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
const ErrorPage = lazy(() => import('./pages/utility/ErrorPage'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Navbar />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path={AppUrls.homeRoute} element={<HomePage />} />
            <Route path={AppUrls.dashboardRoute} element={<DashboardPage />} />
            <Route path={AppUrls.initialWorkspaceDetailsRoute} element={<WorkspaceDetailsPage />} />
            <Route path={AppUrls.aboutRoute} element={<AboutPage />} />
            <Route path={AppUrls.contactUsRoute} element={<ContactUsPage />} />
            <Route path={AppUrls.profileRoute} element={<ProfilePage />} />

            <Route path={AppUrls.loginRoute} element={<LoginPage />} />
            <Route path={AppUrls.signUpRoute} element={<SignUpPage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
