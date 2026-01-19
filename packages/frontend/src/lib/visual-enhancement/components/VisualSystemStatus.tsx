/**
 * Visual System Status Component
 * Shows the current status of the Visual Enhancement System
 */

import { useVisualSystemContext } from '../context/VisualSystemProvider';

interface VisualSystemStatusProps {
  showDetails?: boolean;
  className?: string;
}

export function VisualSystemStatus({ showDetails = false, className = '' }: VisualSystemStatusProps) {
  const { system, isInitialized, isLoading, error } = useVisualSystemContext();

  if (isLoading) {
    return (
      <div className={`visual-system-status loading ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Initializing Visual System...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`visual-system-status error ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-sm text-red-600">Visual System Error</span>
        </div>
        {showDetails && (
          <div className="mt-2 text-xs text-red-500">
            {error.message}
          </div>
        )}
      </div>
    );
  }

  if (!isInitialized || !system) {
    return (
      <div className={`visual-system-status not-initialized ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-sm text-gray-500">Visual System Not Initialized</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`visual-system-status initialized ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-green-600">Visual System Ready</span>
      </div>
      {showDetails && (
        <div className="mt-2 text-xs text-gray-500">
          <div>Animations: {system.getConfig().enableAnimations ? 'Enabled' : 'Disabled'}</div>
          <div>Lazy Loading: {system.getConfig().enableLazyLoading ? 'Enabled' : 'Disabled'}</div>
          <div>Image Quality: {system.getConfig().imageQuality}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Debug component for development
 */
export function VisualSystemDebug() {
  const { system, isInitialized, updateConfig } = useVisualSystemContext();

  if (!isInitialized || !system) {
    return null;
  }

  const config = system.getConfig();

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="font-semibold text-sm mb-2">Visual System Debug</h3>
      <VisualSystemStatus showDetails />
      
      <div className="mt-3 space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.enableAnimations}
            onChange={(e) => updateConfig({ enableAnimations: e.target.checked })}
            className="rounded"
          />
          <span className="text-xs">Enable Animations</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.enableLazyLoading}
            onChange={(e) => updateConfig({ enableLazyLoading: e.target.checked })}
            className="rounded"
          />
          <span className="text-xs">Enable Lazy Loading</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.enableParallax}
            onChange={(e) => updateConfig({ enableParallax: e.target.checked })}
            className="rounded"
          />
          <span className="text-xs">Enable Parallax</span>
        </label>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs">Quality:</span>
          <select
            value={config.imageQuality}
            onChange={(e) => updateConfig({ imageQuality: e.target.value as any })}
            className="text-xs border rounded px-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
    </div>
  );
}