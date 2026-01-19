import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  TrophyIcon,
  PlayCircleIcon,
  SparklesIcon,
  RocketLaunchIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useVisualSystem } from '../lib/visual-enhancement';

const HowItWorksPage: React.FC = () => {
  const { system } = useVisualSystem();
  const stepsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (!system?.animationManager) return;

    const animationManager = system.animationManager;

    // Register scroll animations for steps
    if (stepsRef.current) {
      const stepCards = stepsRef.current.querySelectorAll('.step-card');
      stepCards.forEach((card, index) => {
        animationManager.registerScrollAnimation(card as HTMLElement, {
          animation: index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight',
          delay: index * 0.2,
          duration: 0.8
        });
      });
    }

    // Register animations for benefits
    if (benefitsRef.current) {
      const benefitCards = benefitsRef.current.querySelectorAll('.benefit-card');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(benefitCards) as HTMLElement[], 'scaleIn', 0.15);
      }
    }

    // Register animations for stats
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-item');
      if ('staggerAnimation' in animationManager) {
        (animationManager as any).staggerAnimation(Array.from(statCards) as HTMLElement[], 'fadeInUp', 0.1);
      }
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
      animationManager.registerHoverEffect(button as HTMLElement, {
        scale: 1.05,
        lift: true,
        duration: 0.3
      });
    });

    return () => {
      // Cleanup animations
      const allAnimatedElements = document.querySelectorAll('.step-card, .benefit-card, .stat-item');
      allAnimatedElements.forEach(element => {
        animationManager.unregisterScrollAnimation(element as HTMLElement);
      });
    };
  }, [system]);
  const steps = [
    {
      step: '01',
      icon: MagnifyingGlassIcon,
      title: 'Choose a Tech Domain',
      description: 'Browse through 50+ technology domains and select the one that aligns with your career goals. Each domain offers structured progression from beginner to advanced levels.',
      details: [
        'Explore detailed domain descriptions',
        'Review sample projects and technologies',
        'Check prerequisites and skill requirements',
        'See career outcomes and salary potential'
      ],
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-500/20'
    },
    {
      step: '02',
      icon: BriefcaseIcon,
      title: 'Get Assigned Real Projects',
      description: 'Our AI matching system assigns you real industry projects from our 500+ partner companies based on your skill level and interests.',
      details: [
        'Projects from actual companies with real business needs',
        'Clear project briefs with specific objectives',
        'Access to industry-standard tools and resources',
        'Direct communication with project stakeholders'
      ],
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/20'
    },
    {
      step: '03',
      icon: CheckCircleIcon,
      title: 'Complete Objectives & Deliverables',
      description: 'Work on specific, measurable objectives that result in tangible deliverables. Track your progress and get feedback from industry experts.',
      details: [
        'Objective-based progress tracking',
        'Regular feedback and code reviews',
        'Mentorship from industry professionals',
        'Quality assurance and validation processes'
      ],
      color: 'from-cyan-500 to-sky-600',
      bgColor: 'bg-cyan-500/20'
    },
    {
      step: '04',
      icon: TrophyIcon,
      title: 'Earn Industry-recognized Certification',
      description: 'Upon successful completion, receive certifications that are recognized and valued by employers across the industry.',
      details: [
        'Blockchain-verified digital certificates',
        'Portfolio of completed project deliverables',
        'LinkedIn integration for credential sharing',
        'Employer verification system'
      ],
      color: 'from-sky-500 to-indigo-600',
      bgColor: 'bg-sky-500/20'
    }
  ];

  const benefits = [
    {
      title: 'Real Work Experience',
      description: 'Unlike traditional courses, you work on actual business problems with real constraints and deadlines.',
      icon: BriefcaseIcon,
      color: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'Portfolio Building',
      description: 'Every project results in portfolio-worthy deliverables that showcase your practical skills to employers.',
      icon: TrophyIcon,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Industry Networking',
      description: 'Connect with professionals from partner companies and build valuable industry relationships.',
      icon: StarIcon,
      color: 'from-cyan-500 to-sky-600'
    },
    {
      title: 'Skill Validation',
      description: 'Earn certifications based on actual work completed, not just theoretical knowledge.',
      icon: CheckCircleIcon,
      color: 'from-sky-500 to-indigo-600'
    }
  ];

  // Auto-advance active step
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/10">
              <SparklesIcon className="w-4 h-4 mr-2 text-cyan-400" />
              <span className="text-white">Simple 4-Step Process</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">How</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                InternshipKaro Works
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 leading-relaxed max-w-3xl mx-auto">
              A simple, straightforward process that takes you from learning to earning through real project experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Process Steps */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Step Navigation */}
          <div className="flex justify-center mb-16">
            <div className="flex space-x-4 bg-gray-100 rounded-2xl p-2 border border-gray-200">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeStep === index
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {step.step}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Display */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          >
            <div>
              <div className="flex items-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${steps[activeStep].color} rounded-3xl flex items-center justify-center mr-6 shadow-lg`}>
                  {React.createElement(steps[activeStep].icon, { className: "h-10 w-10 text-white" })}
                </div>
                <div className={`text-6xl font-bold bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
                  {steps[activeStep].step}
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{steps[activeStep].title}</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{steps[activeStep].description}</p>
              <ul className="space-y-4">
                {steps[activeStep].details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 h-96 flex items-center justify-center border border-gray-200 relative overflow-hidden`}>
                <div className="text-center relative z-10">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {React.createElement(steps[activeStep].icon, { className: "h-32 w-32 text-gray-400 mx-auto mb-6" })}
                  </motion.div>
                  <div className={`text-8xl font-bold bg-gradient-to-r ${steps[activeStep].color} bg-clip-text text-transparent opacity-30`}>
                    {steps[activeStep].step}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Process Flow Visualization */}
          <div ref={stepsRef} className="grid md:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center p-6 rounded-2xl border transition-all duration-300 cursor-pointer step-card ${
                  activeStep === index
                    ? `bg-gradient-to-br ${step.color.replace('to-', 'to-').replace('from-', 'from-')}/10 border-indigo-300`
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
                  activeStep === index ? 'scale-110' : ''
                } transition-transform duration-300`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <div className={`text-3xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                  {step.step}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why This Approach Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our methodology is designed to bridge the gap between education and industry requirements through practical experience.
            </p>
          </motion.div>
          
          <div ref={benefitsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 benefit-card border border-gray-100 group hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-blue-200">
              Our approach delivers measurable outcomes for participants
            </p>
          </motion.div>
          
          <div ref={statsRef} className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="stat-item bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-600/30 hover:border-emerald-500/50 transition-colors duration-300"
            >
              <div className="text-5xl font-bold text-emerald-400 mb-2">95%</div>
              <div className="text-blue-200">Completion Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="stat-item bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-600/30 hover:border-cyan-500/50 transition-colors duration-300"
            >
              <div className="text-5xl font-bold text-cyan-400 mb-2">150%</div>
              <div className="text-blue-200">Average Salary Increase</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="stat-item bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-violet-600/30 hover:border-violet-500/50 transition-colors duration-300"
            >
              <div className="text-5xl font-bold text-violet-400 mb-2">500+</div>
              <div className="text-blue-200">Partner Companies</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="stat-item bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sky-600/30 hover:border-sky-500/50 transition-colors duration-300"
            >
              <div className="text-5xl font-bold text-sky-400 mb-2">10K+</div>
              <div className="text-blue-200">Projects Completed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-8"
            >
              <SparklesIcon className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals who chose real project experience over traditional training.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-indigo-900 font-semibold">Start Immediately</div>
                <div className="text-indigo-600 text-sm">No waiting periods</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="text-3xl mb-2">💼</div>
                <div className="text-blue-900 font-semibold">Real Projects</div>
                <div className="text-blue-600 text-sm">From actual companies</div>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-6 border border-cyan-200">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-cyan-900 font-semibold">Industry Recognition</div>
                <div className="text-cyan-600 text-sm">Valued certifications</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 cta-button shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105 flex items-center justify-center space-x-2">
                <RocketLaunchIcon className="w-6 h-6" />
                <span>Start Your Journey</span>
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 cta-button flex items-center justify-center space-x-2">
                <PlayCircleIcon className="w-6 h-6" />
                <span>Browse Domains</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;