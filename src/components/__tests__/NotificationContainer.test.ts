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
