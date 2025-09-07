<script setup lang="ts">
import { notificationStore as store } from '../core/useNotifications';

import { getIcon } from '../utils/icons'

const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

const filteredByPosition = (pos: string) => {
  return store.notifications.value.filter(n => n.position === pos);
};
</script>

<template>
  <div>
    <div
      v-for="pos in positions"
      :key="pos"
      class="notifications-container"
      :class="`notifications-container--${pos}`"
    >
      <transition-group
        name="slide-fade"
        tag="div"
      >
        <div
          v-for="n in filteredByPosition(pos)"
          :key="n.id"
          class="notification"
          :class="`notification--${n.type}`"
        >
          <img
            v-if="getIcon(n)"
            :src="getIcon(n)"
            class="notification-icon"
            alt="icon"
          >
          <div class="notification-content">
            <div
              v-if="n.title"
              class="notification-title"
            >
              {{ n.title }}
            </div>
            <div class="notification-message">
              {{ n.message }}
            </div>
          </div>
          <button
            v-if="n.closable || n.duration === 0"
            class="close"
            @click="store.remove(n.id)"
          >
            ✕
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped></style>
