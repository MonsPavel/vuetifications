<script lang="ts" setup>
import { computed, inject } from 'vue';
import { notificationStore, notificationsKey } from '../core/useNotifications';

import type { Notification } from '../types/notifications';

const { notification } = defineProps<{
  notification: Notification
}>()

// Стор берётся из контекста хост-приложения; без провайдера — дефолтный синглтон
const store = inject(notificationsKey, notificationStore);

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
    @focusin="store.pause(notification.id)"
    @focusout="store.resume(notification.id)"
    @keydown.escape="store.remove(notification.id)"
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
      @click="store.remove(notification.id)"
    >
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>
