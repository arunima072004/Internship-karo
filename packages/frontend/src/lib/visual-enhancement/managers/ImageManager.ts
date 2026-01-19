/**
 * Image Manager
 * Manages image loading, optimization, and responsive delivery
 */

import { 
  ImageManager as IImageManager, 
  ImageLoadOptions, 
  GalleryImage, 
  GalleryConfig, 
  GalleryComponent, 
  ComparisonComponent 
} from '../types';

export class ImageManager implements IImageManager {
  private intersectionObserver: IntersectionObserver | null = null;
  private lazyImages = new Map<HTMLImageElement, ImageLoadOptions>();

  constructor() {
    this.initializeLazyLoading();
  }

  /**
   * Initialize intersection observer for lazy loading
   */
  private initializeLazyLoading() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not available, lazy loading disabled');
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const options = this.lazyImages.get(img);
            
            if (options && img.dataset.src) {
              this.loadImageElement(img, img.dataset.src, options);
              this.intersectionObserver?.unobserve(img);
              this.lazyImages.delete(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );
  }

  async loadImage(src: string, options: ImageLoadOptions = {}): Promise<HTMLImageElement> {
    const img = new Image();
    
    // Set up responsive image attributes
    if (options.sizes) {
      img.sizes = options.sizes;
    }

    // Generate srcset for responsive images
    const srcSet = this.generateSrcSet(src);
    if (srcSet) {
      img.srcset = srcSet;
    }

    // Set placeholder if provided
    if (options.placeholder) {
      img.src = options.placeholder;
      img.classList.add('image-placeholder');
    }

    // Handle lazy loading
    if (options.lazy && this.intersectionObserver) {
      img.dataset.src = this.getOptimizedImageSrc(src, options);
      img.classList.add('lazy-image');
      this.lazyImages.set(img, options);
      this.intersectionObserver.observe(img);
    } else {
      // Load immediately
      await this.loadImageElement(img, src, options);
    }

    return img;
  }

  private async loadImageElement(img: HTMLImageElement, src: string, options: ImageLoadOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const optimizedSrc = this.getOptimizedImageSrc(src, options);
      
      img.onload = () => {
        img.classList.remove('image-placeholder', 'lazy-image');
        img.classList.add('image-loaded');
        resolve();
      };
      
      img.onerror = () => {
        console.warn(`Failed to load image: ${optimizedSrc}`);
        // Try fallback format
        const fallbackSrc = this.getFallbackImageSrc(src);
        if (fallbackSrc !== optimizedSrc) {
          img.src = fallbackSrc;
        } else {
          reject(new Error(`Failed to load image: ${src}`));
        }
      };
      
      img.src = optimizedSrc;
    });
  }

  private getOptimizedImageSrc(src: string, options: ImageLoadOptions): string {
    // In a real implementation, this would connect to an image optimization service
    // For now, we'll simulate format optimization
    const { format = 'auto', quality = 'auto' } = options;
    
    // Check if browser supports modern formats
    if (format === 'auto' || format === 'webp') {
      if (this.supportsWebP()) {
        return this.convertToWebP(src, quality);
      }
    }
    
    if (format === 'auto' || format === 'avif') {
      if (this.supportsAVIF()) {
        return this.convertToAVIF(src, quality);
      }
    }
    
    return src;
  }

  private getFallbackImageSrc(src: string): string {
    // Return original source as fallback
    return src;
  }

  private supportsWebP(): boolean {
    // Simple WebP support detection
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  private supportsAVIF(): boolean {
    // Simple AVIF support detection (would need more robust check in production)
    return false; // Simplified for now
  }

  private convertToWebP(src: string, _quality: string): string {
    // In production, this would call an image optimization service
    // For now, just return the original src
    return src;
  }

  private convertToAVIF(src: string, _quality: string): string {
    // In production, this would call an image optimization service
    return src;
  }

  async preloadImages(sources: string[]): Promise<void> {
    const promises = sources.map(src => 
      this.loadImage(src, { lazy: false })
    );
    
    try {
      await Promise.all(promises);
      console.log(`Preloaded ${sources.length} images`);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }

  getResponsiveImageSrc(baseSrc: string, _width: number, _quality?: string): string {
    // In production, this would generate URLs for different sizes
    // For now, return the base source
    return baseSrc;
  }

  generateSrcSet(baseSrc: string): string {
    // Generate srcset for responsive images
    const sizes = [320, 640, 960, 1280, 1920];
    const srcSet = sizes.map(size => 
      `${this.getResponsiveImageSrc(baseSrc, size)} ${size}w`
    ).join(', ');
    
    return srcSet;
  }

  createGallery(images: GalleryImage[], _config: GalleryConfig): GalleryComponent {
    // Note: config parameter is ignored in this placeholder implementation
    return new GalleryComponentImpl(images);
  }

  createBeforeAfterComparison(before: string, after: string): ComparisonComponent {
    const component = new BeforeAfterComponentImpl();
    component.setImages(before, after);
    return component;
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    this.lazyImages.clear();
  }
}

/**
 * Gallery Component Implementation
 */
class GalleryComponentImpl implements GalleryComponent {
  constructor(private images: GalleryImage[]) {}

  render(): JSX.Element {
    // This would return a React component in a real implementation
    // For now, return a placeholder
    return null as any;
  }

  addImage(image: GalleryImage): void {
    this.images.push(image);
  }

  removeImage(index: number): void {
    if (index >= 0 && index < this.images.length) {
      this.images.splice(index, 1);
    }
  }
}

/**
 * Before/After Comparison Component Implementation
 */
class BeforeAfterComponentImpl implements ComparisonComponent {
  private beforeSrc: string = '';
  private afterSrc: string = '';

  render(): JSX.Element {
    // This would return a React component in a real implementation
    // Using the properties to avoid unused variable warnings
    console.log('Rendering comparison:', this.beforeSrc, this.afterSrc);
    return null as any;
  }

  setImages(before: string, after: string): void {
    this.beforeSrc = before;
    this.afterSrc = after;
  }
}