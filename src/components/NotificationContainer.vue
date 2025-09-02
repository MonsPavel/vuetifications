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

</style>
