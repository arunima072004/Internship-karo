import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CloudIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  PlayCircleIcon,
  TrophyIcon,
  RocketLaunchIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useVisualSystem } from '../lib/visual-enhancement';

const DomainsPage: React.FC = () => {
  const { system } = useVisualSystem();
  const domainsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!system?.animationManager) return;

    const animationManager = system.animationManager;

    // Register scroll animations for domain cards
    if (domainsRef.current) {
      const domainCards = domainsRef.current.querySelectorAll('.domain-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(domainCards) as HTMLElement[], 'fadeInUp', 0.1);
      }
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.domain-button, .cta-button');
    buttons.forEach(button => {
      animationManager.registerHoverEffect(button as HTMLElement, {
        scale: 1.05,
        lift: true,
        duration: 0.3
      });
    });

    return () => {
      // Cleanup on unmount
      if (domainsRef.current) {
        const domainCards = domainsRef.current.querySelectorAll('.domain-card');
        domainCards.forEach(card => {
          animationManager.unregisterScrollAnimation(card as HTMLElement);
        });
      }
    };
  }, [system]);
  const domains = [
    {
      icon: CodeBracketIcon,
      title: 'Web Development',
      level: 'Beginner to Advanced',
      objectives: '45+ Objectives',
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      description: 'Build full-stack web applications with modern frameworks and technologies',
      projects: ['E-commerce Platform', 'Social Media Dashboard', 'Real-time Chat App'],
      duration: '3-6 months',
      avgSalary: '₹12-45L',
      gradient: 'from-indigo-500 to-blue-700',
      popularity: 95,
      jobOpenings: '15K+',
      successRate: 94,
      featured: true
    },
    {
      icon: ChartBarIcon,
      title: 'Data Science & ML',
      level: 'Intermediate to Advanced',
      objectives: '52+ Objectives',
      technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
      description: 'Analyze data and build machine learning models for real business problems',
      projects: ['Predictive Analytics', 'Recommendation System', 'Computer Vision App'],
      duration: '5-8 months',
      avgSalary: '₹15-50L',
      gradient: 'from-blue-500 to-cyan-700',
      popularity: 88,
      jobOpenings: '12K+',
      successRate: 91,
      featured: true
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile App Development',
      level: 'Intermediate',
      objectives: '38+ Objectives',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
      description: 'Create cross-platform mobile applications for iOS and Android',
      projects: ['Food Delivery App', 'Fitness Tracker', 'Social Networking App'],
      duration: '4-7 months',
      avgSalary: '₹10-40L',
      gradient: 'from-cyan-500 to-sky-700',
      popularity: 82,
      jobOpenings: '8K+',
      successRate: 89,
      featured: false
    },
    {
      icon: CloudIcon,
      title: 'DevOps & Cloud',
      level: 'Advanced',
      objectives: '41+ Objectives',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
      description: 'Deploy and manage scalable cloud infrastructure and CI/CD pipelines',
      projects: ['Microservices Architecture', 'Auto-scaling System', 'Monitoring Dashboard'],
      duration: '4-6 months',
      avgSalary: '₹18-55L',
      gradient: 'from-sky-500 to-violet-700',
      popularity: 76,
      jobOpenings: '10K+',
      successRate: 87,
      featured: false
    },
    {
      icon: PaintBrushIcon,
      title: 'UI/UX Design',
      level: 'Beginner to Intermediate',
      objectives: '35+ Objectives',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
      description: 'Design user-centered digital experiences and interactive prototypes',
      projects: ['Mobile App Redesign', 'Web Platform UX', 'Design System Creation'],
      duration: '3-5 months',
      avgSalary: '₹8-35L',
      gradient: 'from-violet-500 to-purple-700',
      popularity: 71,
      jobOpenings: '6K+',
      successRate: 85,
      featured: false
    },
    {
      icon: ShieldCheckIcon,
      title: 'Cybersecurity',
      level: 'Intermediate to Advanced',
      objectives: '47+ Objectives',
      technologies: ['Ethical Hacking', 'SIEM', 'Forensics', 'Penetration Testing'],
      description: 'Protect systems and data from security threats and vulnerabilities',
      projects: ['Security Audit', 'Penetration Testing', 'Incident Response Plan'],
      duration: '5-7 months',
      avgSalary: '₹20-60L',
      gradient: 'from-purple-500 to-indigo-700',
      popularity: 68,
      jobOpenings: '7K+',
      successRate: 92,
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
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
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/10">
            <SparklesIcon className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-white">50+ Technology Domains Available</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Choose Your</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Tech Domain
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
            Select from industry-leading technology domains and start working on real projects. 
            Each domain offers hands-on experience with actual deliverables and portfolio-worthy outcomes.
          </p>
        </motion.div>

        {/* Interactive Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30">
            <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-blue-200 text-sm">Tech Domains</div>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30">
            <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
            <div className="text-blue-200 text-sm">Success Rate</div>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30">
            <div className="text-3xl font-bold text-purple-400 mb-2">₹45L</div>
            <div className="text-blue-200 text-sm">Avg Package</div>
          </div>
          <div className="text-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30">
            <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
            <div className="text-blue-200 text-sm">Companies</div>
          </div>
        </motion.div>

        {/* Featured Domains */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">🔥 Most Popular Domains</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {domains.filter(domain => domain.featured).map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-600/30 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${domain.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${domain.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <domain.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{domain.avgSalary}</div>
                      <div className="text-blue-200 text-sm">Avg Package</div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{domain.title}</h3>
                  <p className="text-blue-200 mb-6 leading-relaxed">{domain.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{domain.successRate}%</div>
                      <div className="text-xs text-blue-200">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{domain.jobOpenings}</div>
                      <div className="text-xs text-blue-200">Job Openings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-400">{domain.objectives}</div>
                      <div className="text-xs text-blue-200">Projects</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {domain.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-blue-800/50 text-blue-200 rounded-full text-sm font-medium border border-blue-600/30">
                        {tech}
                      </span>
                    ))}
                    {domain.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-slate-700/50 text-blue-300 rounded-full text-sm font-medium">
                        +{domain.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <button className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${domain.gradient} text-white hover:shadow-lg transform hover:scale-105 domain-button flex items-center justify-center space-x-2`}>
                    <RocketLaunchIcon className="w-5 h-5" />
                    <span>Start Experience</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Domains Grid */}
        <div ref={domainsRef} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">All Technology Domains</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-blue-700/30 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 domain-card hover:border-blue-600/50"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${domain.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <domain.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-white">{domain.title}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-400">{domain.avgSalary}</div>
                        <div className="text-blue-200 text-xs">Package Range</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-blue-200 mb-4">
                      <span className="bg-blue-800/30 px-3 py-1 rounded-full border border-blue-600/30">{domain.level}</span>
                      <span className="bg-purple-800/30 px-3 py-1 rounded-full border border-purple-600/30">{domain.objectives}</span>
                      <span className="bg-green-800/30 px-3 py-1 rounded-full border border-green-600/30">{domain.duration}</span>
                    </div>
                    
                    <p className="text-blue-200 mb-4 leading-relaxed">{domain.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <BoltIcon className="w-4 h-4 mr-2 text-blue-400" />
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {domain.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="text-sm text-blue-300 bg-blue-900/30 px-2 py-1 rounded border border-blue-700/30">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-white mb-2 flex items-center">
                        <TrophyIcon className="w-4 h-4 mr-2 text-yellow-400" />
                        Sample Projects:
                      </h4>
                      <ul className="text-sm text-blue-200 space-y-1">
                        {domain.projects.map((project, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className={`w-full bg-gradient-to-r ${domain.gradient} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 domain-button flex items-center justify-center space-x-2`}>
                      <PlayCircleIcon className="w-5 h-5" />
                      <span>Start Experience</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-3xl p-12 text-center border border-blue-500/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-cyan-500/10"></div>
          
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-full mb-8"
            >
              <SparklesIcon className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Real-World Journey?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who chose hands-on project experience over traditional training. 
              Start working on real industry projects today and build a portfolio that gets you hired.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-600/30">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-white font-semibold">Start Immediately</div>
                <div className="text-blue-200 text-sm">No waiting periods</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-600/30">
                <div className="text-3xl mb-2">💼</div>
                <div className="text-white font-semibold">Real Projects</div>
                <div className="text-blue-200 text-sm">From actual companies</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-600/30">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-white font-semibold">Industry Recognition</div>
                <div className="text-blue-200 text-sm">Valued certifications</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-indigo-400 hover:to-blue-500 transition-all duration-300 cta-button shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 flex items-center justify-center space-x-2">
                <RocketLaunchIcon className="w-6 h-6" />
                <span>Get Started Now</span>
              </button>
              <button className="border-2 border-cyan-400 text-cyan-400 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-cyan-400 hover:text-white transition-all duration-300 cta-button flex items-center justify-center space-x-2">
                <PlayCircleIcon className="w-6 h-6" />
                <span>Schedule a Call</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DomainsPage;