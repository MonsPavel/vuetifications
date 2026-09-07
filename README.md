# Vuetifications

> 🔔 A lightweight and beautiful notification library for Vue 3.

![TypeScript](https://badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)
[![Storybook](https://img.shields.io/badge/storybook-online-ff4785?logo=storybook)](https://MonsPavel.github.io/vuetifications/)

---

## 📖 Live Demo

You can try notifications in our [Storybook Demo](https://MonsPavel.github.io/vuetifications/).

---

## ✨ Features

- 🎨 Beautiful animations and theming via CSS variables
- ⚡️ Quick integration with any Vue 3 project
- 🧩 Simple API with `notify()`, `notify.promise()` and per-type shortcuts
- 🎛️ Positions, icons, duration, `maxVisible` queue customization
- ♿️ Accessible out of the box: live regions, keyboard, `prefers-reduced-motion`
- 🪶 Zero runtime dependencies — only Vue as a peer

---

## 📦 Installation

Requires **Vue ^3.5** and a bundler with ESM support.

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
import { Vuetifications } from 'vuetifications'
import 'vuetifications/vuetifications.css' // required — styles are not injected automatically

createApp(App)
  .use(Vuetifications) // or .use(Vuetifications, { defaults: { duration: 5000 } })
  .mount('#app')
```

```ts
// inside any component
import { notify } from 'vuetifications'

const handle = notify({
  title: 'Success!',
  message: 'This notification works!',
  type: 'success',
  position: 'top-right',
  duration: 3000
})

handle.close() // close programmatically
```

> `notify()` also works without installing the plugin (a standalone container is mounted
> automatically), but installing it is the recommended way: the container then lives in
> your app context (provide/inject, global components, devtools) and is cleaned up on
> `app.unmount()`.

---

## 🧠 API

### `notify(options | string): NotificationHandle`

Accepts an options object or a plain message string.

```ts
type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'simple'
type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type AnimationPreset = 'slide-fade' | 'fade' | 'slide' | 'scale' | 'bounce' | 'flip' | 'zoom' | 'none'

interface NotificationOptions {
  title?: string
  message: string
  icon?: string                    // custom icon URL; built-in icons are inline SVGs
  type?: NotificationType          // default: 'info'
  position?: NotificationPosition  // default: 'top-right'
  duration?: number                // default: 3000 (ms); <= 0 — never auto-close
  closable?: boolean               // default: false
  animation?: AnimationPreset      // default: 'slide-fade'
  closeOnClick?: boolean           // default: false
  pauseOnHover?: boolean           // default: true
}

interface NotificationHandle {
  id: number
  close(): void
}
```

### Shorthand methods

```ts
notify.success('Saved!')     // shorthand methods accept a string too
notify.error({ message: 'Oops', closable: true })
notify.info('…')
notify.warning('…')
notify.simple('…')           // no icon
```

### `notify.promise(promise, { loading, success, error })`

Shows a loading toast, then swaps it for the success/error one. The original promise is
returned as-is, so you can keep chaining.

```ts
await notify.promise(saveSettings(), {
  loading: 'Saving…',
  success: 'Saved!',
  error: 'Failed to save'
})
```

Each of `loading` / `success` / `error` is a string or a partial options object. If
`success`/`error` is omitted, the loading toast is simply closed. The success/error toast
auto-dismisses after the default duration unless you pass your own `duration`.

### `remove(id)` / `clear()`

```ts
import { notify, remove, clear } from 'vuetifications'

const { id } = notify('Hello')
remove(id)   // close a specific notification
clear()      // close everything
```

Both target the notifications of the app where the plugin is installed
(the default global store when it is not).

### Plugin options

```ts
app.use(Vuetifications, {
  defaults: { duration: 5000, position: 'bottom-right' }, // merged into every toast
  maxVisible: 5,     // at most 5 visible toasts; extras wait in a queue
  store: myStore     // optional pre-built store (see createNotificationsStore)
})
```

### Using notifications inside your components

```ts
import { useNotifications } from 'vuetifications'

const store = useNotifications() // resolves the app store via provide/inject
store.add({ message: 'Hi' })
store.update(id, { message: 'Updated!' }) // e.g. progress → done
```

`createNotificationsStore(options)` builds an isolated store of your own (handy for
tests or multi-tenant UIs).

---

## ⚙️ Options

| Option         | Type                                                                                    | Default        | Description                                        |
|----------------|-----------------------------------------------------------------------------------------|----------------|----------------------------------------------------|
| `title`        | `string`                                                                                | —              | Notification title (optional)                      |
| `message`      | `string`                                                                                | **required**   | Notification message                               |
| `type`         | `'success' \| 'error' \| 'info' \| 'warning' \| 'simple'`                               | `'info'`       | Notification type                                  |
| `position`     | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`                          | `'top-right'`  | Notification position                              |
| `duration`     | `number`                                                                                | `3000`         | Lifetime (ms). `<= 0` disables auto-close          |
| `closable`     | `boolean`                                                                               | `false`        | Show close button (always shown when `duration <= 0`) |
| `animation`    | `'slide-fade' \| 'fade' \| 'slide' \| 'scale' \| 'bounce' \| 'flip' \| 'zoom' \| 'none'`| `slide-fade`   | Animation style                                    |
| `icon`         | `string`                                                                                | built-in SVG   | Custom icon URL; built-in icons inherit text color |
| `closeOnClick` | `boolean`                                                                               | `false`        | Close the toast on click                           |
| `pauseOnHover` | `boolean`                                                                               | `true`         | Pause auto-close while hovered                     |

---

## ⌨️ Accessibility

- Toasts are announced through persistent polite/assertive live regions (queued, so
  several toasts in one tick are all announced).
- The toast is focusable: <kbd>Esc</kbd> closes the focused one; focusing or hovering
  pauses its auto-dismiss timer.
- WCAG AA contrast palette, `prefers-reduced-motion` support, close button ≥ 44×44 px.

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
- `none` — without animations

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
  --notification-color: #fff;                 /* text on colored toasts */
  --notification-color-second: #171a1f;       /* text on warning/simple */
  --notification-radius: 10px;
  --notification-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  --notification-border: 1px solid rgba(0, 0, 0, 0.05);
  --notification-font: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

  /* WCAG AA contrast with white text */
  --notification-success: #2E7D32;
  --notification-error: #C62828;
  --notification-info: #1565C0;
  --notification-warning: #FFC107;
  --notification-simple: #FFF;
  --notification-simple-text: #171a1f;

  --notification-padding: 24px;
  --notification-width: 320px;
  --notification-gap: 10px;         /* spacing between toasts */
  --notification-offset: 20px;      /* distance from viewport edge */
  --notification-icon-size: 24px;
  --notification-z-index: 9999;
}
```

A dark theme (`prefers-color-scheme: dark`) is applied out of the box; override the same
variables inside your own `@media (prefers-color-scheme: dark)` block to customize it.

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

- Vue **^3.5** (reactive props destructure)
- ESM-only package (no UMD build)
- TypeScript support out of the box
- SSR: `notify()` is a safe no-op on the server; install the plugin in a client-only
  context (e.g. Nuxt `<ClientOnly>` / plugin with `mode: 'client'`)

---

## 🤝 Contributing

PRs and ideas are welcome!
If you found a bug or want to suggest a feature — open an issue.
See [CONTRIBUTING.md](./CONTRIBUTING.md) for the development workflow.

---

## 📜 License

[MIT](./LICENSE)

---

## ⭐️ Support

If you like this library — give it a ⭐ on GitHub.
Your support motivates further development!
