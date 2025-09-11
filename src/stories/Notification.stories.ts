import type { Meta, StoryObj } from '@storybook/vue3';
import type { NotificationOptions } from '../types/notifications';
import { notify } from '../index';

const meta: Meta<NotificationOptions> = {
  title: 'Notifications/Playground',
  tags: ['autodocs'],
  args: {
    type: 'success',
    title: 'Hello!',
    message: 'This is a notification',
    duration: 3000,
    position: 'top-right',
    animation: 'slide-fade',
    closable: true
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['success', 'error', 'info', 'warning'],
    },
    position: {
      control: { type: 'radio' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    animation: {
      control: { type: 'select' },
      options: ['slide-fade', 'fade', 'slide', 'scale', 'bounce', 'flip', 'zoom', 'none'],
    },
    closable: {
      control: { type: 'boolean' },
    },
    duration: {
      control: { type: 'number' },
    },
    title: {
      control: { type: 'text' },
    },
    message: {
      control: { type: 'text' },
    },
  }
};

export default meta;

type Story = StoryObj<NotificationOptions>;

export const Playground: Story = {
  render: (args) => ({
    template: `<button class="storybook-btn" @click="show">Show Notification</button>`,
    setup() {
      const show = () => notify(args);
      return { show };
    }
  })
};
