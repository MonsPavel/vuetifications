import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import NotificationItem from '../NotificationItem.vue';
import { notificationStore } from '../../core/useNotifications';

import type { Notification, NotificationStyle } from '../../types/notifications';

const { notifications, add, remove } = notificationStore;

const baseNotification = (overrides: Partial<Notification> = {}): Notification => ({
  id: 1,
  message: 'test message',
  type: 'info',
  duration: 0,
  closable: false,
  ...overrides
});

const clearStore = () => {
  for (const n of [...notifications.value]) remove(n.id);
};

afterEach(clearStore);

const STYLES: NotificationStyle[] = ['quiet', 'edge', 'tinted', 'inverted'];

describe('NotificationItem styles', () => {
  it.each(STYLES)('applies the style class for %s', (style) => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style }) }
    });

    expect(wrapper.classes()).toContain(`notification--style-${style}`);
  });

  it.each([
    ['classic', 'classic'],
    ['undefined', undefined]
  ] as const)('adds no style class when style is %s', (_name, style) => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style } as Partial<Notification>) }
    });

    expect(wrapper.classes().some(c => c.startsWith('notification--style-'))).toBe(false);
  });

  it.each(['success', 'error', 'warning', 'info'] as const)('renders an inline glyph chip for %s', (type) => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style: 'quiet', type, duration: 3000 }) }
    });

    expect(wrapper.find('.notification__chip').exists()).toBe(true);
    expect(wrapper.find('.notification__chip svg').exists()).toBe(true);
    expect(wrapper.find('img.notification__icon').exists()).toBe(false);
  });

  it('renders no chip for simple without a custom icon', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style: 'quiet', type: 'simple', duration: 3000 }) }
    });

    expect(wrapper.find('.notification__chip').exists()).toBe(false);
  });

  it('renders a custom icon image inside the chip', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style: 'quiet', type: 'success', icon: 'custom.svg' }) }
    });

    const chip = wrapper.find('.notification__chip');
    expect(chip.exists()).toBe(true);
    expect(chip.find('img.notification__icon').attributes('src')).toBe('custom.svg');
    expect(chip.find('svg').exists()).toBe(false);
  });

  it('renders the progress bar with the notification duration for styled notifications', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style: 'quiet', duration: 3000 }) }
    });

    const progress = wrapper.find('.notification__progress');
    expect(progress.exists()).toBe(true);
    expect(progress.attributes('style')).toContain('3000ms');
  });

  it('renders no progress bar for styled notifications with duration 0', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style: 'quiet', duration: 0 }) }
    });

    expect(wrapper.find('.notification__progress').exists()).toBe(false);
  });

  it('renders no progress bar for classic', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ duration: 3000 }) }
    });

    expect(wrapper.find('.notification__progress').exists()).toBe(false);
  });

  it('renders no progress bar for edge at any duration', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style: 'edge', duration: 3000 }) }
    });

    expect(wrapper.find('.notification__progress').exists()).toBe(false);
  });

  it('renders an svg close icon for styled notifications', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style: 'edge', closable: true, duration: 3000 }) }
    });

    expect(wrapper.find('.notification__close svg').exists()).toBe(true);
    expect(wrapper.find('.notification__close span').exists()).toBe(false);
  });

  it('keeps the text close icon for classic', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ closable: true, duration: 3000 }) }
    });

    expect(wrapper.find('.notification__close span').exists()).toBe(true);
    expect(wrapper.find('.notification__close svg').exists()).toBe(false);
  });

  it('pauses the auto-remove timer on hover for styled notifications', async () => {
    vi.useFakeTimers();

    const id = add({ message: 'hover me', duration: 1000, style: 'quiet' });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, {
      props: { notification: stored }
    });

    vi.advanceTimersByTime(500);
    await wrapper.trigger('mouseenter');
    vi.advanceTimersByTime(60_000);
    expect(notifications.value.find(n => n.id === id)).toBeDefined();

    await wrapper.trigger('mouseleave');
    vi.advanceTimersByTime(500);
    expect(notifications.value.find(n => n.id === id)).toBeUndefined();

    vi.useRealTimers();
  });

  it('does not pause the auto-remove timer on hover for classic', async () => {
    vi.useFakeTimers();

    const id = add({ message: 'no hover pause', duration: 1000 });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, {
      props: { notification: stored }
    });

    vi.advanceTimersByTime(500);
    await wrapper.trigger('mouseenter');
    vi.advanceTimersByTime(600);
    expect(notifications.value.find(n => n.id === id)).toBeUndefined();

    vi.useRealTimers();
  });

  it('does not set a default icon url for styled notifications', () => {
    const id = add({ message: 'styled', type: 'success', style: 'quiet', duration: 0 });
    const stored = notifications.value.find(n => n.id === id)!;

    expect(stored.icon).toBeUndefined();
  });
});
