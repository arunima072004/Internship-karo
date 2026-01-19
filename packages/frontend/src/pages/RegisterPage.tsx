import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, SparklesIcon, RocketLaunchIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { ExperienceLevel } from '../types/shared';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  experienceLevel: ExperienceLevel;
  agreeToTerms: boolean;
}

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  experienceLevel?: string;
  agreeToTerms?: string;
  general?: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    experienceLevel: ExperienceLevel.BEGINNER,
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const experienceLevelOptions = [
    { value: ExperienceLevel.BEGINNER, label: '🌱 Beginner - New to the field', color: 'from-green-500 to-emerald-500' },
    { value: ExperienceLevel.INTERMEDIATE, label: '🚀 Intermediate - Some experience', color: 'from-blue-500 to-cyan-500' },
    { value: ExperienceLevel.ADVANCED, label: '⭐ Advanced - Experienced professional', color: 'from-purple-500 to-pink-500' },
    { value: ExperienceLevel.EXPERT, label: '👑 Expert - Industry leader', color: 'from-orange-500 to-red-500' },
  ];

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Experience level validation
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name as keyof RegisterFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await register({
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        experienceLevel: formData.experienceLevel
      });
      
      // Redirect to dashboard after successful registration
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      setErrors({
        general: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-20 blur-xl"
        />
      </div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl">IK</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              Start Your Journey with
              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Real Industry Projects
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join thousands of successful professionals who built their careers through hands-on experience.
            </p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Work on real projects from 500+ companies</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Earn industry-recognized certifications</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">95% success rate guaranteed</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Average ₹45L package after completion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm font-medium mb-6 border border-white/10"
              >
                <SparklesIcon className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-white">Join the success story</span>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-xl p-4"
                >
                  <div className="text-sm text-red-200">{errors.general}</div>
                </motion.div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-200 mb-2">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      errors.firstName ? 'border-red-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`}
                    placeholder="First name"
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-300"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-200 mb-2">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      errors.lastName ? 'border-red-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`}
                    placeholder="Last name"
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-300"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/10 border ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-200 mb-2">
                  Experience level
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/10 border ${
                    errors.experienceLevel ? 'border-red-400' : 'border-white/20'
                  } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`}
                  disabled={isSubmitting}
                >
                  {experienceLevelOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.experienceLevel && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.experienceLevel}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 bg-white/10 border ${
                      errors.password ? 'border-red-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`}
                    placeholder="Create a password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => togglePasswordVisibility('password')}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 bg-white/10 border ${
                      errors.confirmPassword ? 'border-red-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300`}
                    placeholder="Confirm your password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-300"
                  >
                    {errors.confirmPassword}
                  </motion.p>
                )}
              </div>

              <div className="flex items-start space-x-3">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-blue-400 focus:ring-blue-400 border-white/20 rounded bg-white/10"
                  disabled={isSubmitting}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-300"
                >
                  {errors.agreeToTerms}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <RocketLaunchIcon className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </div>
                )}
              </motion.button>

              <div className="text-center">
                <p className="text-sm text-gray-300">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mt-8">
            <div className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IK</span>
              </div>
              <span className="text-white font-bold text-lg">InternshipKaro</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
