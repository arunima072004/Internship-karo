import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';
import { AuthProvider } from './contexts/AuthContext';
import { VisualSystemProvider } from './lib/visual-enhancement';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import DomainsPage from './pages/DomainsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CoursesPage from './pages/CoursesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
// import VisualSystemTestPage from './pages/VisualSystemTestPage';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <VisualSystemProvider
          initialConfig={{
            enableAnimations: true,
            enableLazyLoading: true,
            imageQuality: 'auto',
            enableParallax: true,
          }}
          autoInitialize={false}
        >
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/domains" element={<DomainsPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* <Route path="/visual-test" element={<VisualSystemTestPage />} /> */}
                <Route 
                  path="/courses" 
                  element={
                    <ProtectedRoute>
                      <CoursesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Layout>
          </Router>
        </VisualSystemProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
