import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  PlayCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  TrophyIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { useVisualSystem } from '../lib/visual-enhancement';

const CoursesPage: React.FC = () => {
  const { system } = useVisualSystem();
  const heroRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!system?.animationManager) return;

    const animationManager = system.animationManager;

    // Register scroll animations for different sections
    if (coursesRef.current) {
      const courseCards = coursesRef.current.querySelectorAll('.course-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(courseCards) as HTMLElement[], 'fadeInUp', 0.1);
      }
    }

    if (categoriesRef.current) {
      const categoryCards = categoriesRef.current.querySelectorAll('.category-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(categoryCards) as HTMLElement[], 'scaleIn', 0.15);
      }
    }

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

    // Add hover effects
    const buttons = document.querySelectorAll('.course-button, .cta-button');
    buttons.forEach(button => {
      animationManager.registerHoverEffect(button as HTMLElement, {
        scale: 1.05,
        lift: true,
        duration: 0.3
      });
    });

    return () => {
      // Cleanup animations on unmount
      const allAnimatedElements = document.querySelectorAll('.course-card, .category-card, .stat-card');
      allAnimatedElements.forEach(element => {
        animationManager.unregisterScrollAnimation(element as HTMLElement);
      });
    };
  }, [system]);

  const courses = [
    {
      id: 1,
      title: 'Full-Stack Web Development Mastery',
      description: 'Build complete web applications with React, Node.js, and MongoDB through real industry projects.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      category: 'Web Development',
      level: 'Intermediate',
      duration: '12 weeks',
      students: 2847,
      rating: 4.9,
      price: '₹24,999',
      originalPrice: '₹39,999',
      instructor: 'Rahul Sharma',
      projects: 8,
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Data Science & Machine Learning',
      description: 'Master data analysis, visualization, and ML algorithms with Python and real datasets.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      category: 'Data Science',
      level: 'Advanced',
      duration: '16 weeks',
      students: 1923,
      rating: 4.8,
      price: '₹29,999',
      originalPrice: '₹49,999',
      instructor: 'Priya Patel',
      projects: 12,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 3,
      title: 'Mobile App Development',
      description: 'Create cross-platform mobile apps with React Native and Flutter for iOS and Android.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      category: 'Mobile Development',
      level: 'Intermediate',
      duration: '10 weeks',
      students: 1654,
      rating: 4.7,
      price: '₹22,999',
      originalPrice: '₹34,999',
      instructor: 'Amit Kumar',
      projects: 6,
      gradient: 'from-cyan-500 to-sky-600'
    },
    {
      id: 4,
      title: 'DevOps & Cloud Engineering',
      description: 'Learn Docker, Kubernetes, AWS, and CI/CD pipelines through hands-on infrastructure projects.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
      category: 'DevOps',
      level: 'Advanced',
      duration: '14 weeks',
      students: 1234,
      rating: 4.9,
      price: '₹32,999',
      originalPrice: '₹54,999',
      instructor: 'Vikash Singh',
      projects: 10,
      gradient: 'from-sky-500 to-violet-600'
    },
    {
      id: 5,
      title: 'UI/UX Design Fundamentals',
      description: 'Design beautiful, user-centered interfaces with Figma and create stunning prototypes.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      category: 'Design',
      level: 'Beginner',
      duration: '8 weeks',
      students: 2156,
      rating: 4.8,
      price: '₹18,999',
      originalPrice: '₹29,999',
      instructor: 'Sneha Gupta',
      projects: 5,
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      id: 6,
      title: 'Cybersecurity Specialist',
      description: 'Master ethical hacking, penetration testing, and security auditing with real-world scenarios.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
      category: 'Security',
      level: 'Advanced',
      duration: '18 weeks',
      students: 987,
      rating: 4.9,
      price: '₹39,999',
      originalPrice: '₹64,999',
      instructor: 'Arjun Mehta',
      projects: 15,
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  const categories = [
    {
      name: 'Web Development',
      icon: '🌐',
      courses: 45,
      students: '12K+',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      name: 'Data Science',
      icon: '📊',
      courses: 32,
      students: '8K+',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Mobile Development',
      icon: '📱',
      courses: 28,
      students: '6K+',
      gradient: 'from-cyan-500 to-sky-600'
    },
    {
      name: 'DevOps & Cloud',
      icon: '☁️',
      courses: 24,
      students: '4K+',
      gradient: 'from-sky-500 to-violet-600'
    },
    {
      name: 'UI/UX Design',
      icon: '🎨',
      courses: 18,
      students: '9K+',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      name: 'Cybersecurity',
      icon: '🔒',
      courses: 15,
      students: '3K+',
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  const stats = [
    { number: '150+', label: 'Expert Courses', icon: AcademicCapIcon, color: 'from-indigo-500 to-blue-600' },
    { number: '50K+', label: 'Active Students', icon: UserGroupIcon, color: 'from-blue-500 to-cyan-600' },
    { number: '95%', label: 'Completion Rate', icon: TrophyIcon, color: 'from-cyan-500 to-sky-600' },
    { number: '4.8/5', label: 'Average Rating', icon: StarIcon, color: 'from-sky-500 to-violet-600' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/10"
              >
                <SparklesIcon className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-white">150+ Industry-Focused Courses</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
                Master Skills with
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Real Project Experience
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Learn from industry experts through hands-on projects. Build your portfolio while earning certifications that matter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 cta-button">
                  <BoltIcon className="w-5 h-5 mr-2" />
                  Browse All Courses
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300">
                  <PlayCircleIcon className="w-5 h-5 mr-2" />
                  Watch Preview
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group stat-card"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} text-white rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Explore Course Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of technology domains and start your learning journey.
            </p>
          </motion.div>

          <div ref={categoriesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden category-card"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <div className="flex justify-center space-x-6 text-sm text-gray-500 mb-4">
                    <span>{category.courses} courses</span>
                    <span className="font-semibold text-blue-600">{category.students} students</span>
                  </div>
                  
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${category.gradient} text-white hover:shadow-lg transform hover:scale-105 course-button`}>
                    Explore Courses
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular courses designed by industry experts with real-world projects.
            </p>
          </motion.div>

          <div ref={coursesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden course-card"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${course.gradient} text-white text-sm font-medium rounded-full`}>
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{course.level}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                      <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.projects} projects
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">by {course.instructor}</span>
                    <button className={`px-6 py-2 bg-gradient-to-r ${course.gradient} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 course-button`}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students who are building their careers through hands-on project experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/25 cta-button">
                <AcademicCapIcon className="w-6 h-6 mr-2" />
                Browse All Courses
                <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
