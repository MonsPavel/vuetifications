<script setup lang="ts">
import { computed } from 'vue';

import { notificationStore as store } from '../core/useNotifications';

import NotificationItem from './NotificationItem.vue';

import { POSITIONS } from '../constants/notification';

import type { NotificationPosition } from '../types/notifications';

const notificationsByPosition = computed(() =>
  store.notifications.value.reduce((groups, n) => {
    (groups[n.position ?? 'top-right'] ||= []).push(n)
    return groups
  }, {} as Record<NotificationPosition, typeof store.notifications.value>)
)
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
        name="notification-group"
        tag="div"
        class="notifications-list"
      >
        <NotificationItem
          v-for="notification in notificationsByPosition[position]"
          :key="notification.id"
          :notification="notification"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped></style>
