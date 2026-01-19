/**
 * React hook for using the Visual Enhancement System
 */

import { useEffect, useState, useCallback } from 'react';
import { VisualEnhancementSystem, getVisualSystem, initializeVisualSystem } from '../VisualEnhancementSystem';
import { VisualConfig } from '../types';

export interface UseVisualSystemReturn {
  system: VisualEnhancementSystem | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: Error | null;
  updateConfig: (config: Partial<VisualConfig>) => void;
  reinitialize: () => Promise<void>;
}

/**
 * Hook to access and manage the Visual Enhancement System
 */
export function useVisualSystem(autoInitialize = true): UseVisualSystemReturn {
  const [system, setSystem] = useState<VisualEnhancementSystem | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialize = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Only initialize if we're in a browser environment
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const visualSystem = await initializeVisualSystem();
      setSystem(visualSystem);
      setIsInitialized(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize visual system');
      setError(error);
      console.warn('Visual system initialization failed, continuing without it:', error.message);
      // Don't throw the error, just log it and continue
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const updateConfig = useCallback((config: Partial<VisualConfig>) => {
    try {
      if (system) {
        system.updateConfig(config);
      }
    } catch (err) {
      console.warn('Failed to update visual system config:', err);
    }
  }, [system]);

  const reinitialize = useCallback(async () => {
    try {
      if (system) {
        system.destroy();
      }
      setSystem(null);
      setIsInitialized(false);
      await initialize();
    } catch (err) {
      console.warn('Failed to reinitialize visual system:', err);
    }
  }, [system, initialize]);

  useEffect(() => {
    if (autoInitialize && !system && !isLoading && typeof window !== 'undefined') {
      initialize();
    }
  }, [autoInitialize, system, isLoading, initialize]);

  useEffect(() => {
    // Listen for system events
    const handleSystemInitialized = () => {
      setIsInitialized(true);
    };

    const handleSystemDestroyed = () => {
      setIsInitialized(false);
      setSystem(null);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('visualSystemInitialized', handleSystemInitialized);
      window.addEventListener('visualSystemDestroyed', handleSystemDestroyed);

      return () => {
        window.removeEventListener('visualSystemInitialized', handleSystemInitialized);
        window.removeEventListener('visualSystemDestroyed', handleSystemDestroyed);
      };
    }
  }, []);

  return {
    system,
    isInitialized,
    isLoading,
    error,
    updateConfig,
    reinitialize,
  };
}

/**
 * Hook to get the visual system without auto-initialization
 */
export function useVisualSystemInstance(): VisualEnhancementSystem {
  return getVisualSystem();
}