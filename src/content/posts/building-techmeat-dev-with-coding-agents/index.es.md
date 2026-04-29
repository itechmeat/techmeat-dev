---
title: "Cómo construí este blog con agentes de programación"
description: "La historia del lanzamiento de techmeat.dev: de una idea espontánea y un conjunto de skills hasta Astro, Cloudflare Pages, el brainstorming y la primera versión del blog."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: es
---

Hace tiempo tuve un blog. Tráfico decente, tema claro, experiencia personal de verdad: escribía sobre frontend y sobre las cosas que yo mismo iba resolviendo. Después, por razones no demasiado importantes, dejé de mantenerlo y, de paso, perdí el dominio.

Durante mucho tiempo me pareció que esa historia simplemente había terminado. Pero hoy volvió a apetecerme escribir, ya no sobre frontend como profesión, sino sobre cómo hago proyectos reales con agentes de programación. Sin abstracciones sobre el futuro del desarrollo: procesos concretos, errores y decisiones.

Así apareció [techmeat.dev](https://techmeat.dev/).

## Por qué empecé esto

La idea fue espontánea. Tenía tokens sin usar acumulándose, varias hipótesis que quería comprobar, y decidí montar un proyecto pequeño pero real: un blog en el que el propio proceso de construirlo se convierte en el primer material.

Mi workflow habitual con agentes está mucho más elaborado: varias etapas de planificación, revisión y puntos de control. Aquí lo simplifiqué a propósito. Quería ver hasta dónde se puede llegar si fijas la dirección rápido, preparas el contexto y le das al agente la mayor parte del trabajo inicial.

No es un proceso de referencia, sino una versión experimental. Sobre el enfoque más estricto seguramente escribiré aparte.

## Preparación: skills, contexto y reglas del proyecto

Lo primero fue instalar las skills necesarias. Para un proyecto así importa más de lo que parece: «hazme un blog» es un planteamiento demasiado débil. El agente necesita reglas claras: qué tecnologías usar, dónde guardar el contenido, cómo pensar el SEO, cómo abordar el diseño, qué no hacer sin necesidad. El conjunto inicial está fijado en el archivo de trabajo [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md).

Después inicialicé `CLAUDE.md`, el archivo con el contexto base del proyecto. El borrador estaba en ruso, pero para el contexto de trabajo lo traduje al inglés enseguida, para que sirviera por igual en todas las locales y en distintas herramientas.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Luego copié `CLAUDE.md` en `AGENTS.md`. No quiero atar el proyecto a un agente concreto: si mañana sigo el desarrollo en otra herramienta, las reglas base se quedan al lado del código.

## Primer arranque: solo cimientos

No le pedí al agente que empezara con páginas o diseño. Al inicio necesitaba unos cimientos técnicos correctos: un proyecto Astro listo para Cloudflare Pages, con una estructura limpia y sin iniciativa de más.

El prompt fue deliberadamente estrecho:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

Cuanto más estrecha es la primera petición, menos opciones hay de que el agente empiece a «mejorar» el proyecto donde aún no se ha tomado ninguna decisión. Eso ahorra muchos nervios: necesitaba un punto de partida fiable, no una maqueta bonita.

## Brainstorming en lugar de diseño prematuro

Después activé Superpowers y empecé un brainstorming, pidiéndole expresamente que no hablara de diseño. En esta fase había que decidir de qué se compone el blog como producto, no qué aspecto tiene.

El prompt fue el siguiente:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

El brainstorming duró cerca de una hora. Para un proyecto tan pequeño suena a mucho, pero el tiempo se amortizó: sin él no habría salido un plan coherente ni una especificación de arquitectura. El agente ayudó a desglosar el blog en páginas, bloques comunes, modelo de idiomas y estructura de contenido.

Como resultado aparecieron dos artefactos internos: el [plan](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) de la primera versión y la [especificación de arquitectura](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Desarrollo autónomo, revisión y arreglos

Tras el brainstorming, solo me quedaba aceptar la dirección y dejar trabajar al agente. La mayor parte de la estructura base apareció de forma autónoma: rutas, contenido en Markdown, locales, componentes, RSS, tags e infraestructura para traducciones.

No fue del todo sin intervención manual. Añadí algunos prompts correctores: precisé el conjunto de idiomas, le pedí que arreglara pequeños bugs y afinara detalles que el agente se saltó en la primera pasada.

Después le pedí a GPT-5.5 que hiciera revisión del código y aplicara los arreglos al momento. Apenas me metí en el proceso: el agente encontró varias mejoras útiles, las aplicó y pasó las verificaciones. Sinceramente, casi toda esta versión la vibe-codeé, algo que normalmente intento evitar. Aquí era admisible: el proyecto es pequeño, el coste del error es bajo, y la idea precisamente era probar los límites de este enfoque.

Aquí se ve bien cómo entiendo el AI coding en general. El agente no es un botón mágico de «hazme un producto», sino un ejecutor muy rápido que necesita marcos, contexto y revisión periódica. Con buenos marcos quita un volumen enorme de trabajo bruto. Con marcos difusos genera incertidumbre con la misma rapidez.

## Por qué pospuse el diseño

A propósito dejé el diseño fuera de la primera fase. Para la parte visual tengo un proceso aparte y quería pasarlo por su cuenta, sin mezclar arquitectura, contenido e interfaz en una sola tarea.

Por eso la primera versión del blog parece un esqueleto técnico: rutas, localización, posts, tags e infraestructura de publicación ya están, y el sistema visual no, y eso está bien. A veces es más útil tener primero un proyecto que funciona y luego pensar con calma cómo se ve y se siente.

## Qué quiero comprobar con este blog

techmeat.dev es un laboratorio de trabajo, no un simple almacén de notas. Me interesa cómo cambia el desarrollo cuando tienes al lado, todo el rato, un agente de programación: dónde acelera el trabajo, dónde crea riesgos ocultos y dónde te ayuda a ver una solución a la que solo habrías llegado mucho más tarde por tu cuenta.

Tres cosas en concreto me llaman la atención.

**Proceso.** No «el agente escribió el código», sino lo que hubo antes y después: qué prompts funcionaron, qué restricciones tuve que poner, qué decisiones es mejor dejarle al humano.

**Calidad.** El AI-assisted development se convierte fácilmente en un torrente de parches si no mantienes plan y revisión. Quiero mostrar tanto los resultados que salieron bien como los puntos en los que el agente se equivocó o donde mi planteamiento no fue lo bastante preciso.

**Reproducibilidad.** Si el enfoque no se puede repetir en el siguiente proyecto, no es un proceso, es un truco puntual. Por eso voy a registrar no solo el código final, sino también los esquemas de trabajo: cómo se planteó la tarea, qué archivos aparecieron, qué herramientas participaron, cómo se tomaron las decisiones.

## Qué sigue

La siguiente etapa es el diseño. La continuación de este post irá precisamente sobre eso: cómo lo hice, qué decisiones tomé, qué salió al final. Aunque cómo va a quedar exactamente, yo todavía no lo sé.

Mientras tanto, para la historia, dejemos guardado cómo se ve el blog hoy:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
