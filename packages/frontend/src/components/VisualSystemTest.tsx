/**
 * Visual System Test Component
 * Demonstrates and tests the Visual Enhancement System functionality
 */

import { useEffect, useState } from 'react';
import { useVisualSystemContext } from '../lib/visual-enhancement';
import { VisualSystemStatus } from '../lib/visual-enhancement/components/VisualSystemStatus';
import { VisualSystemBrowserTest } from '../lib/visual-enhancement/utils/testHelpers';

export function VisualSystemTest() {
  const { system, isInitialized, isLoading, error, updateConfig } = useVisualSystemContext();
  const [testResults, setTestResults] = useState<Array<{ test: string; status: 'pass' | 'fail'; message: string; timestamp: Date }>>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runTests = async () => {
    if (!system || !isInitialized) {
      setTestResults([{
        test: 'System Check',
        status: 'fail',
        message: 'System not initialized',
        timestamp: new Date()
      }]);
      return;
    }

    setIsRunningTests(true);
    setTestResults([]);

    try {
      const browserTest = new VisualSystemBrowserTest(system);
      const results = await browserTest.runAllTests();
      setTestResults(results);
    } catch (err) {
      setTestResults([{
        test: 'Test Runner',
        status: 'fail',
        message: `Test runner error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsRunningTests(false);
    }
  };

  useEffect(() => {
    if (isInitialized && system && testResults.length === 0) {
      runTests();
    }
  }, [isInitialized, system]);

  if (isLoading) {
    return (
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          🔄 Loading Visual Enhancement System...
        </h3>
        <p className="text-blue-700">Please wait while the system initializes.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          ❌ Visual Enhancement System Error
        </h3>
        <p className="text-red-700 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🎨 Visual Enhancement System Status
        </h3>
        <VisualSystemStatus showDetails />
      </div>

      {/* Test Results */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            🧪 Test Results
          </h3>
          {isRunningTests && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-600">Running tests...</span>
            </div>
          )}
        </div>
        
        {testResults.length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              Total: {testResults.length} | 
              Passed: <span className="text-green-600 font-semibold">{testResults.filter(r => r.status === 'pass').length}</span> | 
              Failed: <span className="text-red-600 font-semibold">{testResults.filter(r => r.status === 'fail').length}</span> |
              Pass Rate: <span className="font-semibold">{testResults.length > 0 ? Math.round((testResults.filter(r => r.status === 'pass').length / testResults.length) * 100) : 0}%</span>
            </div>
          </div>
        )}
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`text-sm p-3 rounded border-l-4 ${
                result.status === 'pass' 
                  ? 'bg-green-50 text-green-800 border-green-400' 
                  : 'bg-red-50 text-red-800 border-red-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{result.test}</span>
                <span className="text-xs text-gray-500">
                  {result.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="mt-1 text-xs opacity-90">
                {result.message}
              </div>
            </div>
          ))}
        </div>
        {testResults.length === 0 && !isRunningTests && (
          <p className="text-gray-500 text-sm">No test results yet...</p>
        )}
      </div>

      {/* Configuration Controls */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ⚙️ Configuration Controls
        </h3>
        {system && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => updateConfig({ enableAnimations: !system.getConfig().enableAnimations })}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
            >
              Toggle Animations: {system.getConfig().enableAnimations ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => updateConfig({ enableLazyLoading: !system.getConfig().enableLazyLoading })}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              Toggle Lazy Loading: {system.getConfig().enableLazyLoading ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => updateConfig({ enableParallax: !system.getConfig().enableParallax })}
              className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded hover:from-blue-800 hover:to-blue-900 transition-all duration-200"
            >
              Toggle Parallax: {system.getConfig().enableParallax ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => {
                const qualities = ['low', 'medium', 'high', 'auto'] as const;
                const current = system.getConfig().imageQuality;
                const currentIndex = qualities.indexOf(current);
                const nextQuality = qualities[(currentIndex + 1) % qualities.length];
                updateConfig({ imageQuality: nextQuality });
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded hover:from-blue-900 hover:to-indigo-800 transition-all duration-200"
            >
              Image Quality: {system.getConfig().imageQuality.toUpperCase()}
            </button>
          </div>
        )}
      </div>

      {/* Manager Information */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🔧 Manager Information
        </h3>
        {system && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-semibold text-gray-700">Animation Manager</h4>
              <p className="text-gray-600">Handles animations, transitions, and micro-interactions</p>
              <p className="text-xs text-gray-500 mt-1">Status: Ready (placeholder)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-semibold text-gray-700">Image Manager</h4>
              <p className="text-gray-600">Manages image loading, optimization, and galleries</p>
              <p className="text-xs text-gray-500 mt-1">Status: Ready (placeholder)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-semibold text-gray-700">Media Player</h4>
              <p className="text-gray-600">Custom video player with interactive features</p>
              <p className="text-xs text-gray-500 mt-1">Status: Ready (placeholder)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-semibold text-gray-700">Performance Controller</h4>
              <p className="text-gray-600">Monitors and optimizes visual performance</p>
              <p className="text-xs text-gray-500 mt-1">Status: Ready (placeholder)</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🎯 Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={runTests}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          >
            🧪 Run Tests Again
          </button>
          <button
            onClick={() => {
              console.log('Visual Enhancement System:', system);
              console.log('Test Results:', testResults);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            📋 Log to Console
          </button>
          <button
            onClick={() => {
              if (system) {
                const config = system.getConfig();
                navigator.clipboard.writeText(JSON.stringify(config, null, 2));
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded hover:from-blue-800 hover:to-blue-900 transition-all duration-200"
          >
            📋 Copy Config
          </button>
        </div>
      </div>
    </div>
  );
}