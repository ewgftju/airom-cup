# Как открыть AIROM CUP на своём компьютере

## 1. Установите программы

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js LTS](https://nodejs.org/)
- [Git](https://git-scm.com/download/win)

## 2. Откройте проект

Распакуйте ZIP-архив, откройте Visual Studio Code и выберите:

`Файл → Открыть папку → airom-cup`

## 3. Установите зависимости

Откройте в Visual Studio Code меню `Терминал → Создать терминал` и выполните:

```bash
npm install
```

## 4. Добавьте настройки

Скопируйте файл `.env.example` под именем `.env.local`. Значения переменных можно скопировать в Vercel: `Project → Settings → Environment Variables`.

Не публикуйте `.env.local` и не отправляйте его другим людям — в нём находятся секретные ключи.

## 5. Запустите сайт

```bash
npm run dev
```

Откройте в браузере [http://localhost:3000](http://localhost:3000).

## Где менять данные

- Тексты RU/KZ/EN: `src/i18n/translations.ts`
- Список будущих турниров: `src/data/tournaments.ts`
- Раздел «О AIROM CUP», видео и контакты: `src/components/sections/AboutMediaContact.tsx`
- Стили карточек турниров: `src/components/sections/Tournaments.module.css`
- Стили новых разделов: `src/components/sections/AboutMediaContact.module.css`

## Как проверить изменения перед публикацией

```bash
npm run build
```

Для полной сборки должны быть заполнены переменные из `.env.local`.

