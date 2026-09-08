import type { Meta, StoryObj } from '@storybook/vue3';
import type { NotificationOptions } from '../types/notifications';
import { clear, notify } from '../index';
import { unmount } from '../core/mount';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta<NotificationOptions> = {
  title: 'Notifications/Playground',
  tags: ['autodocs'],
  beforeEach: () => {
    clear();
    unmount();
    return () => { clear(); unmount(); };
  },
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
      options: ['success', 'error', 'info', 'warning', 'simple'],
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
    closeOnClick: { control: { type: 'boolean' } },
    pauseOnHover: { control: { type: 'boolean' } },
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

const render: Story['render'] = (args) => ({
    template: `<button class="storybook-btn" @click="show">Show Notification</button>`,
    setup() {
      const show = () => notify(args);
      return { show };
    }
  });

export const Playground: Story = {
  render,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    const body = within(canvasElement.ownerDocument.body);
    const close = await body.findByRole('button', { name: 'Close notification' });
    await expect(canvasElement.ownerDocument.querySelector('svg.notification__icon')).toHaveAttribute('fill', 'currentColor');
    await userEvent.click(close);
    await waitFor(() => expect(canvasElement.ownerDocument.querySelector('.notification')).toBeNull());
  },
};

export const CloseOnClick: Story = {
  render,
  args: { closeOnClick: true, duration: 0 },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    const toast = canvasElement.ownerDocument.querySelector<HTMLElement>('.notification')!;
    await waitFor(() => expect(toast).toBeVisible());
    await userEvent.click(toast);
    await waitFor(() => expect(toast).not.toBeInTheDocument());
  },
};

export const PermanentNotification: Story = {
  render,
  args: { duration: -1, closable: false },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    const close = await within(canvasElement.ownerDocument.body).findByRole('button', { name: 'Close notification' });
    await userEvent.click(close);
    await waitFor(() => expect(canvasElement.ownerDocument.querySelector('.notification')).toBeNull());
  },
};

export const HoverAndFocus: Story = {
  render,
  args: { pauseOnHover: true, duration: 1500 },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button');
    await userEvent.click(trigger);
    const toast = canvasElement.ownerDocument.querySelector<HTMLElement>('.notification')!;
    await userEvent.hover(toast);
    await new Promise(resolve => setTimeout(resolve, 1600));
    await expect(toast).toBeInTheDocument();
    toast.focus();
    await userEvent.unhover(toast);
    await new Promise(resolve => setTimeout(resolve, 1600));
    await expect(toast).toHaveFocus();
    trigger.focus();
    await waitFor(() => expect(toast).not.toBeInTheDocument(), { timeout: 2500 });
  },
};
