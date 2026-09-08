import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { nextTick } from 'vue';

import NotificationContainer from '../components/NotificationContainer.vue';
import NotificationItem from '../components/NotificationItem.vue';
import { notificationStore as store } from '../core/useNotifications';

enableAutoUnmount(afterEach);
beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  store.clear();
  vi.useRealTimers();
});

function mountToast(options = {}) {
  const id = store.add({ message: 'Test notification', duration: 1000, ...options });
  const wrapper = mount(NotificationItem, {
    props: { notification: store.notifications.value.find(n => n.id === id)! },
    attachTo: document.body,
  });
  return { id, wrapper };
}

describe('compatible notification improvements', () => {
  it('allows dismissing a negative-duration notification', async () => {
    const { wrapper, id } = mountToast({ duration: -1, closable: false });
    await wrapper.get('button').trigger('click');
    expect(store.notifications.value.some(n => n.id === id)).toBe(false);
  });

  it('keeps click and hover opt-in', async () => {
    const { wrapper, id } = mountToast();
    await wrapper.trigger('click');
    await wrapper.trigger('mouseenter');
    expect(store.notifications.value.some(n => n.id === id)).toBe(true);
    await vi.advanceTimersByTimeAsync(1000);
    expect(store.notifications.value.some(n => n.id === id)).toBe(false);
  });

  it('dismisses on click when enabled', async () => {
    const { wrapper, id } = mountToast({ closeOnClick: true });
    await wrapper.trigger('click');
    expect(store.notifications.value.some(n => n.id === id)).toBe(false);
  });

  it('pauses on hover when enabled and preserves the remaining time', async () => {
    const { wrapper, id } = mountToast({ pauseOnHover: true });
    await vi.advanceTimersByTimeAsync(400);
    await wrapper.trigger('mouseenter');
    await vi.advanceTimersByTimeAsync(5000);
    expect(store.notifications.value.some(n => n.id === id)).toBe(true);
    await wrapper.trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(599);
    expect(store.notifications.value.some(n => n.id === id)).toBe(true);
    await vi.advanceTimersByTimeAsync(1);
    expect(store.notifications.value.some(n => n.id === id)).toBe(false);
  });

  it('keeps the timer paused when hover ends but focus remains', async () => {
    const { wrapper, id } = mountToast({ pauseOnHover: true });
    await wrapper.trigger('mouseenter');
    await wrapper.trigger('focusin');
    await wrapper.trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(2000);
    expect(store.notifications.value.some(n => n.id === id)).toBe(true);
    await wrapper.trigger('focusout');
    await vi.advanceTimersByTimeAsync(1000);
    expect(store.notifications.value.some(n => n.id === id)).toBe(false);
  });

  it('keeps the timer paused when focus ends but hover remains', async () => {
    const { wrapper, id } = mountToast({ pauseOnHover: true });
    await wrapper.trigger('mouseenter');
    await wrapper.trigger('focusin');
    await wrapper.trigger('focusout');
    await vi.advanceTimersByTimeAsync(2000);
    expect(store.notifications.value.some(n => n.id === id)).toBe(true);
    await wrapper.trigger('mouseleave');
    await vi.advanceTimersByTimeAsync(1000);
    expect(store.notifications.value.some(n => n.id === id)).toBe(false);
  });

  it('does not resume when focus moves to the close button', async () => {
    const { wrapper, id } = mountToast({ closable: true });
    await wrapper.trigger('focusin');
    await wrapper.trigger('focusout', { relatedTarget: wrapper.get('button').element });
    await vi.advanceTimersByTimeAsync(2000);
    expect(store.notifications.value.some(n => n.id === id)).toBe(true);
  });

  it.each(['success', 'error', 'info', 'warning'] as const)('renders a themeable built-in %s icon', type => {
    const { wrapper } = mountToast({ type });
    expect(wrapper.get('svg.notification__icon').attributes('fill')).toBe('currentColor');
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('preserves custom image icons', () => {
    const { wrapper } = mountToast({ icon: '/custom.svg' });
    expect(wrapper.get('img').attributes('src')).toBe('/custom.svg');
    expect(wrapper.find('svg').exists()).toBe(false);
  });
});

describe('live-region announcements', () => {
  it('presents every message in a burst in insertion order', async () => {
    const wrapper = mount(NotificationContainer);
    store.add({ message: 'First', duration: 0 });
    store.add({ message: 'Second', duration: 0 });
    store.add({ message: 'Third', duration: 0 });
    await nextTick();
    expect(wrapper.get('[role="status"]').text()).toBe('First');
    await vi.advanceTimersByTimeAsync(200);
    expect(wrapper.get('[role="status"]').text()).toBe('Second');
    await vi.advanceTimersByTimeAsync(200);
    expect(wrapper.get('[role="status"]').text()).toBe('Third');
  });

  it('clears the region between identical announcements', async () => {
    const wrapper = mount(NotificationContainer);
    store.add({ message: 'Saved', duration: 0 });
    await nextTick();
    expect(wrapper.get('[role="status"]').text()).toBe('Saved');
    await vi.advanceTimersByTimeAsync(300);
    store.add({ message: 'Saved', duration: 0 });
    await nextTick();
    expect(wrapper.get('[role="status"]').text()).toBe('');
    await vi.advanceTimersByTimeAsync(100);
    expect(wrapper.get('[role="status"]').text()).toBe('Saved');
  });

  it('routes errors to the assertive region', async () => {
    const wrapper = mount(NotificationContainer);
    store.add({ message: 'Info', duration: 0 });
    store.add({ message: 'Error', type: 'error', duration: 0 });
    await nextTick();
    expect(wrapper.get('[role="status"]').text()).toBe('Info');
    await vi.advanceTimersByTimeAsync(200);
    expect(wrapper.get('[role="alert"]').text()).toBe('Error');
  });

  it('cancels pending announcements on unmount', async () => {
    const wrapper = mount(NotificationContainer);
    store.add({ message: 'First', duration: 0 });
    store.add({ message: 'Second', duration: 0 });
    await nextTick();
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    wrapper.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
