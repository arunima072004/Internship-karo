/**
 * TypeScript interfaces for Visual Enhancement System
 */

// Core Visual Enhancement System
export interface VisualEnhancementSystem {
  animationManager: AnimationManager;
  imageManager: ImageManager;
  mediaPlayer: MediaPlayer;
  interactionController: InteractionController;
  performanceController: PerformanceController;
}

export interface VisualConfig {
  enableAnimations: boolean;
  respectReducedMotion: boolean;
  imageQuality: 'low' | 'medium' | 'high' | 'auto';
  enableLazyLoading: boolean;
  enableParallax: boolean;
  animationDuration: number;
}

// Animation Manager
export interface AnimationManager {
  registerScrollAnimation(element: HTMLElement, config: ScrollAnimationConfig): void;
  unregisterScrollAnimation(element: HTMLElement): void;
  executePageTransition(from: string, to: string): Promise<void>;
  registerHoverEffect(element: HTMLElement, config: HoverConfig): void;
  animateCounter(element: HTMLElement, from: number, to: number, duration: number): void;
  animateProgressBar(element: HTMLElement, progress: number): void;
}

export interface ScrollAnimationConfig {
  trigger?: HTMLElement;
  start?: string;
  end?: string;
  animation?: string | object;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  reverseOnLeave?: boolean;
}

export interface HoverConfig {
  scale?: number;
  rotation?: number;
  duration?: number;
  ease?: string;
  lift?: boolean;
  glow?: boolean;
  customProps?: Record<string, any>;
}

// Image Manager
export interface ImageManager {
  loadImage(src: string, options: ImageLoadOptions): Promise<HTMLImageElement>;
  preloadImages(sources: string[]): Promise<void>;
  getResponsiveImageSrc(baseSrc: string, width: number, quality?: string): string;
  generateSrcSet(baseSrc: string): string;
  createGallery(images: GalleryImage[], config: GalleryConfig): GalleryComponent;
  createBeforeAfterComparison(before: string, after: string): ComparisonComponent;
}

export interface ImageLoadOptions {
  lazy?: boolean;
  placeholder?: string;
  quality?: 'low' | 'medium' | 'high' | 'auto';
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';
  sizes?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

export interface GalleryConfig {
  layout: 'grid' | 'masonry' | 'carousel';
  itemsPerRow?: number;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
  autoplay?: boolean;
}

export interface GalleryComponent {
  render(): JSX.Element;
  addImage(image: GalleryImage): void;
  removeImage(index: number): void;
}

export interface ComparisonComponent {
  render(): JSX.Element;
  setImages(before: string, after: string): void;
}

// Media Player
export interface MediaPlayer {
  createPlayer(container: HTMLElement, config: PlayerConfig): VideoPlayerInstance;
  createBackgroundVideo(src: string, container: HTMLElement): BackgroundVideoInstance;
  addOverlay(player: VideoPlayerInstance, overlay: VideoOverlay): void;
  addChapterMarkers(player: VideoPlayerInstance, chapters: Chapter[]): void;
}

export interface PlayerConfig {
  src: string | string[];
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  customControls?: CustomControlsConfig;
  enableHLS?: boolean;
  enableDASH?: boolean;
}

export interface CustomControlsConfig {
  showPlayButton?: boolean;
  showProgressBar?: boolean;
  showVolumeControl?: boolean;
  showFullscreenButton?: boolean;
  showQualitySelector?: boolean;
  showSpeedControl?: boolean;
}

export interface VideoPlayerInstance {
  play(): void;
  pause(): void;
  seek(time: number): void;
  setVolume(volume: number): void;
  destroy(): void;
}

export interface BackgroundVideoInstance {
  play(): void;
  pause(): void;
  destroy(): void;
}

export interface VideoOverlay {
  type: 'text' | 'image' | 'interactive';
  content: string | HTMLElement;
  startTime: number;
  endTime: number;
  position: { x: number; y: number };
}

export interface Chapter {
  title: string;
  startTime: number;
  thumbnail?: string;
}

// Interaction Controller
export interface InteractionController {
  enableDragDrop(element: HTMLElement, config: DragDropConfig): void;
  enableGestures(element: HTMLElement, config: GestureConfig): void;
  enableKeyboardNavigation(element: HTMLElement, config: KeyboardConfig): void;
  ensureAccessibility(element: HTMLElement): void;
}

export interface DragDropConfig {
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  onDrop?: (event: DragEvent) => void;
  dragImage?: HTMLElement;
  dropZones?: HTMLElement[];
}

export interface GestureConfig {
  enablePinch?: boolean;
  enableSwipe?: boolean;
  enableTap?: boolean;
  onPinch?: (scale: number) => void;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onTap?: (event: TouchEvent) => void;
}

export interface KeyboardConfig {
  enableArrowKeys?: boolean;
  enableTabNavigation?: boolean;
  enableEscapeKey?: boolean;
  customKeyBindings?: { [key: string]: () => void };
}

// Performance Controller
export interface PerformanceController {
  measureCoreWebVitals(): CoreWebVitals;
  monitorAnimationPerformance(): AnimationMetrics;
  optimizeForDevice(deviceInfo: DeviceInfo): OptimizationSettings;
  enableLowDataMode(): void;
  disableLowDataMode(): void;
  preloadCriticalAssets(assets: string[]): Promise<void>;
  clearCache(): void;
}

export interface CoreWebVitals {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
}

export interface AnimationMetrics {
  averageFPS: number;
  droppedFrames: number;
  memoryUsage: number;
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  connectionSpeed: 'slow' | 'medium' | 'fast';
  memoryGB: number;
}

export interface OptimizationSettings {
  reduceAnimations: boolean;
  lowerImageQuality: boolean;
  disableParallax: boolean;
  enableLazyLoading: boolean;
}

// Visual Asset Models
export interface VisualAsset {
  id: string;
  type: 'image' | 'video' | 'animation';
  src: string;
  alt?: string;
  metadata: AssetMetadata;
  optimizations: AssetOptimizations;
}

export interface AssetMetadata {
  width: number;
  height: number;
  fileSize: number;
  format: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssetOptimizations {
  webp?: string;
  avif?: string;
  thumbnails: { [size: string]: string };
  srcSet?: string;
}

// Animation Configuration Models
export interface AnimationSequence {
  id: string;
  name: string;
  steps: AnimationStep[];
  duration: number;
  easing: string;
  loop?: boolean;
}

export interface AnimationStep {
  target: string; // CSS selector or element ID
  properties: { [key: string]: any };
  duration: number;
  delay?: number;
  easing?: string;
}

// Gallery and Media Models
export interface Gallery {
  id: string;
  title: string;
  description?: string;
  items: GalleryItem[];
  config: GalleryConfig;
  layout: GalleryLayout;
}

export interface GalleryItem {
  id: string;
  asset: VisualAsset;
  caption?: string;
  order: number;
  metadata?: { [key: string]: any };
}

export interface GalleryLayout {
  type: 'grid' | 'masonry' | 'carousel';
  columns?: number;
  gap?: number;
  aspectRatio?: string;
}

export interface VideoContent {
  id: string;
  title: string;
  src: string | VideoSource[];
  poster?: string;
  duration: number;
  chapters?: Chapter[];
  overlays?: VideoOverlay[];
  captions?: CaptionTrack[];
}

export interface VideoSource {
  src: string;
  type: string;
  quality: string;
  bitrate?: number;
}

export interface CaptionTrack {
  src: string;
  language: string;
  label: string;
  default?: boolean;
}