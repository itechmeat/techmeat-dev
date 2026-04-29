---
title: "Как я разрабатывал этот блог с помощью кодинг-агентов"
description: "История запуска techmeat.dev: от спонтанной идеи и набора skills до Astro, Cloudflare Pages, брейншторминга и первой версии блога."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: ru
prFileId: 606bf74ae1eec28d97eefbf4bbd07aab66cbb0f028249981dc2c2b8dd5158ecf
---

Когда-то у меня уже был блог. Посещаемость — неплохая, тема — понятная, опыт — личный: я писал о фронтенде и о том, что сам проходил руками. Потом по не очень важным причинам я перестал его поддерживать и заодно потерял домен.

Долго казалось, что история закончилась. А сегодня снова захотелось писать, уже не о фронтенде как о профессии, а о том, как я делаю реальные проекты с кодинг-агентами. Без абстракций о будущем разработки, через конкретные процессы, ошибки и решения.

Так появился [techmeat.dev](https://techmeat.dev/).

## Почему я вообще начал

Идея была спонтанной. У меня накопились неиспользованные токены, было несколько гипотез, которые хотелось проверить, и я решил собрать небольшой настоящий проект: блог, в котором сам процесс создания становится первым материалом.

Обычно мой workflow с агентами устроен намного сложнее: несколько стадий планирования, ревью и контрольных точек. Здесь я сознательно его упростил. Хотелось проверить, как далеко можно уехать, если быстро задать направление, подготовить контекст и отдать агенту большую часть стартовой работы.

Это не эталонный процесс, а экспериментальная версия. О более строгом подходе я, скорее всего, напишу отдельно.

## Подготовка: skills, контекст и правила проекта

Сначала я установил нужные skills. Для такого проекта это важнее, чем кажется: «сделай блог» — слишком слабая постановка задачи. Агенту нужны понятные правила: какие технологии использовать, где хранить контент, как думать о SEO, как работать с дизайном, чего не делать без необходимости. Стартовый набор зафиксирован в рабочем файле [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md).

После этого я инициализировал `CLAUDE.md` — файл с базовым контекстом проекта. Сам черновик был на русском, но в рабочий контекст я сразу перевел его на английский, чтобы он одинаково годился для всех локалей и инструментов.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Затем я скопировал `CLAUDE.md` в `AGENTS.md`. Не хочется привязывать проект к одному конкретному агенту: если завтра я продолжу разработку в другом инструменте, базовые правила останутся рядом с кодом.

## Первый запуск: только фундамент

Я не просил агента сразу делать страницы или дизайн. На старте нужен был корректный технический фундамент: Astro-проект под Cloudflare Pages, с понятной структурой и без лишней самодеятельности.

Промпт был намеренно узким:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

Чем точнее первый запрос, тем меньше шанс, что агент начнет «улучшать» проект там, где еще нет принятого решения. Это экономит много нервов: мне нужен был не красивый макет, а надежная стартовая точка.

## Брейншторминг вместо преждевременного дизайна

Дальше я включил Superpowers и запустил брейншторминг, специально попросив не обсуждать дизайн. На этом этапе нужно было решить, из чего блог состоит как продукт, а не как он выглядит.

Промпт выглядел так:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

Брейншторминг занял около часа. Для такого небольшого проекта это много, но время окупилось: без него внятного плана и архитектурной спецификации не получилось бы. Агент помог разложить блог на страницы, общие блоки, языковую модель и контентную структуру.

В итоге появились два внутренних артефакта: [план](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) первой версии и [спецификация архитектуры](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Автономная разработка, ревью и фиксы

После брейншторминга оставалось согласиться с направлением и дать агенту работать. Большая часть базовой структуры появилась автономно: маршруты, Markdown-контент, локали, компоненты, RSS, теги, инфраструктура для переводов.

Совсем без ручного вмешательства не обошлось. Я добавил несколько корректирующих промптов: уточнил набор языков, попросил поправить мелкие баги и подтянуть детали, которые агент пропустил в первом проходе.

Потом я попросил GPT-5.5 сделать ревью кода и сразу внести фиксы. В сам процесс я почти не вмешивался: агент нашел несколько полезных улучшений, применил их и прогнал проверки. Честно говоря, эту версию я почти целиком завайбкодил, чего обычно стараюсь избегать. Здесь это было допустимо: проект небольшой, цена ошибки невысокая, а смысл как раз был в том, чтобы проверить границы подхода.

Здесь хорошо видно, как я воспринимаю AI coding в принципе. Агент — не магическая кнопка «сделай продукт», а очень быстрый исполнитель, которому нужны рамки, контекст и периодическое ревью. С хорошими рамками он снимает большой объем черновой работы. С расплывчатыми — так же быстро начинает производить неопределенность.

## Почему дизайн я отложил

Я сознательно не включал дизайн в первую фазу. Для визуальной части у меня есть отдельный процесс, и я хотел пройти его отдельно, не смешивая архитектуру, контент и интерфейс в одну задачу.

Первая версия блога поэтому выглядит как технический скелет: маршруты, локализация, посты, теги и публикационная инфраструктура уже есть, а визуальная система — нет, и это нормально. Иногда полезнее сначала получить работающий проект, а потом спокойно думать, как он выглядит и ощущается.

## Что я хочу проверить этим блогом

techmeat.dev — это рабочая лаборатория, не просто склад заметок. Мне интересно, как меняется разработка, когда рядом постоянно есть кодинг-агент: где он ускоряет работу, где создает скрытые риски, а где помогает увидеть решение, до которого сам я добрался бы намного позже.

Особенно меня занимают три вещи.

**Процесс.** Не «агент написал код», а что было до и после: какие промпты сработали, какие ограничения пришлось задать, какие решения лучше оставлять человеку.

**Качество.** AI-assisted development легко превращается в поток правок, если не держать план и ревью. Я хочу показывать и удачные результаты, и места, где агент ошибся или где моя постановка задачи была недостаточно точной.

**Повторяемость.** Если подход нельзя повторить в следующем проекте, это не процесс, а разовый трюк. Поэтому я буду фиксировать не только итоговый код, но и рабочие схемы: как ставилась задача, какие файлы появлялись, какие инструменты участвовали, как принимались решения.

## Что дальше

Следующий этап — дизайн. Продолжение этого поста будет уже как раз про него: как я его делал, какие решения принимал, что в итоге получилось. Хотя как именно он будет выглядеть, я пока сам не знаю.

А пока, для истории, пусть сохранится, как блог выглядит сегодня:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
