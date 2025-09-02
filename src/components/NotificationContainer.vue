<script setup lang="ts">
import { notificationStore as store } from '../core/useNotifications';

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
      <transition-group name="slide-fade" tag="div">
        <div
          v-for="n in filteredByPosition(pos)"
          :key="n.id"
          class="notification"
          :class="`notification--${n.type}`"
        >
          <div class="notification-content">
            <strong v-if="n.title">{{ n.title }}</strong>
            <p>{{ n.message }}</p>
          </div>
          <button class="close" @click="store.remove(n.id)">✕</button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.notifications-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

/* Positions */
.notifications-container--top-left { top: 20px; left: 20px; align-items: flex-start; }
.notifications-container--top-right { top: 20px; right: 20px; align-items: flex-end; }
.notifications-container--bottom-left { bottom: 20px; left: 20px; align-items: flex-start; }
.notifications-container--bottom-right { bottom: 20px; right: 20px; align-items: flex-end; }

.notification {
  background: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  min-width: 250px;
  max-width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.notification--success { border-left: 5px solid #4caf50; }
.notification--error { border-left: 5px solid #f44336; }
.notification--info { border-left: 5px solid #2196f3; }
.notification--warning { border-left: 5px solid #ff9800; }

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.close {
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
}
</style>
