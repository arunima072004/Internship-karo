/**
 * Animation Manager
 * Handles all animations, transitions, and micro-interactions using GSAP and Framer Motion
 */

import { AnimationManager as IAnimationManager, ScrollAnimationConfig, HoverConfig } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export class AnimationManager implements IAnimationManager {
  private scrollAnimations = new Map<HTMLElement, ScrollTrigger>();
  private hoverAnimations = new Map<HTMLElement, gsap.core.Timeline>();

  constructor() {
    this.initializeScrollTrigger();
  }

  private initializeScrollTrigger() {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
      start: "top 80%",
      end: "bottom 20%",
    });
  }

  registerScrollAnimation(element: HTMLElement, config: ScrollAnimationConfig): void {
    // Clean up existing animation if any
    this.unregisterScrollAnimation(element);

    const {
      trigger = element,
      start = "top 80%",
      end = "bottom 20%",
      animation = "fadeInUp",
      duration = 0.6,
      delay = 0,
      stagger = 0,
      ease = "power2.out"
    } = config;

    let animationProps: gsap.TweenVars = {};

    // Define animation presets
    switch (animation) {
      case 'fadeInUp':
        gsap.set(element, { opacity: 0, y: 60 });
        animationProps = { opacity: 1, y: 0, duration, delay, ease };
        break;
      case 'fadeInDown':
        gsap.set(element, { opacity: 0, y: -60 });
        animationProps = { opacity: 1, y: 0, duration, delay, ease };
        break;
      case 'fadeInLeft':
        gsap.set(element, { opacity: 0, x: -60 });
        animationProps = { opacity: 1, x: 0, duration, delay, ease };
        break;
      case 'fadeInRight':
        gsap.set(element, { opacity: 0, x: 60 });
        animationProps = { opacity: 1, x: 0, duration, delay, ease };
        break;
      case 'scaleIn':
        gsap.set(element, { opacity: 0, scale: 0.8 });
        animationProps = { opacity: 1, scale: 1, duration, delay, ease };
        break;
      case 'slideInUp':
        gsap.set(element, { y: 100 });
        animationProps = { y: 0, duration, delay, ease };
        break;
      case 'rotateIn':
        gsap.set(element, { opacity: 0, rotation: -180, scale: 0.5 });
        animationProps = { opacity: 1, rotation: 0, scale: 1, duration, delay, ease };
        break;
      default:
        // Custom animation properties
        if (typeof animation === 'object') {
          animationProps = { ...animation, duration, delay, ease };
        }
    }

    // Handle stagger for multiple elements
    const targets = element.children.length > 0 && stagger > 0 
      ? Array.from(element.children) 
      : element;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start,
      end,
      onEnter: () => {
        if (stagger > 0 && Array.isArray(targets)) {
          gsap.to(targets, { ...animationProps, stagger });
        } else {
          gsap.to(element, animationProps);
        }
      },
      onLeave: () => {
        if (config.reverseOnLeave) {
          gsap.to(targets, { 
            ...this.getReverseAnimation(animation), 
            duration: duration * 0.5 
          });
        }
      },
      onEnterBack: () => {
        if (stagger > 0 && Array.isArray(targets)) {
          gsap.to(targets, { ...animationProps, stagger });
        } else {
          gsap.to(element, animationProps);
        }
      }
    });

    this.scrollAnimations.set(element, scrollTrigger);
  }

  private getReverseAnimation(animation: string | object): gsap.TweenVars {
    if (typeof animation === 'string') {
      switch (animation) {
        case 'fadeInUp':
          return { opacity: 0, y: 30 };
        case 'fadeInDown':
          return { opacity: 0, y: -30 };
        case 'fadeInLeft':
          return { opacity: 0, x: -30 };
        case 'fadeInRight':
          return { opacity: 0, x: 30 };
        case 'scaleIn':
          return { opacity: 0, scale: 0.9 };
        case 'slideInUp':
          return { y: 50 };
        case 'rotateIn':
          return { opacity: 0, rotation: -90, scale: 0.8 };
        default:
          return { opacity: 0 };
      }
    }
    return { opacity: 0 };
  }

  unregisterScrollAnimation(element: HTMLElement): void {
    const scrollTrigger = this.scrollAnimations.get(element);
    if (scrollTrigger) {
      scrollTrigger.kill();
      this.scrollAnimations.delete(element);
    }
  }

  async executePageTransition(_from: string, _to: string): Promise<void> {
    return new Promise((resolve) => {
      const timeline = gsap.timeline({
        onComplete: resolve
      });

      // Fade out current page
      timeline.to('.page-content', {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: "power2.in"
      });

      // Add loading animation
      timeline.to('.page-loader', {
        opacity: 1,
        duration: 0.2
      }, "-=0.1");

      // Fade in new page (this would be called after route change)
      timeline.to('.page-content', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "+=0.1");

      timeline.to('.page-loader', {
        opacity: 0,
        duration: 0.2
      }, "-=0.2");
    });
  }

  registerHoverEffect(element: HTMLElement, config: HoverConfig): void {
    // Clean up existing hover effect
    const existingAnimation = this.hoverAnimations.get(element);
    if (existingAnimation) {
      existingAnimation.kill();
    }

    const {
      scale = 1.05,
      rotation = 0,
      duration = 0.3,
      ease = "power2.out",
      lift = true,
      glow = false,
      customProps = {}
    } = config;

    let hoverProps: gsap.TweenVars = {
      scale,
      rotation,
      duration,
      ease,
      ...customProps
    };

    if (lift) {
      hoverProps.y = -8;
      hoverProps.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
    }

    if (glow) {
      hoverProps.filter = "brightness(1.1) saturate(1.2)";
    }

    const timeline = gsap.timeline({ paused: true });
    timeline.to(element, hoverProps);

    // Add event listeners
    element.addEventListener('mouseenter', () => timeline.play());
    element.addEventListener('mouseleave', () => timeline.reverse());

    this.hoverAnimations.set(element, timeline);
  }

  animateCounter(element: HTMLElement, from: number, to: number, duration: number): void {
    const obj = { value: from };
    
    gsap.to(obj, {
      value: to,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toLocaleString();
      }
    });
  }

  animateProgressBar(element: HTMLElement, progress: number): void {
    const progressBar = element.querySelector('.progress-fill') as HTMLElement;
    const progressText = element.querySelector('.progress-text') as HTMLElement;
    
    if (progressBar) {
      gsap.to(progressBar, {
        width: `${progress}%`,
        duration: 1.2,
        ease: "power2.out"
      });
    }

    if (progressText) {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: progress,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          progressText.textContent = `${Math.round(obj.value)}%`;
        }
      });
    }
  }

  // Additional utility methods for enhanced animations

  /**
   * Create a staggered animation for multiple elements
   */
  staggerAnimation(elements: HTMLElement[], animation: string, stagger: number = 0.1): void {
    elements.forEach((element, index) => {
      this.registerScrollAnimation(element, {
        animation,
        delay: index * stagger,
        duration: 0.6
      });
    });
  }

  /**
   * Create a parallax effect for an element
   */
  createParallaxEffect(element: HTMLElement, speed: number = 0.5): void {
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const y = self.progress * speed * 100;
        gsap.set(element, { y: `${y}px` });
      }
    });
  }

  /**
   * Create a morphing background animation
   */
  createMorphingBackground(element: HTMLElement): void {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ];

    let currentIndex = 0;
    
    const animate = () => {
      currentIndex = (currentIndex + 1) % colors.length;
      gsap.to(element, {
        background: colors[currentIndex],
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(animate, 2000);
        }
      });
    };

    animate();
  }

  /**
   * Clean up all animations
   */
  destroy(): void {
    // Kill all scroll triggers
    this.scrollAnimations.forEach(trigger => trigger.kill());
    this.scrollAnimations.clear();

    // Kill all hover animations
    this.hoverAnimations.forEach(timeline => timeline.kill());
    this.hoverAnimations.clear();

    // Kill all ScrollTriggers
    ScrollTrigger.killAll();
  }
}