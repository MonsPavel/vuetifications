import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import NotificationItem from '../NotificationItem.vue';
import { notificationStore } from '../../core/useNotifications';

import type { Notification } from '../../types/notifications';

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

describe('NotificationItem', () => {
  it('renders the message', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification() }
    });

    expect(wrapper.find('.notification__message').text()).toBe('test message');
  });

  it('renders the title only when present', () => {
    const withTitle = mount(NotificationItem, {
      props: { notification: baseNotification({ title: 'Title' }) }
    });
    const withoutTitle = mount(NotificationItem, {
      props: { notification: baseNotification() }
    });

    expect(withTitle.find('.notification__title').text()).toBe('Title');
    expect(withTitle.classes()).toContain('notification--has-title');
    expect(withoutTitle.find('.notification__title').exists()).toBe(false);
  });

  it('renders the title as a div, not a heading', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ title: 'Title' }) }
    });

    expect(wrapper.find('.notification__title').element.tagName).toBe('DIV');
  });

  it('does not set a live-region role on the item (announcements go through the container)', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ type: 'error' }) }
    });

    expect(wrapper.attributes('role')).toBeUndefined();
  });

  it('is focusable', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification() }
    });

    expect(wrapper.attributes('tabindex')).toBe('0');
  });

  it('applies type and animation classes', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ type: 'warning', animation: 'zoom' }) }
    });

    expect(wrapper.classes()).toContain('notification--warning');
    expect(wrapper.classes()).toContain('notification-animation--zoom');
  });

  it('shows the close button when closable', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ closable: true, duration: 3000 }) }
    });

    expect(wrapper.find('.notification__close').exists()).toBe(true);
  });

  it('shows the close button when duration is 0 even if not closable', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ closable: false, duration: 0 }) }
    });

    expect(wrapper.find('.notification__close').exists()).toBe(true);
  });

  it('hides the close button when not closable and auto-closing', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ closable: false, duration: 3000 }) }
    });

    expect(wrapper.find('.notification__close').exists()).toBe(false);
  });

  it('closes on click when closeOnClick is set', async () => {
    const id = add({ message: 'click me', duration: 0, closeOnClick: true });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, { props: { notification: stored } });
    await wrapper.trigger('click');

    expect(notifications.value.find(n => n.id === id)).toBeUndefined();
  });

  it('does not close on click by default', async () => {
    const id = add({ message: 'stay', duration: 0 });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, { props: { notification: stored } });
    await wrapper.trigger('click');

    expect(notifications.value.find(n => n.id === id)).toBeDefined();
  });

  it('pauses the timer on mouse enter and resumes on mouse leave', async () => {
    vi.useFakeTimers();

    const id = add({ message: 'hover me', duration: 1000 });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, { props: { notification: stored } });

    await wrapper.trigger('mouseenter');
    vi.advanceTimersByTime(60_000);
    expect(notifications.value.find(n => n.id === id)).toBeDefined();

    await wrapper.trigger('mouseleave');
    vi.advanceTimersByTime(1000);
    expect(notifications.value.find(n => n.id === id)).toBeUndefined();

    vi.useRealTimers();
  });

  it('keeps the timer running on hover when pauseOnHover is false', async () => {
    vi.useFakeTimers();

    const id = add({ message: 'no pause', duration: 1000, pauseOnHover: false });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, { props: { notification: stored } });

    await wrapper.trigger('mouseenter');
    vi.advanceTimersByTime(1000);
    expect(notifications.value.find(n => n.id === id)).toBeUndefined();

    vi.useRealTimers();
  });

  it('renders the custom icon as an img when set', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ icon: 'icon.svg' }) }
    });

    expect(wrapper.find('img.notification__icon').attributes('src')).toBe('icon.svg');
  });

  it('renders a built-in inline icon for typed notifications without a custom icon', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ type: 'success' }) }
    });

    const svg = wrapper.find('svg.notification__icon');
    expect(svg.exists()).toBe(true);
    expect(wrapper.find('img.notification__icon').exists()).toBe(false);
  });

  it('built-in icon inherits the text color (fill=currentColor)', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ type: 'info' }) }
    });

    expect(wrapper.find('svg.notification__icon').attributes('fill')).toBe('currentColor');
  });

  it('renders no icon for the simple type', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ type: 'simple' }) }
    });

    expect(wrapper.find('.notification__icon').exists()).toBe(false);
  });

  it('shows the close button when duration is negative even if not closable', () => {
    const wrapper = mount(NotificationItem, {
      props: { notification: baseNotification({ closable: false, duration: -1 }) }
    });

    expect(wrapper.find('.notification__close').exists()).toBe(true);
  });

  it('removes the notification from the store on close click', async () => {
    const id = add({ message: 'bye', duration: 0, closable: true });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, {
      props: { notification: stored }
    });

    await wrapper.find('.notification__close').trigger('click');
    expect(notifications.value.find(n => n.id === id)).toBeUndefined();
  });

  it('removes the notification on Escape', async () => {
    const id = add({ message: 'esc me', duration: 0 });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, {
      props: { notification: stored }
    });

    await wrapper.trigger('keydown', { key: 'Escape' });
    expect(notifications.value.find(n => n.id === id)).toBeUndefined();
  });

  it('pauses the auto-remove timer while focused and resumes on blur', async () => {
    vi.useFakeTimers();

    const id = add({ message: 'focus me', duration: 1000 });
    const stored = notifications.value.find(n => n.id === id)!;

    const wrapper = mount(NotificationItem, {
      props: { notification: stored }
    });

    await wrapper.trigger('focusin');
    vi.advanceTimersByTime(60_000);
    expect(notifications.value.find(n => n.id === id)).toBeDefined();

    await wrapper.trigger('focusout');
    vi.advanceTimersByTime(1000);
    expect(notifications.value.find(n => n.id === id)).toBeUndefined();

    vi.useRealTimers();
  });
});
