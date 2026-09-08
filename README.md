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

// Required: the package extracts styles into this file.
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

### `notify(options | string)`

```ts
type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'simple'
type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type AnimationPreset = 'slide-fade' | 'fade'  | 'slide'  | 'scale' | 'bounce' | 'flip' | 'zoom' | 'none';

interface NotificationOptions {
  title?: string
  message: string
  icon?: string
  type?: NotificationType           // default: 'info'
  position?: NotificationPosition   // default: 'top-right'
  duration?: number                 // default: 3000 (ms), <= 0 — never auto-close
  closable?: boolean                // default: false
  animation?: AnimationPreset       // default: 'slide-fade'
  closeOnClick?: boolean             // default: false
  pauseOnHover?: boolean             // default: false
}

notify(options: NotificationOptions | string): { id: number; close(): void }
```

---

## Updating from 1.7

The 1.8 improvements keep the existing imports, ESM and UMD filenames, Vue peer
range, and notification handles. No plugin installation or store migration is needed.
Both new options are opt-in:

```ts
const handle = notify({
  message: 'Click to dismiss, or hover to keep reading',
  closeOnClick: true,
  pauseOnHover: true
})
handle.close()
```

`notify('message')` and all type shortcuts also return a handle. Use the existing
`remove(id)` and `clear()` exports to dismiss notifications programmatically.

Built-in icons now use inline SVG with the same `.notification__icon` class and
inherit the notification color. If your custom CSS uses `img.notification__icon`,
change that selector to `.notification__icon`. Custom icon URLs still render as images.
Non-positive durations keep a close button even when `closable` is false.

Focus always pauses auto-dismiss; optional hover pause lasts until both hover and
focus have ended. Live regions queue bursts and clear between repeated messages.
Actual announcements depend on the browser and screen reader; DOM tests do not
prove that every message has finished being spoken.

---

## ⚙️ Options

| Option      | Type                                                                                       | Default       | Description                              |
|-------------|--------------------------------------------------------------------------------------------|---------------|------------------------------------------|
| `title`     | `string`                                                                                   | `''`          | Notification title                       |
| `message`   | `string` | required | Notification message |
| `type`      | `'success' \| 'error' \| 'info' \| 'warning' \| 'simple'`                                          | `'info'`      | Notification type                        |
| `position`  | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`                          | `'top-right'` | Notification position                    |
| `duration`  | `number`                                                                                   | `3000`        | Lifetime (ms). `<= 0` disables auto-close |
| `closable`  | `boolean`                                                                                   | `false`        | Show close button; always shown for duration <= 0                         |
| `animation`  | `'slide-fade' \| 'fade' \| 'slide' \| 'scale' \| 'bounce' \| 'flip' \| 'zoom' \| 'none'`   |  `slide-fade`        | Animation style                     |
| `icon` | `string` | built-in SVG | Custom image URL |
| `closeOnClick` | `boolean` | `false` | Close when the toast is clicked |
| `pauseOnHover` | `boolean` | `false` | Pause while the pointer is over the toast |

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

- `slide-fade` (default)
- `fade`
- `slide`
- `scale`
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

Vuetifications uses CSS variables. Override them on `:root` or `body`: the notification container is appended to `document.body`.

```css
:root {
  --notification-color: #fff;
  --notification-color-second: #171a1f;
  --notification-radius: 10px;
  --notification-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  --notification-border: 1px solid rgba(0, 0, 0, 0.05);

  --notification-success: #2E7D32;
  --notification-error: #C62828;
  --notification-info: #1565C0;
  --notification-warning: #FFC107;
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

- Existing Vue peer range and ESM/UMD entry points are unchanged.
- Runtime smoke checks pass on Vue **3.2.0**, **3.4.0**, and the current development version.
- Known pre-existing limitation: Vue **3.0.0** cannot render the current build because
  its runtime lacks compiler helpers such as `createElementVNode`. This also
  reproduces on 1.7 source built with the same toolchain. Use Vue **3.2+**;
  correcting the declared minimum is deferred to the next major release.
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
