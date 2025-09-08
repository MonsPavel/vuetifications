# Vuetifications

> 🔔 A lightweight and beautiful notification library for Vue 3.

![TypeScript](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)

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
import 'vuetifications/styles/notifications.css'

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
type NotificationType = 'success' | 'error' | 'info' | 'warning'
type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface NotifyOptions {
  title?: string
  message: string
  icon?: string
  type?: NotificationType           // default: 'info'
  position?: NotificationPosition   // default: 'top-right'
  duration?: number                 // default: 3000 (ms), 0 — never auto-close
  closable?: boolean                // default: false
}

notify(options: NotifyOptions): void
```

---

## ⚙️ Options

| Option      | Type                                                                                       | Default       | Description                              |
|-------------|--------------------------------------------------------------------------------------------|---------------|------------------------------------------|
| `title`     | `string`                                                                                   | `''`          | Notification title                       |
| `message`   | `string`                                                                                   | `''`          | Notification message                     |
| `type`      | `'success' \| 'error' \| 'info' \| 'warning'`                                           | `'info'`      | Notification type                        |
| `position`  | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`                          | `'top-right'` | Notification position                    |
| `duration`  | `number`                                                                                   | `3000`        | Lifetime (ms). `0` — disables auto-close |
| `closable`  | `boolean`                                                                                   | `false`        | Show/Hide close btn                         |
| `animation`  | `'slide-fade' \| 'fade' \| 'slide' \| 'scale' \| 'bounce' \| 'flip' \| 'zoom' \| 'none'`   |  `slide-fade`        | Animation style                     |

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
  --notification-color-second: #000;
  --notification-radius: 10px;
  --notification-shadow: 0px 0px 1px #171a1f, 0px 0px 2px #171a1f14;

  --notification-success: #4CAF50;
  --notification-error: #E85963FF;
  --notification-info: #2196F3;
  --notification-warning: #FDF4F2FF;

  --notification-padding: 16px;
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
