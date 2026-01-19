import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  TrophyIcon,
  ClockIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserCircleIcon,
  BellIcon,
  CalendarIcon,
  PlayCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useVisualSystem } from '../lib/visual-enhancement';

const DashboardPage: React.FC = () => {
  const { system } = useVisualSystem();
  const statsRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!system?.animationManager) return;

    const animationManager = system.animationManager;

    // Register scroll animations for different sections
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      statCards.forEach((card, index) => {
        animationManager.registerScrollAnimation(card as HTMLElement, {
          animation: 'fadeInUp',
          delay: index * 0.1,
          duration: 0.6
        });
      });
    }

    if (coursesRef.current) {
      const courseCards = coursesRef.current.querySelectorAll('.course-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(courseCards) as HTMLElement[], 'scaleIn', 0.1);
      }
    }

    if (activitiesRef.current) {
      const activityItems = activitiesRef.current.querySelectorAll('.activity-item');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(activityItems) as HTMLElement[], 'fadeInLeft', 0.05);
      }
    }

    if (achievementsRef.current) {
      const achievementCards = achievementsRef.current.querySelectorAll('.achievement-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(achievementCards) as HTMLElement[], 'rotateIn', 0.1);
      }
    }

    // Add hover effects
    const buttons = document.querySelectorAll('.dashboard-button, .course-button');
    buttons.forEach(button => {
      animationManager.registerHoverEffect(button as HTMLElement, {
        scale: 1.05,
        lift: true,
        duration: 0.3
      });
    });

    return () => {
      // Cleanup animations on unmount
      const allAnimatedElements = document.querySelectorAll('.stat-card, .course-card, .activity-item, .achievement-card');
      allAnimatedElements.forEach(element => {
        animationManager.unregisterScrollAnimation(element as HTMLElement);
      });
    };
  }, [system]);

  const stats = [
    { number: '12', label: 'Courses Enrolled', icon: AcademicCapIcon, color: 'from-indigo-500 to-blue-600', change: '+2 this month' },
    { number: '8', label: 'Completed', icon: CheckCircleIcon, color: 'from-blue-500 to-cyan-600', change: '+3 this month' },
    { number: '156', label: 'Hours Learned', icon: ClockIcon, color: 'from-cyan-500 to-sky-600', change: '+24 this week' },
    { number: '89%', label: 'Average Score', icon: TrophyIcon, color: 'from-sky-500 to-violet-600', change: '+5% improvement' }
  ];

  const currentCourses = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      progress: 75,
      nextLesson: 'React Hooks Deep Dive',
      timeLeft: '2h 30m',
      instructor: 'Rahul Sharma',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      progress: 45,
      nextLesson: 'Machine Learning Basics',
      timeLeft: '4h 15m',
      instructor: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      progress: 30,
      nextLesson: 'React Native Navigation',
      timeLeft: '6h 45m',
      instructor: 'Amit Kumar',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
      gradient: 'from-cyan-500 to-sky-600'
    }
  ];

  const recentActivities = [
    {
      type: 'completed',
      title: 'Completed "Advanced React Patterns" lesson',
      course: 'Full-Stack Web Development',
      time: '2 hours ago',
      icon: CheckCircleIcon,
      color: 'text-green-500'
    },
    {
      type: 'started',
      title: 'Started new project: E-commerce Dashboard',
      course: 'Full-Stack Web Development',
      time: '5 hours ago',
      icon: PlayCircleIcon,
      color: 'text-blue-500'
    },
    {
      type: 'achievement',
      title: 'Earned "React Master" badge',
      course: 'Full-Stack Web Development',
      time: '1 day ago',
      icon: TrophyIcon,
      color: 'text-yellow-500'
    },
    {
      type: 'submitted',
      title: 'Submitted assignment: Data Visualization',
      course: 'Data Science Fundamentals',
      time: '2 days ago',
      icon: BookOpenIcon,
      color: 'text-purple-500'
    },
    {
      type: 'joined',
      title: 'Joined study group: ML Enthusiasts',
      course: 'Data Science Fundamentals',
      time: '3 days ago',
      icon: UserCircleIcon,
      color: 'text-indigo-500'
    }
  ];

  const achievements = [
    {
      title: 'First Course Complete',
      description: 'Completed your first course',
      icon: '🎓',
      earned: true,
      date: '2 weeks ago'
    },
    {
      title: 'Speed Learner',
      description: 'Completed 3 lessons in one day',
      icon: '⚡',
      earned: true,
      date: '1 week ago'
    },
    {
      title: 'Project Master',
      description: 'Submitted 5 projects',
      icon: '🚀',
      earned: true,
      date: '3 days ago'
    },
    {
      title: 'Consistency King',
      description: 'Learned for 7 days straight',
      icon: '🔥',
      earned: false,
      progress: 5
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'React Project Submission',
      course: 'Full-Stack Web Development',
      dueDate: 'Tomorrow',
      priority: 'high'
    },
    {
      title: 'Data Analysis Assignment',
      course: 'Data Science Fundamentals',
      dueDate: 'In 3 days',
      priority: 'medium'
    },
    {
      title: 'Mobile App Prototype',
      course: 'Mobile App Development',
      dueDate: 'Next week',
      priority: 'low'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <UserCircleIcon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Welcome back, John!</h1>
                  <p className="text-blue-100 text-lg">Ready to continue your learning journey?</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                <BellIcon className="w-6 h-6" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                <CalendarIcon className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <section className="mb-12">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group stat-card"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium mb-2">{stat.label}</div>
                <div className="text-sm text-green-600 font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">View All</button>
              </div>
              
              <div ref={coursesRef} className="space-y-6">
                {currentCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 course-card"
                  >
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-20 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {course.progress}%
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600 mb-2">Next: {course.nextLesson}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>by {course.instructor}</span>
                          <span>•</span>
                          <span>{course.timeLeft} remaining</span>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-gradient-to-r ${course.gradient} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <button className={`px-6 py-3 bg-gradient-to-r ${course.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 course-button`}>
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Activity</h2>
              
              <div ref={activitiesRef} className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors activity-item"
                  >
                    <div className={`p-2 rounded-xl bg-gray-100`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.course}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
              
              <div ref={achievementsRef} className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 achievement-card ${
                      achievement.earned 
                        ? 'border-blue-200 bg-blue-50' 
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
                        {achievement.earned ? (
                          <p className="text-xs text-blue-600 mt-1">Earned {achievement.date}</p>
                        ) : (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full transition-all duration-500"
                                style={{ width: `${(achievement.progress! / 7) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{achievement.progress}/7 days</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Deadlines</h2>
              
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 ${
                      deadline.priority === 'high' 
                        ? 'border-red-500 bg-red-50' 
                        : deadline.priority === 'medium'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-green-500 bg-green-50'
                    }`}
                  >
                    <h3 className="font-bold text-gray-900">{deadline.title}</h3>
                    <p className="text-sm text-gray-600">{deadline.course}</p>
                    <p className={`text-sm font-medium mt-1 ${
                      deadline.priority === 'high' 
                        ? 'text-red-600' 
                        : deadline.priority === 'medium'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}>
                      Due {deadline.dueDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors dashboard-button">
                  <div className="flex items-center space-x-3">
                    <BookOpenIcon className="w-6 h-6" />
                    <span className="font-semibold">Browse New Courses</span>
                  </div>
                </button>
                
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors dashboard-button">
                  <div className="flex items-center space-x-3">
                    <TrophyIcon className="w-6 h-6" />
                    <span className="font-semibold">View Certificates</span>
                  </div>
                </button>
                
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors dashboard-button">
                  <div className="flex items-center space-x-3">
                    <ChartBarIcon className="w-6 h-6" />
                    <span className="font-semibold">Learning Analytics</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
