<script lang="ts" setup>
import { computed } from 'vue';
import { remove, pause, resume } from '../core/useNotifications';

import type { Notification } from '../types/notifications';

const { notification } = defineProps<{
  notification: Notification
}>()

const showCloseBtn = computed(() => (notification.closable || notification.duration === 0))

const notificationClasses = computed(() => ([
  `notification--${notification.type}`,
  `notification-animation--${notification.animation || 'slide-fade'}`,
  {
    'notification--has-title': notification.title,
    'notification--closable': showCloseBtn.value
  }
]))
</script>

<template>
  <div
    class="notification"
    :class="notificationClasses"
    tabindex="0"
    @focusin="pause(notification.id)"
    @focusout="resume(notification.id)"
    @keydown.escape="remove(notification.id)"
  >
    <img
      v-if="notification.icon"
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
