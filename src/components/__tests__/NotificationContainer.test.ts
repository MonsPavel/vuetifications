import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';

import NotificationContainer from '../NotificationContainer.vue';
import { notificationStore } from '../../core/useNotifications';
import { POSITIONS } from '../../constants/notification';

const { notifications, add, remove } = notificationStore;

const clearStore = () => {
  for (const n of [...notifications.value]) remove(n.id);
};

afterEach(clearStore);

describe('NotificationContainer', () => {
  it('renders a container for each position', () => {
    const wrapper = mount(NotificationContainer);
    const containers = wrapper.findAll('.notifications-container');

    expect(containers).toHaveLength(POSITIONS.length);
    for (const position of POSITIONS) {
      expect(wrapper.find(`.notifications-container--${position}`).exists()).toBe(true);
    }
  });

  it('renders notifications inside their position container', () => {
    add({ message: 'left one', position: 'top-left', duration: 0 });
    add({ message: 'right one', position: 'bottom-right', duration: 0 });

    const wrapper = mount(NotificationContainer);

    expect(wrapper.find('.notifications-container--top-left').text()).toContain('left one');
    expect(wrapper.find('.notifications-container--bottom-right').text()).toContain('right one');
    expect(wrapper.find('.notifications-container--top-right').findAll('.notification')).toHaveLength(0);
  });

  it('reacts to notifications added after mount', async () => {
    const wrapper = mount(NotificationContainer);
    expect(wrapper.findAll('.notification')).toHaveLength(0);

    add({ message: 'late', duration: 0 });
    await nextTick();

    expect(wrapper.findAll('.notification')).toHaveLength(1);
  });

  it('reacts to notification removal', async () => {
    const id = add({ message: 'gone soon', duration: 0 });
    const wrapper = mount(NotificationContainer);
    expect(wrapper.findAll('.notification')).toHaveLength(1);

    remove(id);
    await nextTick();

    expect(wrapper.findAll('.notification')).toHaveLength(0);
  });

  it('exposes role="region" only for positions with notifications', async () => {
    const wrapper = mount(NotificationContainer);
    expect(wrapper.findAll('[role="region"]')).toHaveLength(0);

    add({ message: 'x', position: 'top-left', duration: 0 });
    await nextTick();

    const regions = wrapper.findAll('[role="region"]');
    expect(regions).toHaveLength(1);
    expect(regions[0].classes()).toContain('notifications-container--top-left');
  });

  it('announces new notifications in the polite live region', async () => {
    const wrapper = mount(NotificationContainer);

    add({ message: 'hello', title: 'Hi', duration: 0 });
    await nextTick();

    expect(wrapper.find('[role="status"]').text()).toBe('Hi. hello');
    expect(wrapper.find('[role="alert"]').text()).toBe('');
  });

  it('announces errors in the assertive live region', async () => {
    const wrapper = mount(NotificationContainer);

    add({ message: 'boom', type: 'error', duration: 0 });
    await nextTick();

    expect(wrapper.find('[role="alert"]').text()).toBe('boom');
    expect(wrapper.find('[role="status"]').text()).toBe('');
  });

  it('announces a notification added in the same tick as a removal', async () => {
    const id = add({ message: 'old', duration: 0 });
    const wrapper = mount(NotificationContainer);

    remove(id);
    add({ message: 'replacement', duration: 0 });
    await nextTick();

    expect(wrapper.find('[role="status"]').text()).toBe('replacement');
  });

  it('keeps the live region text after the notification is removed', async () => {
    const wrapper = mount(NotificationContainer);

    const id = add({ message: 'gone', duration: 0 });
    await nextTick();

    remove(id);
    await nextTick();

    expect(wrapper.find('[role="status"]').text()).toBe('gone');
  });

  it('keeps notifications ordered by insertion within one position', () => {
    add({ message: 'first', position: 'top-right', duration: 0 });
    add({ message: 'second', position: 'top-right', duration: 0 });

    const wrapper = mount(NotificationContainer);
    const messages = wrapper
      .find('.notifications-container--top-right')
      .findAll('.notification__message')
      .map(node => node.text());

    expect(messages).toEqual(['first', 'second']);
  });
});
