<script setup lang="ts">
import { computed } from 'vue';
import { notificationStore as store } from '../core/useNotifications';
import { getIcon } from '../utils/icons';
import { POSITIONS } from '../constants/notification';

import type { NotificationPosition } from '../types/notifications';

const notificationsByPosition = computed(() => {
  const groups: Partial<Record<NotificationPosition, typeof store.notifications.value>> = {};
  
  POSITIONS.forEach(position => {
    groups[position] = store.notifications.value.filter(n => n.position === position);
  });
  
  return groups;
});
</script>

<template>
  <div class="notifications-root">
    <div
      v-for="position in POSITIONS"
      :key="position"
      class="notifications-container"
      :class="`notifications-container--${position}`"
      role="region"
      :aria-label="`Notifications ${position}`"
    >
      <transition-group
        name="slide-fade"
        tag="div"
        class="notifications-list"
      >
        <div
          v-for="notification in notificationsByPosition[position]"
          :key="notification.id"
          class="notification"
          :class="[
            `notification--${notification.type}`,
            { 'notification--has-title': notification.title }
          ]"
          role="alert"
          :aria-live="notification.type === 'error' ? 'assertive' : 'polite'"
        >
          <img
            v-if="getIcon(notification)"
            :src="getIcon(notification)"
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
            v-if="notification.closable || notification.duration === 0"
            class="notification__close"
            aria-label="Close notification"
            @click="store.remove(notification.id)"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped></style>
