<script setup lang="ts">
import { computed, ref, watch } from 'vue';

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

// Постоянные live-регионы: динамически вставленный role="status" озвучивается ненадёжно
const politeMessage = ref('');
const assertiveMessage = ref('');
let lastAnnouncedId = 0;

watch(
  // максимальный id монотонно растёт: ловим добавления даже когда add+remove
  // в одном тике не меняют length
  () => store.notifications.value.reduce((max, n) => Math.max(max, n.id), 0),
  () => {
    for (const n of store.notifications.value) {
      if (n.id <= lastAnnouncedId) continue;
      lastAnnouncedId = n.id;

      const text = [n.title, n.message].filter(Boolean).join('. ');

      if (n.type === 'error') {
        assertiveMessage.value = text;
      } else {
        politeMessage.value = text;
      }
    }
  }
)
</script>

<template>
  <div class="notifications-root">
    <div
      class="notifications-sr-region"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ politeMessage }}
    </div>
    <div
      class="notifications-sr-region"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {{ assertiveMessage }}
    </div>

    <div
      v-for="position in POSITIONS"
      :key="position"
      class="notifications-container"
      :class="`notifications-container--${position}`"
      :role="notificationsByPosition[position]?.length ? 'region' : undefined"
      :aria-label="notificationsByPosition[position]?.length ? `Notifications ${position}` : undefined"
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
