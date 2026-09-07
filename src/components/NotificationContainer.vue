<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';

import { useNotifications } from '../core/useNotifications';

import NotificationItem from './NotificationItem.vue';

import { POSITIONS } from '../constants/notification';

import type { NotificationPosition } from '../types/notifications';

const store = useNotifications();

const notificationsByPosition = computed(() =>
  store.notifications.value.reduce((groups, n) => {
    (groups[n.position ?? 'top-right'] ||= []).push(n)
    return groups
  }, {} as Record<NotificationPosition, typeof store.notifications.value>)
)

// Постоянные live-регионы: динамически вставленный role="status" озвучивается ненадёжно.
// Анонсы ставятся в очередь: скринридер не слышит два изменения текста за один тик,
// поэтому каждый анонс выставляется по очереди с интервалом.
const politeMessage = ref('');
const assertiveMessage = ref('');
// Уведомления, существовавшие до монтирования контейнера, не переозвучиваем
let lastAnnouncedId = store.notifications.value.reduce((max, n) => Math.max(max, n.id), 0);
let disposed = false;

onUnmounted(() => {
  disposed = true;
});

interface Announcement {
  assertive: boolean;
  text: string;
}

const announcementQueue: Announcement[] = [];
let drainingAnnouncements = false;
const ANNOUNCE_INTERVAL_MS = 100;

function drainAnnouncements() {
  if (drainingAnnouncements) return;
  drainingAnnouncements = true;

  const next = () => {
    if (disposed) {
      drainingAnnouncements = false;
      return;
    }

    const announcement = announcementQueue.shift();

    if (!announcement) {
      drainingAnnouncements = false;
      return;
    }

    if (announcement.assertive) {
      assertiveMessage.value = announcement.text;
    } else {
      politeMessage.value = announcement.text;
    }

    setTimeout(next, ANNOUNCE_INTERVAL_MS);
  };

  next();
}

watch(
  // максимальный id монотонно растёт: ловим добавления даже когда add+remove
  // в одном тике не меняют length
  () => store.notifications.value.reduce((max, n) => Math.max(max, n.id), 0),
  () => {
    for (const n of store.notifications.value) {
      if (n.id <= lastAnnouncedId) continue;
      lastAnnouncedId = n.id;

      announcementQueue.push({
        assertive: n.type === 'error',
        text: [n.title, n.message].filter(Boolean).join('. ')
      });
    }

    drainAnnouncements();
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
