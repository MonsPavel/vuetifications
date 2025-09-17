# Vuetifications

> 🔔 A lightweight and beautiful notification library for Vue 3.

![TypeScript](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
[![Storybook](https://img.shields.io/badge/storybook-online-ff4785?logo=storybook)](https://MonsPavel.github.io/vuetifications/)

---

## 📖 Live Demo 

You can try notifications in our [Storybook Demo](https://MonsPavel.github.io/vuetifications/).

---

## ✨ Features

- 🎨 Beautiful animations and themes (CSS variables)
- ⚡️ Quick integration with any Vue 3 project
- 🧩 Simple API with `notify()` function
- 🎛️ Positions, icons, duration customization
- 🪶 Minimal dependencies

---

## 📦 Installation

```bash
npm install vuetifications
# or
yarn add vuetifications
# or
pnpm add vuetifications
```

---

## 🚀 Quick Start

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// if styles are in a separate file:
import 'vuetifications/vuetifications.css'

createApp(App).mount('#app')
```

```ts
// inside any component
import { notify } from 'vuetifications'

notify({
  title: 'Success!',
  message: 'This notification works!',
  type: 'success',
  position: 'top-right',
  duration: 3000
})
```

---

## 🧠 API

### `notify(options)`

```ts
type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'simple'
type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type AnimationPreset = 'slide-fade' | 'fade'  | 'slide'  | 'scale' | 'bounce' | 'flip' | 'zoom' | 'none';

interface NotifyOptions {
  title?: string
  message: string
  icon?: string
  type?: NotificationType           // default: 'info'
  position?: NotificationPosition   // default: 'top-right'
  duration?: number                 // default: 3000 (ms), 0 — never auto-close
  closable?: boolean                // default: false
  animation?: AnimationPreset       // default: 'slide-fade'
}

notify(options: NotifyOptions): void
```

---

## ⚙️ Options

| Option      | Type                                                                                       | Default       | Description                              |
|-------------|--------------------------------------------------------------------------------------------|---------------|------------------------------------------|
| `title`     | `string`                                                                                   | `''`          | Notification title                       |
| `message`   | `string`                                                                                   | `''`          | Notification message                     |
| `type`      | `'success' \| 'error' \| 'info' \| 'warning' \| 'simple'`                                          | `'info'`      | Notification type                        |
| `position`  | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`                          | `'top-right'` | Notification position                    |
| `duration`  | `number`                                                                                   | `3000`        | Lifetime (ms). `0` — disables auto-close |
| `closable`  | `boolean`                                                                                   | `false`        | Show/Hide close btn                         |
| `animation`  | `'slide-fade' \| 'fade' \| 'slide' \| 'scale' \| 'bounce' \| 'flip' \| 'zoom' \| 'none'`   |  `slide-fade`        | Animation style                     |

---

## ⚡️ Shorthand Methods

Instead of always passing the `type` option, you can use convenient shortcuts:

```ts
import { notify } from 'vuetifications'

// Success
notify.success(options)

// Error
notify.error(options)

// Info
notify.info(options)

// Warning
notify.warning(options)

// Simple
notify.simple(options)

```

---

## 🎬 Animations

Vuetifications provides multiple built-in transition effects:

- `slid-fade` (default)
- `fade`
- `slide`
- `bounce`
- `flip`
- `zoom`
- `none` - without animations

Usage:

```ts
notify({
  message: 'Bouncy notification!',
  type: 'info',
  animation: 'bounce'
})
```

---

## 🎨 Theming (CSS Variables)

Vuetifications uses CSS variables. Override them globally or per theme container.

```css
:root {
  --notification-color: #fff;
  --notification-color-second: #171a1f;
  --notification-radius: 10px;
  --notification-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  --notification-border: 1px solid rgba(0, 0, 0, 0.05);

  --notification-success: #4CAF50;
  --notification-error: #E85963FF;
  --notification-info: #2196F3;
  --notification-warning: #FDF4F2FF;
  --notification-simple: #FFF;

  --notification-padding: 24px;
  --notification-width: 320px;
  --notification-z-index: 9999;
}
```

---

Example of style override:

```css
/* Example: custom border radius and font */
.notification {
  border-radius: 12px;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
```

---

## 📍 Positioning

```ts
notify({ message: 'Top left', position: 'top-left' })
notify({ message: 'Bottom right', position: 'bottom-right' })
```

Available positions: `top-left`, `top-right`, `bottom-left`, `bottom-right`.

---

## 🧩 Compatibility

- Vue **3.x**
- TypeScript support out of the box

---

## 🤝 Contributing

PRs and ideas are welcome!  
If you found a bug or want to suggest a feature — open an issue.

---

## 📜 License

[MIT](./LICENSE)

---

## ⭐️ Support

If you like this library — give it a ⭐ on GitHub.  
Your support motivates further development!
