/**
 * Tests for Visual Enhancement System
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { VisualEnhancementSystem, getVisualSystem, initializeVisualSystem } from '../VisualEnhancementSystem';
import { VisualConfigManager } from '../config';

describe('VisualEnhancementSystem', () => {
  let system: VisualEnhancementSystem;

  beforeEach(() => {
    system = new VisualEnhancementSystem();
  });

  afterEach(() => {
    if (system.isInitialized()) {
      system.destroy();
    }
  });

  describe('initialization', () => {
    it('should create a system instance', () => {
      expect(system).toBeInstanceOf(VisualEnhancementSystem);
      expect(system.isInitialized()).toBe(false);
    });

    it('should initialize successfully', async () => {
      await system.initialize();
      expect(system.isInitialized()).toBe(true);
    });

    it('should not initialize twice', async () => {
      await system.initialize();
      expect(system.isInitialized()).toBe(true);
      
      // Should not throw or cause issues
      await system.initialize();
      expect(system.isInitialized()).toBe(true);
    });
  });

  describe('configuration', () => {
    it('should have default configuration', () => {
      const config = system.getConfig();
      expect(config).toBeDefined();
      expect(config.enableAnimations).toBe(true);
      expect(config.enableLazyLoading).toBe(true);
      expect(config.imageQuality).toBe('auto');
    });

    it('should update configuration', () => {
      system.updateConfig({ enableAnimations: false });
      const config = system.getConfig();
      expect(config.enableAnimations).toBe(false);
    });
  });

  describe('managers', () => {
    beforeEach(async () => {
      await system.initialize();
    });

    it('should have all required managers', () => {
      expect(system.animationManager).toBeDefined();
      expect(system.imageManager).toBeDefined();
      expect(system.mediaPlayer).toBeDefined();
      expect(system.interactionController).toBeDefined();
      expect(system.performanceController).toBeDefined();
    });
  });

  describe('global instance', () => {
    it('should provide global instance', () => {
      const globalSystem = getVisualSystem();
      expect(globalSystem).toBeInstanceOf(VisualEnhancementSystem);
    });

    it('should initialize global instance', async () => {
      const globalSystem = await initializeVisualSystem();
      expect(globalSystem.isInitialized()).toBe(true);
      
      // Clean up
      globalSystem.destroy();
    });
  });
});

describe('VisualConfigManager', () => {
  let configManager: VisualConfigManager;

  beforeEach(() => {
    configManager = new VisualConfigManager();
  });

  it('should create with default config', () => {
    const config = configManager.getConfig();
    expect(config.enableAnimations).toBe(true);
    expect(config.enableLazyLoading).toBe(true);
  });

  it('should update configuration', () => {
    configManager.updateConfig({ enableAnimations: false });
    const config = configManager.getConfig();
    expect(config.enableAnimations).toBe(false);
  });

  it('should detect device capabilities', () => {
    const deviceInfo = configManager.getDeviceInfo();
    expect(deviceInfo).toBeDefined();
    if (deviceInfo) {
      expect(typeof deviceInfo.isMobile).toBe('boolean');
      expect(typeof deviceInfo.isTablet).toBe('boolean');
      expect(typeof deviceInfo.isDesktop).toBe('boolean');
    }
  });
});