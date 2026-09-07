# Contributing

Спасибо за интерес к Vuetifications!

## Разработка

```bash
npm ci                # установка зависимостей (Node >= 20)
npm test              # юнит/компонентные тесты (vitest, jsdom)
npm run test:watch    # тесты в watch-режиме
npm run test:coverage # coverage с порогом 80%
npm run lint          # eslint + vue-tsc
npm run build         # сборка ESM-бандла в dist/
npm run storybook     # сторисбук на http://localhost:6006
```

Storybook-тесты (браузерные, через Playwright) запускаются в CI
(`npm run test:storybook`); локально им нужен установленный Chromium:
`npx playwright install chromium`.

## Правила

- TDD: сначала падающий тест (RED), затем реализация (GREEN), затем рефакторинг.
  Коммиты: `test:` — воспроизводитель/RED, `feat:`/`fix:` — GREEN, `refactor:` — чистка.
- Conventional Commits — по ним semantic-release считает версию и CHANGELOG.
- `npm run lint && npm test` должны быть зелёными перед пушем.
- Публичное API меняется только с миграционной заметкой в описании PR
  (breaking-изменения — через `feat!:` / `BREAKING CHANGE:`).

## Отчёты о багах

Откройте issue с минимальным воспроизводителем (реплика или ссылка на песочницу),
версией vue/vuetifications и ожидаемым vs фактическим поведением.
