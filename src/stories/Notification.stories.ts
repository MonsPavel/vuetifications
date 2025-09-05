import type { Meta, StoryObj } from '@storybook/vue3';
import { notify } from '../index';

import '../assets/styles/main.css';

const meta: Meta = {
  title: 'Notifications/vuetifications',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  render: () => ({
    template: `<button @click="show">Show Success</button>`,
    setup() {
      const show = () =>
        notify({
          title: 'Success',
          message: 'This is a success message!',
          type: 'success',
        });
      return { show };
    },
  }),
};

export const Error: Story = {
  render: () => ({
    template: `<button @click="show">Show Error</button>`,
    setup() {
      const show = () =>
        notify({
          title: 'Error',
          message: 'Something went wrong!',
          type: 'error',
        });
      return { show };
    },
  }),
};

export const Positioned: Story = {
  render: () => ({
    template: `<div class="flex gap-2">
      <button @click="topLeft" style="margin-right: 10px">Top Left</button>
      <button @click="topRight" style="margin-right: 10px">Top Right</button>
      <button @click="bottomLeft" style="margin-right: 10px">Bottom Left</button>
      <button @click="bottomRight">Bottom Right</button>
    </div>`,
    setup() {
      const topLeft = () =>
        notify({
          message: 'Top left notification',
          position: 'top-left',
        });
      const topRight = () =>
        notify({
          message: 'Bottom right notification',
          position: 'top-right',
        });
        const bottomLeft = () =>
          notify({
            message: 'Bottom right notification',
            position: 'bottom-left',
          });
        const bottomRight = () =>
          notify({
            message: 'Bottom right notification',
            position: 'bottom-right',
          });
      return { topLeft, bottomRight, topRight, bottomLeft };
    },
  }),
};
