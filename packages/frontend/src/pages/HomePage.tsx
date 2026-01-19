import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RocketLaunchIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  TrophyIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  StarIcon,
  SparklesIcon,
  FireIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { useVisualSystem } from '../lib/visual-enhancement';

const HomePage: React.FC = () => {
  const { system } = useVisualSystem();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);

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

    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(featureCards) as HTMLElement[], 'scaleIn', 0.15);
      }
    }

    if (domainsRef.current) {
      const domainCards = domainsRef.current.querySelectorAll('.domain-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(domainCards) as HTMLElement[], 'fadeInUp', 0.1);
      }
    }

    // Add hover effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
      animationManager.registerHoverEffect(button as HTMLElement, {
        scale: 1.05,
        lift: true,
        glow: true,
        duration: 0.3
      });
    });

    return () => {
      // Cleanup animations on unmount
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card');
        statCards.forEach(card => {
          animationManager.unregisterScrollAnimation(card as HTMLElement);
        });
      }
    };
  }, [system]);

  const stats = [
    { number: '10K+', label: 'Projects Completed', icon: RocketLaunchIcon, color: 'from-indigo-500 to-blue-600' },
    { number: '500+', label: 'Partner Companies', icon: BriefcaseIcon, color: 'from-blue-500 to-cyan-600' },
    { number: '95%', label: 'Success Rate', icon: TrophyIcon, color: 'from-cyan-500 to-sky-600' },
    { number: '50+', label: 'Tech Domains', icon: AcademicCapIcon, color: 'from-sky-500 to-indigo-600' }
  ];

  const features = [
    {
      icon: RocketLaunchIcon,
      title: 'Real Projects',
      description: 'Work on actual industry projects, not simulations',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: TrophyIcon,
      title: 'Industry Recognition',
      description: 'Earn certificates valued by top companies',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: BriefcaseIcon,
      title: 'Portfolio Ready',
      description: 'Build a portfolio that gets you hired',
      color: 'from-cyan-500 to-sky-600'
    },
    {
      icon: AcademicCapIcon,
      title: 'Practical Skills',
      description: 'Learn by doing, not just watching',
      color: 'from-sky-500 to-violet-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: 'InternshipKaro gave me real project experience that landed me my dream job.',
      rating: 5,
      salary: '₹45L'
    },
    {
      name: 'Raj Patel',
      role: 'Data Scientist at Microsoft',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'The hands-on projects here are exactly what the industry needs.',
      rating: 5,
      salary: '₹38L'
    },
    {
      name: 'Priya Sharma',
      role: 'UX Designer at Adobe',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'From zero experience to industry-ready in just 6 months!',
      rating: 5,
      salary: '₹32L'
    }
  ];

  const domains = [
    {
      title: 'Web Development',
      icon: '🌐',
      level: 'Beginner to Advanced',
      projects: '45+ Projects',
      avgSalary: '₹12-45L',
      technologies: ['React', 'Node.js', 'MongoDB'],
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'Data Science',
      icon: '📊',
      level: 'Intermediate',
      projects: '52+ Projects',
      avgSalary: '₹15-50L',
      technologies: ['Python', 'TensorFlow', 'Pandas'],
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Mobile Development',
      icon: '📱',
      level: 'Intermediate',
      projects: '38+ Projects',
      avgSalary: '₹10-40L',
      technologies: ['React Native', 'Flutter'],
      gradient: 'from-cyan-500 to-sky-600'
    },
    {
      title: 'DevOps & Cloud',
      icon: '☁️',
      level: 'Advanced',
      projects: '41+ Projects',
      avgSalary: '₹18-55L',
      technologies: ['AWS', 'Docker', 'Kubernetes'],
      gradient: 'from-sky-500 to-violet-600'
    },
    {
      title: 'UI/UX Design',
      icon: '🎨',
      level: 'Beginner',
      projects: '35+ Projects',
      avgSalary: '₹8-35L',
      technologies: ['Figma', 'Adobe XD'],
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      title: 'Cybersecurity',
      icon: '🔒',
      level: 'Advanced',
      projects: '47+ Projects',
      avgSalary: '₹20-60L',
      technologies: ['Ethical Hacking', 'SIEM'],
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
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
          <motion.div
            animate={{ 
              y: [-30, 30, -30],
              x: [-10, 10, -10]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full opacity-20 blur-xl"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/10"
              >
                <SparklesIcon className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-white">Real Projects. Real Experience. Real Results.</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="text-white">Build Your Career with</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Real Industry Projects
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed max-w-2xl">
                Skip the theory. Work on actual projects from top companies. 
                Build a portfolio that gets you hired. 
                <span className="text-yellow-400 font-semibold">This is NOT a course!</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                <Link
                  to="/register"
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 cta-button"
                >
                  <FireIcon className="w-5 h-5 mr-2" />
                  Start Your Journey
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
                </Link>
                
                <button className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-300">
                  <PlayCircleIcon className="w-5 h-5 mr-2" />
                  Watch Success Stories
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">95%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">₹45L</div>
                  <div className="text-sm text-gray-400">Avg Package</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">500+</div>
                  <div className="text-sm text-gray-400">Companies</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                    alt="Students working on projects"
                    className="rounded-2xl shadow-2xl w-full"
                  />
                  
                  {/* Floating Success Cards */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg"
                  >
                    🚀 2,847 students hired this month
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg"
                  >
                    💼 ₹45L avg package
                  </motion.div>
                </div>
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

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpolygon%20points%3D%2250%200%2060%2040%20100%2050%2060%2060%2050%20100%2040%2060%200%2050%2040%2040%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
              Why Choose InternshipKaro?
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              We're not another online course. We're your gateway to real industry experience.
            </p>
          </motion.div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-blue-700/30 feature-card hover:bg-slate-700/50"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Choose Your Domain
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pick your tech field and start working on real industry projects
            </p>
          </motion.div>

          <div ref={domainsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden domain-card"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${domain.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{domain.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{domain.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{domain.level}</span>
                    <span className="font-semibold text-blue-600">{domain.avgSalary}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{domain.projects}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {domain.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to="/register"
                    className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${domain.gradient} text-white hover:shadow-lg transform hover:scale-105 cta-button`}
                  >
                    Start Experience
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8">
              Success Stories That Inspire
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real people. Real careers. Real transformations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.role}</p>
                    <p className="text-green-400 text-sm font-bold">{testimonial.salary} package</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-200 leading-relaxed">"{testimonial.quote}"</p>
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
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful professionals who started their journey with real projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/register"
                className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/25 cta-button"
              >
                <BoltIcon className="w-6 h-6 mr-2" />
                Start Your Journey Today
                <ArrowRightIcon className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/domains"
                className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Explore Domains
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">✨</div>
                <p className="text-blue-100 text-sm">No credit card required</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">🚀</div>
                <p className="text-blue-100 text-sm">Start immediately</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">💼</div>
                <p className="text-blue-100 text-sm">Industry-recognized certificates</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
