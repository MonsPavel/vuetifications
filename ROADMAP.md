# Roadmap исправлений и улучшений

> Актуализирован по результатам реализации ветки `feat/v2-plugin-architecture` (v2.0).
> Приоритеты: 🔴 критично · 🟠 важно · 🟡 желательно · ⚪ по возможности

---

## Этап 1 — Тесты и качество кода ✅ (выполнено, v1.7.0)

- [x] 🔴 Скрипт `test` + тесты в CI (матрица Node 20/22)
- [x] 🟠 Юнит/компонентные тесты стора и компонентов, coverage-порог 80%
- [x] 🟠 Сплит `lint:eslint` / `lint:types`
- [x] 🟡 `NotificationManager` → `ensureMounted()`/`unmount()`, tsconfig `moduleResolution: Bundler`

## Этап 2 — Быстрые фиксы API, CSS и a11y ✅ (выполнено, v1.7.0 / PR #35)

- [x] 🔴 `notify()` возвращает `{ id, close() }`; экспортированы `remove(id)` и `clear()`
- [x] 🔴 `notify('текст')` — строковый шорткат
- [x] 🟠 CSS: палитра WCAG AA (`#2E7D32/#C62828/#1565C0/#FFC107`), gap вместо margin,
      `position: absolute` для leave-active, CSS-переменные (font/gap/offset/icon-size),
      `pointer-events`, мобильная адаптация, тёмная тема, `prefers-reduced-motion`
- [x] 🟠 a11y: постоянные live-регионы (polite/assertive), условные `role="region"`,
      hit-area закрытия 44×44, Esc закрывает сфокусированный тост, пауза таймера при фокусе
- [x] 🟡 `<h4>` → `<div>`

## Этап 3 — Архитектура v2.0 ✅ (ветка feat/v2-plugin-architecture)

- [x] 🔴 Настоящий Vue-плагин: `app.use(Vuetifications, { defaults, maxVisible, store })`;
      контейнер рендерится в контексте хост-приложения (`vnode.appContext`), cleanup на
      `app.unmount()`; standalone `createApp` остался только как fallback без плагина
- [x] 🔴 Инстансируемый стор: `createNotificationsStore()` + provide/inject
      (`notificationsKey`), синглтон — fallback для `notify()` вне setup
- [x] 🟠 ESM-only: UMD удалён, `sideEffects: ["**/*.css"]`, `engines.node >= 20`,
      экспорт `"./package.json"`; dual-package hazard устранён
- [x] 🟡 SSR: `notify()` — no-op без `document`; стор изолирован per-app
- [x] 🟠 Peer dependency `vue ^3.5.0` (reactive props destructure), `vue` в devDeps

## Этап 4 — Функциональные фичи ✅/частично (ветка feat/v2-plugin-architecture)

- [x] 🟠 Pause on hover (опция `pauseOnHover`, по умолчанию включена)
- [x] 🟠 `maxVisible` — лимит видимых уведомлений + очередь ожидания
      (таймер стартует при показе)
- [x] 🟠 `update(id, options)` и promise API: `notify.promise(p, { loading, success, error })`
- [x] 🟡 `closeOnClick`
- [ ] 🟡 Кастомный контент: слот / компонент / `h()`-рендер вместо только строк
- [ ] 🟡 Прогресс-бар оставшегося времени (опционально)
- [ ] 🟡 Storybook: отдельные истории на фичи + play-функции

## Документация и гигиена ✅/частично (ветка feat/v2-plugin-architecture)

- [x] 🟠 README: CSS-импорт обязателен, `slide-fade` (опечатка исправлена), `scale`
      в списке, таблица опций (`message` required, `icon`, новые опции), доки плагина,
      handle, `remove`/`clear`, `notify.promise`, SSR-секция
- [x] 🟡 Дедуп CHANGELOG (дубли 1.6.3 / 1.1.0 / 1.0.0)
- [x] 🟡 Удалены мёртвые скрипты `dev`/`preview`; `release.yml` гейтится на CI
      (workflow_run), storybook-тесты добавлены в CI
- [x] ⚪ ROADMAP.md закоммичен, CONTRIBUTING.md, dependabot.yml, CODEOWNERS

### Осталось (ручные шаги / следующие релизы)

- [ ] ⚪ Удалить устаревший экспорт `docs/` (незатреканный, `rm -rf docs`)
- [ ] ⚪ Разобрать stash `animations` (`git stash pop` / `drop`)
- [ ] ⚪ Пиновать GitHub-экшены по SHA вместо тегов; TruffleHog убрать `continue-on-error`
- [ ] ⚪ addon-a11y: режим `error` после прогона историй
- [ ] 🟡 Live-регионы: анонсы при `prefers-reduced-motion` остаются текстовыми
- [ ] ⚪ Nuxt-модуль (обёртка над плагином)
