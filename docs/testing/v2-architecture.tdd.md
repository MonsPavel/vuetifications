# TDD Evidence Report — v2.0 plugin architecture (`feat/v2-plugin-architecture`)

Источник плана: ревью пакета v1.7.0 + ROADMAP.md (этапы 3–4). Journeys сформулированы
в ходе этого TDD-прогона (файл `*.plan.md` не использовался).

## User journeys

- Как пользователь библиотеки, я подключаю `app.use(Vuetifications, options)` — чтобы
  контейнер жил в контексте моего приложения и снимался при его размонтировании.
- Как пользователь, я вызываю `notify()` вне setup — чтобы тосты уходили в дефолтный
  синглтон без плагина (обратная совместимость).
- Как SSR-приложение, я импортирую пакет на сервере — чтобы `notify()` безопасно
  ничего не делал.
- Как пользователь, я ставлю `maxVisible` — чтобы на экране не скапливались тосты.
- Как пользователь, я жду `notify.promise()` — чтобы показать loading → success/error.
- Как пользователь с темой, я перекрашиваю тосты — чтобы встроенные иконки наследовали
  цвет (`currentColor`), а не были белыми картинками.
- Как скринридер-пользователь, я слышу каждый тост — даже добавленные в один тик.

## Task report (RED → GREEN)

| Задача | RED | GREEN | Команды |
|---|---|---|---|
| `createNotificationsStore` (изоляция, дефолты) | 5/5 failed: export отсутствует | 69/69 | `npx vitest run --project unit src/core/__tests__/createNotificationsStore.test.ts` |
| Vue-плагин `app.use` (контекст хоста, unmount, active store, SSR no-op) | 8/10 failed: `Vuetifications` не существует | 79/79 | `npx vitest run --project unit src/__tests__/install.test.ts` |
| ESM-only упаковка | — (конфиг) | build 13.79 kB + node-смоук экспортов | `npm run build` + `node --input-type=module -e …` |
| `duration < 0` + `currentColor`-иконки | 4 failed: close-btn скрыт, svg не рендерится | 84/84 | Item+store тесты |
| Очередь live-регионов | 2 failed: анонсы перезаписываются | 86/86 | `…/NotificationContainer.test.ts` |
| maxVisible, update, closeOnClick, pauseOnHover, notify.promise | 13 failed | 102/102 | store/item/plugin тесты |

## Test specification

| # | Гарантия | Тест | Тип | Результат |
|---|----------|------|-----|-----------|
| 1 | Два стора изолированы (состояние, seed, таймеры) | `createNotificationsStore.test.ts` | unit | PASS |
| 2 | Кастомные дефолты стора применяются, явные опции побеждают | там же | unit | PASS |
| 3 | `app.use` рендерит контейнер в body и снимает его на `app.unmount()` | `install.test.ts` | unit | PASS |
| 4 | Контейнер наследует контекст хоста; хост-компоненты получают стор через `useNotifications()` | `install.test.ts` | unit | PASS |
| 5 | После `app.unmount()` `notify()` падает обратно на standalone-синглтон | `install.test.ts` | unit | PASS |
| 6 | `remove()`/`clear()` действуют на активный (плагиновый) стор | `install.test.ts` | unit | PASS |
| 7 | `notify()` — no-op на сервере, возвращает callable `close()` | `install.test.ts` | unit | PASS |
| 8 | `duration <= 0` (в т.ч. отрицательная) — постоянный закрываемый тост | `useNotifications.test.ts`, `NotificationItem.test.ts` | unit | PASS |
| 9 | Встроенные иконки — inline SVG `fill=currentColor`; кастомный `icon` — `<img>`; `simple` — без иконки | `NotificationItem.test.ts` | unit | PASS |
| 10 | Несколько анонсов за тик озвучиваются по очереди (polite/assertive) | `NotificationContainer.test.ts` | unit | PASS |
| 11 | `maxVisible`: излишки ждут в очереди, таймер стартует при показе, `clear()` чистит очередь | `createNotificationsStore.test.ts` | unit | PASS |
| 12 | `update()` мержит опции, перезапускает таймер при смене duration, no-op для неизвестного id | `createNotificationsStore.test.ts` | unit | PASS |
| 13 | Клик закрывает тост только при `closeOnClick`; hover ставит таймер на паузу при `pauseOnHover` (по умолчанию вкл.) | `NotificationItem.test.ts` | unit | PASS |
| 14 | `notify.promise`: loading → success/error через `update()`, промис возвращается как есть, без success/error тост закрывается | `plugin.test.ts` | unit | PASS |
| 15 | Сборка: единый ESM `dist/vuetifications.js`, все 7 публичных экспортов резолвятся, SSR-смоук | `npm run build` + node-смоук | integration | PASS |

## Coverage

`npm run test:coverage` (порог 80/80/80/80) — **пройден**:
statements 98.57%, branches 92.9%, functions 97.22%, lines 98.57%.
`index.ts` — 100% (публичный вход покрыт).

## Addendum: фиксы по результатам код-ревью (коммит 5f32f1a)

Код-ревью ветки (ecc:code-reviewer, verdict request-changes) → все 6 находок
закрыты тем же TDD-циклом (7 новых RED-тестов → 109/109 GREEN):

| # | Находка ревью | Гарантия после фикса | Тест |
|---|---|---|---|
| 1 (MAJOR) | `install()` терял `maxVisible` из опций плагина | `app.use(Vuetifications, { maxVisible: 1 })` ограничивает видимые тосты | `install.test.ts: forwards maxVisible` |
| 2 (MAJOR) | тосты из очереди `maxVisible` невидимы для `update()`/`remove()`/`close()` | `remove()`/`update()` действуют и на `pendingQueue`; «вечный loading» из promise-тоста невозможен | `createNotificationsStore.test.ts: remove discards queued / update applies to queued` |
| 3 (MINOR) | `notify.promise` резолвился против текущего активного стора | стор фиксируется на момент вызова; чужой тост с тем же id не перезаписывается | `install.test.ts: originating store` |
| 4 (MINOR) | `update()` перезапускал паузу как активный таймер | пауза сохраняется при смене duration | `createNotificationsStore.test.ts: keeps the timer paused` |
| 5 (MINOR) | promise-тост игнорировал `defaults.duration` плагина | финальный тост живёт `store.defaults.duration` | `install.test.ts: honors the plugin default duration` |
| 6 (NIT) | контейнер переозвучивал существующие тосты; drain-цепочка не отменялась | `lastAnnouncedId` инициализируется max id на монтировании; цепочка гасится в `onUnmounted` | `NotificationContainer.test.ts: does not re-announce` |

Попутное улучшение из той же зоны: unmount плагина очищает только созданные
плагином сторы; переданный через `store:` пользовательский стор переживает
размонтирование приложения.

## Известные пробелы / follow-ups

- Storybook play-функции и отдельные истории на новые фичи — CI-джоба
  `storybook-tests` добавлена, но локально браузерные тесты не запускались.
- Кастомный контент (слот/h()) и прогресс-бар — следующий релиз (ROADMAP, Этап 4).
- `icons.ts` branch coverage 50% (fallback на неизвестный тип) — сознательно не
  покрыт, путь защитный.
- Секрет-сканер/SHA-пиннинг экшенов — вне скоупа ветки (ROADMAP «Осталось»).
