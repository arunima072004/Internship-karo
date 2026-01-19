import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:from-indigo-500 group-hover:to-blue-500 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">IK</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">InternshipKaro</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/domains"
                className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
              >
                Domains
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/how-it-works"
                className="text-gray-700 hover:text-sky-600 font-medium transition-all duration-200 relative group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl border border-gray-300"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span>{user?.firstName || 'Profile'}</span>
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-200">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <Link
                        to="/courses"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Courses
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 px-4 py-2 rounded-lg hover:bg-indigo-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105"
                  >
                    Start Journey
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/domains"
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Domains
                </Link>
                <Link
                  to="/how-it-works"
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <hr className="border-gray-200 my-2" />
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <Link
                      to="/courses"
                      className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Courses
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-600 text-center transition-all duration-300 shadow-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Start Journey
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
      
      <main>{children}</main>
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-blue-800/30 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">IK</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">InternshipKaro</span>
              </div>
              <p className="text-blue-200">
                Real projects. Real experience. Real results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Platform</h3>
              <ul className="space-y-2 text-blue-200">
                <li><Link to="/domains" className="hover:text-white transition-colors">Domains</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800/30 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2026 InternshipKaro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
