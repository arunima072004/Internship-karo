/**
 * Test helpers for Visual Enhancement System
 */

import { VisualEnhancementSystem } from '../VisualEnhancementSystem';

/**
 * Browser-based test runner for the Visual Enhancement System
 */
export class VisualSystemBrowserTest {
  private system: VisualEnhancementSystem;
  private results: Array<{ test: string; status: 'pass' | 'fail'; message: string; timestamp: Date }> = [];

  constructor(system: VisualEnhancementSystem) {
    this.system = system;
  }

  /**
   * Run all browser tests
   */
  async runAllTests(): Promise<Array<{ test: string; status: 'pass' | 'fail'; message: string; timestamp: Date }>> {
    this.results = [];
    
    await this.testSystemInitialization();
    await this.testConfigurationManagement();
    await this.testManagerAvailability();
    await this.testPerformanceController();
    await this.testDeviceDetection();
    
    return this.results;
  }

  private addResult(test: string, status: 'pass' | 'fail', message: string) {
    this.results.push({
      test,
      status,
      message,
      timestamp: new Date()
    });
  }

  private async testSystemInitialization() {
    try {
      if (this.system.isInitialized()) {
        this.addResult('System Initialization', 'pass', 'System is properly initialized');
      } else {
        this.addResult('System Initialization', 'fail', 'System is not initialized');
      }
    } catch (error) {
      this.addResult('System Initialization', 'fail', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async testConfigurationManagement() {
    try {
      const originalConfig = this.system.getConfig();
      
      // Test getting config
      if (originalConfig && typeof originalConfig === 'object') {
        this.addResult('Configuration Get', 'pass', `Config retrieved: ${Object.keys(originalConfig).length} properties`);
      } else {
        this.addResult('Configuration Get', 'fail', 'Failed to retrieve configuration');
        return;
      }

      // Test updating config
      const testValue = !originalConfig.enableAnimations;
      this.system.updateConfig({ enableAnimations: testValue });
      
      const updatedConfig = this.system.getConfig();
      if (updatedConfig.enableAnimations === testValue) {
        this.addResult('Configuration Update', 'pass', 'Configuration updated successfully');
      } else {
        this.addResult('Configuration Update', 'fail', 'Configuration update failed');
      }

      // Restore original config
      this.system.updateConfig(originalConfig);
    } catch (error) {
      this.addResult('Configuration Management', 'fail', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async testManagerAvailability() {
    const managers = [
      { name: 'Animation Manager', manager: this.system.animationManager },
      { name: 'Image Manager', manager: this.system.imageManager },
      { name: 'Media Player', manager: this.system.mediaPlayer },
      { name: 'Interaction Controller', manager: this.system.interactionController },
      { name: 'Performance Controller', manager: this.system.performanceController },
    ];

    managers.forEach(({ name, manager }) => {
      if (manager && typeof manager === 'object') {
        this.addResult(`${name} Availability`, 'pass', `${name} is available and initialized`);
      } else {
        this.addResult(`${name} Availability`, 'fail', `${name} is not available`);
      }
    });
  }

  private async testPerformanceController() {
    try {
      const vitals = this.system.performanceController.measureCoreWebVitals();
      
      if (vitals && typeof vitals === 'object' && 'LCP' in vitals && 'FID' in vitals && 'CLS' in vitals) {
        this.addResult('Performance Monitoring', 'pass', `Core Web Vitals measured: LCP=${vitals.LCP}, FID=${vitals.FID}, CLS=${vitals.CLS}`);
      } else {
        this.addResult('Performance Monitoring', 'fail', 'Failed to measure Core Web Vitals');
      }

      const metrics = this.system.performanceController.monitorAnimationPerformance();
      if (metrics && typeof metrics === 'object' && 'averageFPS' in metrics) {
        this.addResult('Animation Performance', 'pass', `Animation metrics: FPS=${metrics.averageFPS}, Dropped=${metrics.droppedFrames}`);
      } else {
        this.addResult('Animation Performance', 'fail', 'Failed to get animation metrics');
      }
    } catch (error) {
      this.addResult('Performance Controller', 'fail', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async testDeviceDetection() {
    try {
      // Test browser environment detection
      const isBrowser = typeof window !== 'undefined';
      if (isBrowser) {
        this.addResult('Browser Environment', 'pass', 'Running in browser environment');
        
        // Test user agent detection
        const userAgent = navigator.userAgent;
        if (userAgent) {
          this.addResult('User Agent Detection', 'pass', `User agent detected: ${userAgent.substring(0, 50)}...`);
        } else {
          this.addResult('User Agent Detection', 'fail', 'No user agent available');
        }
      } else {
        this.addResult('Browser Environment', 'fail', 'Not running in browser environment');
      }
    } catch (error) {
      this.addResult('Device Detection', 'fail', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get test results summary
   */
  getTestSummary() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'pass').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    
    return {
      total,
      passed,
      failed,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0
    };
  }
}