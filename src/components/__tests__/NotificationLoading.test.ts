import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import NotificationItem from '../NotificationItem.vue';
import { notificationStore } from '../../core/useNotifications';

import type { Notification, NotificationStyle } from '../../types/notifications';

const { notifications, remove } = notificationStore;

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

const LOADING_STYLES: NotificationStyle[] = ['classic', 'quiet', 'edge', 'tinted', 'inverted'];

describe('NotificationItem loading', () => {
  it.each(LOADING_STYLES)('renders the spinner instead of the icon for %s', (style) => {
    const wrapper = mount(NotificationItem, {
      props: {
        notification: baseNotification({
          style,
          type: 'success',
          icon: 'custom.svg',
          loading: true,
          duration: 3000
        })
      }
    });

    const spinner = wrapper.find('.notification__spinner');
    expect(spinner.exists()).toBe(true);
    expect(spinner.attributes('aria-hidden')).toBe('true');
    expect(spinner.find('svg').exists()).toBe(true);
    expect(wrapper.find('.notification__chip').exists()).toBe(false);
    expect(wrapper.find('img.notification__icon').exists()).toBe(false);
  });

  it.each(['quiet', 'tinted', 'inverted'] as const)('renders no progress bar while loading for %s even with a duration', (style) => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ style, loading: true, duration: 3000 }) }
    });

    expect(wrapper.find('.notification__progress').exists()).toBe(false);
  });
});
