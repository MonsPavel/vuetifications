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

export const Info: Story = {
  render: () => ({
    template: `<button @click="show">Show Info</button>`,
    setup() {
      const show = () =>
        notify({
          title: 'Info',
          message: 'Information',
          type: 'info',
        });
      return { show };
    },
  }),
};

export const Warning: Story = {
  render: () => ({
    template: `<button @click="show">Show Warning</button>`,
    setup() {
      const show = () =>
        notify({
          title: 'Warning',
          message: 'Warning!',
          type: 'warning',
        });
      return { show };
    },
  }),
};

export const Simple: Story = {
  render: () => ({
    template: `<button @click="show">Show Simple Notification</button>`,
    setup() {
      const show = () =>
        notify({
          title: 'Simple Notification',
          message: 'This is Simple Notification',
          type: 'simple',
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

export const Closable: Story = {
  render: () => ({
    template: `<div class="flex gap-2">
      <button @click="closable" style="margin-right: 10px">closable</button>
      <button @click="zeroDuration">zeroDuration</button>
    </div>`,
    setup() {
      const closable = () =>
        notify({
          message: 'This is closable notification, duration 1 min',
          position: 'top-left',
          closable: true,
          duration: 60000,
          type: 'warning',
        });
      const zeroDuration = () =>
        notify({
          title: 'zeroDuration',
          message: 'This notification can close only by click. This notification can close only by click. This notification can close only by click.',
          position: 'top-left',
          duration: 0
        });
      return { closable, zeroDuration };
    },
  }),
};

export const Animations: Story = {
  render: () => ({
    template: `<div class="flex gap-2">
      <button @click="SlideFade" style="margin-right: 10px">Slide Fade</button>
      <button @click="Fade" style="margin-right: 10px">Fade</button>
      <button @click="Slide" style="margin-right: 10px">Slide</button>
      <button @click="Scale" style="margin-right: 10px">Scale</button>
      <button @click="Bounce" style="margin-right: 10px">Bounce</button>
      <button @click="Flip" style="margin-right: 10px">Flip</button>
      <button @click="Zoom" style="margin-right: 10px">Zoom</button>
      <button @click="None" style="margin-right: 10px">None</button>
    </div>`,
    setup() {
      const SlideFade = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'slide-fade'
        });
      const Fade = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'fade'
        });
      const Slide = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'slide'
        });
      const Scale = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'scale'
        });
      const Bounce = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'bounce'
        });
      const Flip = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'flip'
        });
      const Zoom = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'zoom'
        });
      const None = () =>
        notify({
          title: 'Animations',
          message: 'Animations Test',
          animation: 'none'
        });
      return { SlideFade, Fade, Slide, Scale, Bounce, Flip, Zoom, None };
    },
  }),
};
