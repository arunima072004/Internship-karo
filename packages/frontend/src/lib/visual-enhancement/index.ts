/**
 * Visual Enhancement System
 * Core module for managing visual content, animations, and interactive media
 */

export * from './types';
export * from './config';
export { VisualEnhancementSystem, getVisualSystem, initializeVisualSystem } from './VisualEnhancementSystem';
export { AnimationManager } from './managers/AnimationManager';
export { ImageManager } from './managers/ImageManager';
export { MediaPlayer } from './managers/MediaPlayer';
export { InteractionController } from './managers/InteractionController';
export { PerformanceController } from './managers/PerformanceController';
export * from './hooks/useVisualSystem';
export * from './context/VisualSystemProvider';