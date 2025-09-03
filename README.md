# Vuetifications

> 🔔 Лёгкая и красивая библиотека уведомлений для Vue 3.

![npm](https://img.shields.io/npm/v/vuetifications.svg)
[![npm version](https://img.shields.io/npm/v/your-package-name/beta?color=blue&label=beta&logo=npm)](https://www.npmjs.com/package/vuetifications)
[![beta](https://img.shields.io/badge/status-beta-important)](https://github.com/vuetifications/branches)
![License](https://img.shields.io/npm/l/vuetifications.svg)
![Downloads](https://img.shields.io/npm/dm/vuetifications.svg)

---

## ✨ Возможности

- 🎨 Красивые анимации и темы (CSS variables)
- ⚡️ Быстрая интеграция в любой проект Vue 3
- 🧩 Простой API через функцию `notify()`
- 🎛️ Позиции, иконки, длительность
- 🪶 Минимум зависимостей

---

## 📦 Установка

```bash
npm install vuetifications
# или
yarn add vuetifications
# или
pnpm add vuetifications
```

---

## 🚀 Быстрый старт

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// если стили идут отдельным файлом:
import 'vuetifications/styles/notifications.css'

createApp(App).mount('#app')
```

```ts
// любой компонент
import { notify } from 'vuetifications'

notify({
  title: 'Успех!',
  message: 'Это уведомление работает!',
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
  type?: NotificationType           // default: 'info'
  position?: NotificationPosition   // default: 'top-right'
  duration?: number                 // default: 3000 (ms), 0 — не автозакрывать
}

notify(options: NotifyOptions): void
```

---

## ⚙️ Опции

| Опция      | Тип                                                                                       | По умолчанию  | Описание                                |
|------------|--------------------------------------------------------------------------------------------|---------------|-----------------------------------------|
| `title`    | `string`                                                                                   | `''`          | Заголовок уведомления                   |
| `message`  | `string`                                                                                   | `''`          | Текст уведомления                       |
| `type`     | `'success' \| 'error' \| 'info' \| 'warning'`                                          | `'info'`      | Тип уведомления                         |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`                         | `'top-right'` | Позиция появления                       |
| `duration` | `number`                                                                                   | `3000`        | Время жизни (мс). `0` — без автозакрытия |

---

## 🎨 Темизация (CSS Variables)

Библиотека использует CSS-переменные. Переопредели их глобально или на контейнере темы.

```css
:root {
  --notification-bg: #fff;
  --notification-color: #000;
  --notification-radius: 8px;
  --notification-shadow: 0 4px 8px rgba(0,0,0,0.1);

  --notification-success: #4caf50;
  --notification-error: #f44336;
  --notification-info: #2196f3;
  --notification-warning: #ff9800;

  --notification-padding: 10px 15px;
  --notification-width: 300px;
  --notification-z-index: 9999;
}
```

---

## 🖼 Иконки

По умолчанию используются встроенные SVG, цвет которых синхронизирован с переменными типа:

- `--notification-success`
- `--notification-error`
- `--notification-info`
- `--notification-warning`

Пример переопределения стилей:

```css
/* пример: скругления и шрифт */
.notification {
  border-radius: 12px;
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
```

---

## 📍 Позиционирование

```ts
notify({ message: 'Top left', position: 'top-left' })
notify({ message: 'Bottom right', position: 'bottom-right' })
```

Позиции: `top-left`, `top-right`, `bottom-left`, `bottom-right`.

---

---

## 🧩 Совместимость

- Vue **3.x**
- TypeScript поддерживается из коробки

---

## 🤝 Вклад

PR и идеи приветствуются!  
Если нашёл баг или хочешь предложить фичу — открой issue.

---

## 📜 Лицензия

[MIT](./LICENSE)

---

## ⭐️ Поддержка

Если библиотека понравилась — поставь ⭐ на GitHub. Это мотивирует развивать проект дальше!
