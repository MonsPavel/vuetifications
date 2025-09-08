import type { AnimationPreset } from '../types/notifications';

export class AnimationProvider {
  static getTransitionName(preset: AnimationPreset = 'slide-fade') {
    const presets: Record<AnimationPreset, string> = {
      'slide-fade': 'slide-fade',
      fade: 'fade',
      slide: 'slide',
      scale: 'scale',
      bounce: 'bounce',
      flip: 'flip',
      zoom: 'zoom',
      none: 'none'
    };

    return presets[preset];
  }
}