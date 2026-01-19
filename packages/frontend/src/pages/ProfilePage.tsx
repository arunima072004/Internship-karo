import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  TrophyIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  LinkIcon,
  GlobeAltIcon,
  StarIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useVisualSystem } from '../lib/visual-enhancement';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  bio: string;
  currentRole: string;
  location: string;
  linkedinProfile: string;
  portfolioUrl: string;
}

interface ProfileFormErrors {
  firstName?: string;
  lastName?: string;
  bio?: string;
  currentRole?: string;
  location?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
  general?: string;
}

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { system } = useVisualSystem();
  const formRef = useRef<HTMLFormElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    bio: '',
    currentRole: '',
    location: '',
    linkedinProfile: '',
    portfolioUrl: '',
  });
  
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        currentRole: user.currentRole || '',
        location: user.location || '',
        linkedinProfile: user.linkedinProfile || '',
        portfolioUrl: user.portfolioUrl || '',
      });
    }
  }, [user]);

  // Visual enhancement animations
  useEffect(() => {
    if (!system?.animationManager) return;

    const animationManager = system.animationManager;

    // Register scroll animations for different sections
    if (formRef.current) {
      const formFields = formRef.current.querySelectorAll('.form-field');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(formFields) as HTMLElement[], 'fadeInUp', 0.1);
      }
    }

    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      statCards.forEach((card, index) => {
        animationManager.registerScrollAnimation(card as HTMLElement, {
          animation: 'scaleIn',
          delay: index * 0.1,
          duration: 0.6
        });
      });
    }

    if (achievementsRef.current) {
      const achievementCards = achievementsRef.current.querySelectorAll('.achievement-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(achievementCards) as HTMLElement[], 'fadeInLeft', 0.1);
      }
    }

    // Add hover effects
    const buttons = document.querySelectorAll('.profile-button, .cta-button');
    buttons.forEach(button => {
      animationManager.registerHoverEffect(button as HTMLElement, {
        scale: 1.05,
        lift: true,
        duration: 0.3
      });
    });

    return () => {
      // Cleanup animations on unmount
      const allAnimatedElements = document.querySelectorAll('.form-field, .stat-card, .achievement-card');
      allAnimatedElements.forEach(element => {
        animationManager.unregisterScrollAnimation(element as HTMLElement);
      });
    };
  }, [system]);

  const validateForm = (): boolean => {
    const newErrors: ProfileFormErrors = {};

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

    // LinkedIn profile validation (if provided)
    if (formData.linkedinProfile && !formData.linkedinProfile.match(/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/)) {
      newErrors.linkedinProfile = 'Please enter a valid LinkedIn profile URL';
    }

    // Portfolio URL validation (if provided)
    if (formData.portfolioUrl && !formData.portfolioUrl.match(/^https?:\/\/.+/)) {
      newErrors.portfolioUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name as keyof ProfileFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Clear success message when user starts editing
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Only send non-empty fields
      const updateData: any = {};
      
      if (formData.firstName.trim()) updateData.firstName = formData.firstName.trim();
      if (formData.lastName.trim()) updateData.lastName = formData.lastName.trim();
      if (formData.bio.trim()) updateData.bio = formData.bio.trim();
      if (formData.currentRole.trim()) updateData.currentRole = formData.currentRole.trim();
      if (formData.location.trim()) updateData.location = formData.location.trim();
      if (formData.linkedinProfile.trim()) updateData.linkedinProfile = formData.linkedinProfile.trim();
      if (formData.portfolioUrl.trim()) updateData.portfolioUrl = formData.portfolioUrl.trim();

      await updateProfile(updateData);
      setSuccessMessage('Profile updated successfully!');
    } catch (error: any) {
      setErrors({
        general: error.message || 'Profile update failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-white">Loading your profile...</h2>
          <p className="text-blue-200 mt-2">Please wait while we fetch your information</p>
        </div>
      </div>
    );
  }

  const profileStats = [
    { number: user.experienceLevel || 'Beginner', label: 'Experience Level', icon: TrophyIcon, color: 'from-blue-500 to-blue-600' },
    { number: user.subscriptionStatus || 'Free', label: 'Subscription', icon: StarIcon, color: 'from-blue-600 to-blue-700' },
    { number: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), label: 'Member Since', icon: CalendarIcon, color: 'from-blue-700 to-blue-800' },
    { number: 'Verified', label: 'Account Status', icon: ShieldCheckIcon, color: 'from-blue-800 to-blue-900' }
  ];

  const achievements = [
    {
      title: 'Profile Complete',
      description: 'Completed your profile information',
      icon: '✅',
      earned: !!(user.firstName && user.lastName && user.bio),
      progress: [user.firstName, user.lastName, user.bio].filter(Boolean).length,
      total: 3
    },
    {
      title: 'Social Connected',
      description: 'Added social media links',
      icon: '🔗',
      earned: !!(user.linkedinProfile || user.portfolioUrl),
      progress: [user.linkedinProfile, user.portfolioUrl].filter(Boolean).length,
      total: 2
    },
    {
      title: 'Professional Ready',
      description: 'Added professional information',
      icon: '💼',
      earned: !!(user.currentRole && user.location),
      progress: [user.currentRole, user.location].filter(Boolean).length,
      total: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/10"
            >
              <SparklesIcon className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-white">Profile Management</span>
            </motion.div>
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                  <UserCircleIcon className="w-20 h-20 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="text-white">Welcome back,</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {user.firstName || 'User'}!
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Manage your profile information and track your learning journey
            </p>
            
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              <span className="text-blue-200">Email: </span>
              <span className="text-white font-semibold ml-2">{user.email}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {profileStats.map((stat, index) => (
              <div
                key={index}
                className="text-center group stat-card"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Profile Settings</h2>
                  <p className="text-gray-600 mt-2">Update your personal information and preferences</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                  <PencilIcon className="w-6 h-6 text-white" />
                </div>
              </div>

              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-2xl bg-red-50 p-4 border border-red-200"
                >
                  <div className="flex items-center">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                    <div className="text-sm text-red-700">{errors.general}</div>
                  </div>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-2xl bg-green-50 p-4 border border-green-200"
                >
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    <div className="text-sm text-green-700">{successMessage}</div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} ref={formRef} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium`}
                        disabled={isSubmitting}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`block w-full px-4 py-3 border-2 ${
                          errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                        } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium`}
                        disabled={isSubmitting}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="currentRole" className="block text-sm font-semibold text-gray-700 mb-2">
                    <BriefcaseIcon className="w-4 h-4 inline mr-1" />
                    Current role
                  </label>
                  <input
                    type="text"
                    name="currentRole"
                    id="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Developer, Student, etc."
                    className={`block w-full px-4 py-3 border-2 ${
                      errors.currentRole ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium`}
                    disabled={isSubmitting}
                  />
                  {errors.currentRole && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      {errors.currentRole}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPinIcon className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco, CA"
                    className={`block w-full px-4 py-3 border-2 ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium`}
                    disabled={isSubmitting}
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    className={`block w-full px-4 py-3 border-2 ${
                      errors.bio ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                    } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium resize-none`}
                    disabled={isSubmitting}
                  />
                  {errors.bio && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      {errors.bio}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="linkedinProfile" className="block text-sm font-semibold text-gray-700 mb-2">
                      <LinkIcon className="w-4 h-4 inline mr-1" />
                      LinkedIn profile
                    </label>
                    <input
                      type="url"
                      name="linkedinProfile"
                      id="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className={`block w-full px-4 py-3 border-2 ${
                        errors.linkedinProfile ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                      } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium`}
                      disabled={isSubmitting}
                    />
                    {errors.linkedinProfile && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.linkedinProfile}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="portfolioUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                      <GlobeAltIcon className="w-4 h-4 inline mr-1" />
                      Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      id="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com"
                      className={`block w-full px-4 py-3 border-2 ${
                        errors.portfolioUrl ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                      } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 font-medium`}
                      disabled={isSubmitting}
                    />
                    {errors.portfolioUrl && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        {errors.portfolioUrl}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none profile-button"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Updating Profile...
                        </div>
                      ) : (
                        <>
                          <BoltIcon className="w-5 h-5 mr-2" />
                          Update Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Achievements */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrophyIcon className="w-6 h-6 mr-2 text-blue-600" />
                Profile Progress
              </h2>
              
              <div ref={achievementsRef} className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 achievement-card ${
                      achievement.earned 
                        ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                        {!achievement.earned && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{achievement.progress}/{achievement.total} completed</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors profile-button">
                  <div className="flex items-center space-x-3">
                    <TrophyIcon className="w-6 h-6" />
                    <span className="font-semibold">View Certificates</span>
                  </div>
                </button>
                
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors profile-button">
                  <div className="flex items-center space-x-3">
                    <BriefcaseIcon className="w-6 h-6" />
                    <span className="font-semibold">Browse Courses</span>
                  </div>
                </button>
                
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors profile-button">
                  <div className="flex items-center space-x-3">
                    <UserCircleIcon className="w-6 h-6" />
                    <span className="font-semibold">Account Settings</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Profile Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-yellow-600" />
                Profile Tips
              </h2>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Complete your profile to increase visibility to recruiters</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Add your LinkedIn and portfolio links to showcase your work</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Keep your bio updated with your latest skills and interests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;