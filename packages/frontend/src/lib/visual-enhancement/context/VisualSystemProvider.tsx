/**
 * React Context Provider for Visual Enhancement System
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useVisualSystem, UseVisualSystemReturn } from '../hooks/useVisualSystem';
import { VisualConfig } from '../types';

interface VisualSystemContextValue extends UseVisualSystemReturn {}

const VisualSystemContext = createContext<VisualSystemContextValue | null>(null);

interface VisualSystemProviderProps {
  children: ReactNode;
  initialConfig?: Partial<VisualConfig>;
  autoInitialize?: boolean;
}

/**
 * Provider component for Visual Enhancement System
 */
export function VisualSystemProvider({ 
  children, 
  initialConfig,
  autoInitialize = true 
}: VisualSystemProviderProps) {
  const visualSystem = useVisualSystem(autoInitialize);

  // Apply initial config if provided
  React.useEffect(() => {
    if (initialConfig && visualSystem.system) {
      try {
        visualSystem.updateConfig(initialConfig);
      } catch (error) {
        console.error('Failed to apply initial config:', error);
      }
    }
  }, [initialConfig, visualSystem.system, visualSystem.updateConfig]);

  // If there's an error, render children without visual system context
  if (visualSystem.error) {
    console.error('Visual System Provider Error:', visualSystem.error);
    return <>{children}</>;
  }

  return (
    <VisualSystemContext.Provider value={visualSystem}>
      {children}
    </VisualSystemContext.Provider>
  );
}

/**
 * Hook to use the Visual System context
 */
export function useVisualSystemContext(): VisualSystemContextValue {
  const context = useContext(VisualSystemContext);
  
  if (!context) {
    throw new Error('useVisualSystemContext must be used within a VisualSystemProvider');
  }
  
  return context;
}

/**
 * HOC to wrap components with Visual System Provider
 */
export function withVisualSystem<P extends object>(
  Component: React.ComponentType<P>,
  config?: Partial<VisualConfig>
) {
  return function WrappedComponent(props: P) {
    return (
      <VisualSystemProvider initialConfig={config}>
        <Component {...props} />
      </VisualSystemProvider>
    );
  };
}