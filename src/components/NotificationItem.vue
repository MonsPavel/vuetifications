<script lang="ts" setup>
import { computed } from 'vue';
import { remove } from '../core/useNotifications';

import type { Notification } from '../types/notifications';

const { notification } = defineProps<{
  notification: Notification
}>()

const notificationClasses = computed(() => ([
  `notification--${notification.type}`,
  `notification-animation--${notification.animation || 'slide-fade'}`,
  { 'notification--has-title': notification.title }
]))

const notificationAriaLive = computed(() => (notification.type === 'error' ? 'assertive' : 'polite'))
const showCloseBtn = computed(() => (notification.closable || notification.duration === 0))
</script>

<template>
  <div
    class="notification"
    :class="notificationClasses"
    role="alert"
    :aria-live="notificationAriaLive"
  >
    <img
      v-if="notification.icon"
      :src="notification.icon"
      class="notification__icon"
      alt=""
      aria-hidden="true"
    >
          
    <div class="notification__content">
      <h4
        v-if="notification.title"
        class="notification__title"
      >
        {{ notification.title }}
      </h4>
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