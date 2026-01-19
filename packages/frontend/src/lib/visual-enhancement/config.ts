/**
 * Configuration management for Visual Enhancement System
 */

import { VisualConfig, DeviceInfo } from './types';

// Default configuration
export const DEFAULT_VISUAL_CONFIG: VisualConfig = {
  enableAnimations: true,
  respectReducedMotion: true,
  imageQuality: 'auto',
  enableLazyLoading: true,
  enableParallax: true,
  animationDuration: 300,
};

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  MIN_FPS: 30,
  MAX_MEMORY_MB: 100,
  SLOW_CONNECTION_THRESHOLD: 1000, // ms
  LOW_BANDWIDTH_THRESHOLD: 1000000, // bytes per second
};

// Image optimization settings
export const IMAGE_OPTIMIZATION = {
  QUALITY_SETTINGS: {
    low: 60,
    medium: 80,
    high: 95,
    auto: 85,
  },
  FORMATS: {
    MODERN: ['avif', 'webp'],
    FALLBACK: ['jpeg', 'png'],
  },
  SIZES: {
    thumbnail: 150,
    small: 300,
    medium: 600,
    large: 1200,
    xlarge: 1920,
  },
};

// Animation settings
export const ANIMATION_SETTINGS = {
  DURATIONS: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  EASINGS: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  INTERSECTION_OBSERVER: {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1,
  },
};

/**
 * Configuration manager class
 */
export class VisualConfigManager {
  private config: VisualConfig;
  private deviceInfo: DeviceInfo | null = null;

  constructor(initialConfig?: Partial<VisualConfig>) {
    this.config = { ...DEFAULT_VISUAL_CONFIG, ...initialConfig };
    this.detectDeviceCapabilities();
    this.applyReducedMotionPreference();
  }

  /**
   * Get current configuration
   */
  getConfig(): VisualConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<VisualConfig>): void {
    this.config = { ...this.config, ...updates };
    this.applyConfigChanges();
  }

  /**
   * Get device information
   */
  getDeviceInfo(): DeviceInfo | null {
    return this.deviceInfo;
  }

  /**
   * Detect device capabilities and adjust config accordingly
   */
  private detectDeviceCapabilities(): void {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(navigator.userAgent);
    const isDesktop = !isMobile && !isTablet;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Estimate connection speed (simplified)
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    let connectionSpeed: 'slow' | 'medium' | 'fast' = 'medium';
    
    if (connection) {
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        connectionSpeed = 'slow';
      } else if (connection.effectiveType === '4g') {
        connectionSpeed = 'fast';
      }
    }

    // Estimate memory (simplified)
    const memoryGB = (navigator as any).deviceMemory || 4;

    this.deviceInfo = {
      isMobile,
      isTablet,
      isDesktop,
      hasTouch,
      connectionSpeed,
      memoryGB,
    };

    // Adjust config based on device capabilities
    if (isMobile || connectionSpeed === 'slow' || memoryGB < 4) {
      this.config.imageQuality = 'medium';
      this.config.enableParallax = false;
      this.config.animationDuration = 200;
    }
  }

  /**
   * Apply reduced motion preference
   */
  private applyReducedMotionPreference(): void {
    if (typeof window === 'undefined') return;

    // Check if matchMedia is available (not available in test environment)
    if (!window.matchMedia) {
      console.warn('matchMedia not available, skipping reduced motion detection');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion && this.config.respectReducedMotion) {
      this.config.enableAnimations = false;
      this.config.enableParallax = false;
      this.config.animationDuration = 0;
    }

    // Listen for changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches && this.config.respectReducedMotion) {
        this.updateConfig({
          enableAnimations: false,
          enableParallax: false,
          animationDuration: 0,
        });
      } else if (!e.matches) {
        this.updateConfig({
          enableAnimations: true,
          enableParallax: true,
          animationDuration: DEFAULT_VISUAL_CONFIG.animationDuration,
        });
      }
    });
  }

  /**
   * Apply configuration changes to the system
   */
  private applyConfigChanges(): void {
    // This will be implemented when we have the actual managers
    // For now, just store the config
    if (typeof window !== 'undefined') {
      localStorage.setItem('visualConfig', JSON.stringify(this.config));
    }
  }

  /**
   * Load configuration from storage
   */
  static loadFromStorage(): VisualConfigManager {
    if (typeof window === 'undefined') {
      return new VisualConfigManager();
    }

    try {
      const stored = localStorage.getItem('visualConfig');
      const config = stored ? JSON.parse(stored) : {};
      return new VisualConfigManager(config);
    } catch (error) {
      console.warn('Failed to load visual config from storage:', error);
      return new VisualConfigManager();
    }
  }
}

// Global configuration instance
export const visualConfig = VisualConfigManager.loadFromStorage();