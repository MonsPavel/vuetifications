<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { getIcon, NotificationIcon, getStyleIcon } from '../utils/icons';
import { remove, pause, resume } from '../core/useNotifications';

import type { Notification } from '../types/notifications';

const props = defineProps<{
  notification: Notification
}>()

const showCloseBtn = computed(() => (props.notification.closable || (props.notification.duration ?? 0) <= 0))

// Стилевой пресет: у classic DOM остаётся прежним
const isStyled = computed(() => !!props.notification.style && props.notification.style !== 'classic')

// У edge таймер не показывается: кромка — статичный маркер типа.
// При loading полосы тоже нет — процесс не имеет обратного отсчёта
const hasTimer = computed(() => (
  isStyled.value
  && props.notification.style !== 'edge'
  && !props.notification.loading
  && !!props.notification.duration
  && props.notification.duration > 0
))

const focused = ref(false);
const hovered = ref(false);
// Фокус всегда ставит на паузу; hover — opt-in (pauseOnHover),
// но у стилевых пресетов пауза на hover — часть контракта пресета
watch(
  () => focused.value || (hovered.value && (!!props.notification.pauseOnHover || isStyled.value)),
  paused => paused ? pause(props.notification.id) : resume(props.notification.id),
  { flush: 'sync' },
);

function onFocusOut(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && (event.currentTarget as HTMLElement).contains(event.relatedTarget)) return;
  focused.value = false;
}

const builtInIcon = computed(() => {
  const { type, icon } = props.notification;
  return type && type !== 'simple' && (!icon || icon === getIcon(type));
});

const styledGlyph = computed(() => (isStyled.value && props.notification.type ? getStyleIcon(props.notification.type) : ''))

const notificationClasses = computed(() => ([
  `notification--${props.notification.type}`,
  `notification-animation--${props.notification.animation || 'slide-fade'}`,
  {
    'notification--has-title': props.notification.title,
    'notification--closable': showCloseBtn.value,
    [`notification--style-${props.notification.style}`]: isStyled.value
  }
]))
</script>

<template>
  <div
    class="notification"
    :class="notificationClasses"
    tabindex="0"
    @focusin="focused = true"
    @focusout="onFocusOut"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="notification.closeOnClick && remove(notification.id)"
    @keydown.escape="remove(notification.id)"
  >
    <span
      v-if="notification.loading"
      class="notification__spinner"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
      >
        <path d="M12 2.5a9.5 9.5 0 1 1-9.5 9.5" />
      </svg>
    </span>

    <span
      v-else-if="isStyled && (styledGlyph || notification.icon)"
      class="notification__chip"
      aria-hidden="true"
    >
      <img
        v-if="notification.icon"
        :src="notification.icon"
        class="notification__icon"
        alt=""
      >
      <!-- eslint-disable vue/no-v-html -->
      <span
        v-else
        class="notification__chip-icon"
        v-html="styledGlyph"
      />
      <!-- eslint-enable vue/no-v-html -->
    </span>

    <NotificationIcon
      v-else-if="builtInIcon"
      :type="notification.type"
    />

    <img
      v-else-if="notification.icon"
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
      <svg
        v-if="isStyled"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
      <span
        v-else
        aria-hidden="true"
      >×</span>
    </button>

    <span
      v-if="hasTimer"
      class="notification__progress"
      aria-hidden="true"
      :style="{ animationDuration: notification.duration + 'ms' }"
    />
  </div>
</template>
