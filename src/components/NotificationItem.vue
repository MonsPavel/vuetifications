<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { getIcon, NotificationIcon } from '../utils/icons';
import { remove, pause, resume } from '../core/useNotifications';

import type { Notification } from '../types/notifications';

const props = defineProps<{
  notification: Notification
}>()

const showCloseBtn = computed(() => (props.notification.closable || (props.notification.duration ?? 0) <= 0))

const focused = ref(false);
const hovered = ref(false);
watch(
  () => focused.value || (hovered.value && !!props.notification.pauseOnHover),
  paused => paused ? pause(props.notification.id) : resume(props.notification.id),
  { flush: 'sync' },
);

function onFocusOut(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && (event.currentTarget as HTMLElement).contains(event.relatedTarget)) return;
  focused.value = false;
}

const builtInIcon = computed(() => {
  const { type, icon } = props.notification;
  return type && type !== 'simple' && (!icon || icon === getIcon(type));
});

const notificationClasses = computed(() => ([
  `notification--${props.notification.type}`,
  `notification-animation--${props.notification.animation || 'slide-fade'}`,
  {
    'notification--has-title': props.notification.title,
    'notification--closable': showCloseBtn.value
  }
]))
</script>

<template>
  <div
    class="notification"
    :class="notificationClasses"
    tabindex="0"
    @focusin="focused = true"
    @focusout="onFocusOut"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="notification.closeOnClick && remove(notification.id)"
    @keydown.escape="remove(notification.id)"
  >
    <NotificationIcon
      v-if="builtInIcon"
      :type="notification.type"
    />
    <img
      v-else-if="notification.icon"
      :src="notification.icon"
      class="notification__icon"
      alt=""
      aria-hidden="true"
    >

    <div class="notification__content">
      <div
        v-if="notification.title"
        class="notification__title"
      >
        {{ notification.title }}
      </div>
      <p class="notification__message">
        {{ notification.message }}
      </p>
    </div>

    <button
      v-if="showCloseBtn"
      class="notification__close"
      aria-label="Close notification"
      @click="remove(notification.id)"
    >
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>
