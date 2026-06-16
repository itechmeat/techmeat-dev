---
title: "Open Second Brain ya es estable y Dark Factory recibió su siguiente capa"
description: "Open Second Brain llegó a una versión estable, Hermes puede usarlo como memoria nativa y Hermes Workflows convierte mis playbooks manuales en grafos autónomos de trabajo."
pubDate: 2026-06-16
locale: es
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
prFileId: 1a8a29ef984eccf695c7c483acfe2747def5bbc39d8f08a902acd3b0c1a4ffe7
---

Sigo metiéndome cada vez más en el ecosistema de Hermes Agent. En mayo todavía parecía una serie de experimentos conectados - memoria, Kanban, Telegram, subagentes, revisiones entre etapas -, pero ahora todo empieza a formar un sistema más completo.

Mi objetivo sigue siendo el mismo: construir mi pequeña **Dark Factory**. No “un agente que ayuda a escribir código”, sino una fábrica donde una idea pasa por un proceso claro: análisis, planificación, implementación, revisión, tests, despliegue y registro de decisiones en memoria. La autonomía completa aún está lejos, pero una parte ya funciona. Mucho de lo que antes requería mi coordinación manual ahora avanza solo.

En las últimas semanas crecieron sobre todo dos capas: [Open Second Brain](https://github.com/itechmeat/open-second-brain) como memoria y [Hermes Workflows](https://github.com/itechmeat/hermes-workflows) como futuro orquestador.

## Open Second Brain dejó de ser un experimento

Open Second Brain ya tiene una versión estable. Para mí es una frontera psicológica importante: el proyecto dejó de sentirse como “probemos rápido una idea” y empezó a comportarse como una herramienta de uso diario.

Los contratos públicos tiemblan menos. Hermes puede conectar O2B como memory provider nativo, no como un parche lateral. Hermes en mi portátil, Hermes en una VPS, Claude Code, Codex y otros runtimes pueden mirar el mismo vault Markdown sin perder reglas acumuladas, preferencias ni trazas de decisiones.

Ya expliqué por qué importa en el post sobre [cómo desarrollé OpenSecondBrain](/es/posts/how-i-built-open-second-brain/). En corto: el desarrollo con agentes choca muy rápido con el problema de la memoria. No “qué dijo el modelo en la última respuesta”, sino qué decidimos hace una semana, qué reglas repetí cinco veces, qué artefactos existen, dónde vive el contexto del proyecto y qué conclusiones no deben perderse en la siguiente compactación.

O2B lo resuelve de forma muy terrenal: un vault compatible con Obsidian, Markdown plano, `Brain/`, herramientas CLI/MCP deterministas, pasadas `dream`, aplicación por etapas de cambios de memoria, rollback, búsqueda, notas diarias, preferences y pinned context. Ningún cerebro SaaS oculto que haya que confiar aparte. Los archivos están conmigo.

## Las estrellas y la motivación real

El plugin va ganando popularidad poco a poco. En el momento de escribir esto, el repositorio tiene [71 estrellas](https://github.com/itechmeat/open-second-brain), todavía lejos de miles.

Pero mi objetivo no es “juntar estrellas”. Claro que sería agradable. Las estrellas ayudan a otros a ver que el proyecto está vivo y le dan algo más de visibilidad. Si O2B te resulta útil o interesante, una estrella ayuda.

La motivación principal es otra: yo soy el usuario principal de este plugin. Primero resuelve mis propias tareas. Estoy construyendo un entorno Hermes donde los agentes tienen que recordar mis preferencias, escribir eventos, explicar de dónde salen sus conclusiones y trasladar contexto entre sesiones. Si funciona bien para ese caso, ya se pagó solo.

Lo demás es un efecto secundario agradable.

## Una prueba independiente de memoria

La señal más interesante no vino del README ni de mi autopromoción, sino de un desarrollador independiente que comparó plugins de memoria en una instalación limpia de Hermes. Le dio al agente varias opciones - reddit obsidian layout, OpenSecondBrain, Honcho y OpenViking - y Hermes eligió O2B como memoria preferida.

El comentario casi parece publicidad, aunque no lo pedí:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

Para mí no es tan importante la frase “80% de Honcho”. Ese tipo de comparación siempre es aproximado: objetivos distintos, arquitecturas distintas, madurez distinta.

Lo importante es otra cosa: una persona externa lo puso en un entorno limpio, dio a elegir al agente y O2B fue lo bastante claro y útil como para ser elegido sin mi mano inclinando la balanza. Para un proyecto que empezó como memoria interna de mi Hermes, es un buen hito.

## Dónde está Dark Factory ahora

Si miro Dark Factory completa, ya tengo automatizadas partes que antes eran el trabajo manual más aburrido.

Puedo darle a Hermes una idea de proyecto en Telegram. Hace preguntas de aclaración, divide el trabajo en etapas, crea documentos, mueve tarjetas por Kanban, manda la revisión a otro perfil, corrige comentarios, despliega el resultado y escribe eventos importantes en memoria. Es el mismo ciclo que mostré en el post sobre el [primer workflow de Dark Factory](/es/posts/how-i-built-the-first-dark-fabric-workflow/) y luego en [Startit](/es/posts/dark-factory-and-open-second-brain-at-startit/).

Aquí hay otro video de esa misma línea de experimentos.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain y Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Esto todavía no es “apretar un botón y olvidarse para siempre”. Leo resultados, ajusto el proceso, a veces paro un run, a veces devuelvo una tarea. Pero el cambio clave ya ocurrió: dejo de ser el despachador permanente entre agentes. Cada vez más mi rol es formular la intención, tomar algunas decisiones y revisar el resultado.

Para una sola persona, eso ahorra mucha atención.

## La nueva capa: Hermes Workflows

La siguiente pieza grande está en desarrollo activo: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). El proyecto todavía es joven, pero es justo la parte que debería cambiar las reglas.

Antes, mis workflows eran más bien playbooks bien descritos encima de Hermes: Kanban, cron, perfiles, roles, acuerdos manuales y algo de pegamento. Ya funcionaba, pero parte del proceso seguía viviendo en mi cabeza y en instrucciones.

`hermes-workflows` da otro paso: el workflow se convierte en un grafo.

Dentro del grafo hay nodos:

- `agent_task` - una tarea para un perfil concreto de Hermes;
- `script` - un paso shell determinista cuando no hace falta un modelo;
- `condition` - una rama según el resultado anterior;
- `human_review` - un punto explícito donde hace falta una persona;
- `finish` - finalización con entrega del resultado.

Lo importante: no es un motor separado que intenta reemplazar a Hermes. El workflow compila a primitivas nativas de Hermes: Kanban, Cron, Profiles, delivery router, skills. El sistema sigue siendo legible desde las mismas superficies que ya uso.

Para Dark Factory esto es clave. Cuando el proceso está descrito como grafo, se puede validar, exportar, reutilizar, lanzar por calendario, observar con live telemetry por nodo, ver approvals pendientes, reintentar y analizar traces tras una caída. Ya no es “al agente le dijeron que siguiera una instrucción”, sino un contrato ejecutable.

## Por qué acerca la fábrica a la autonomía

La debilidad principal de Dark Factory no es que los agentes escriban mal código. Se equivocan, claro, pero eso se controla con revisiones, tests y restricciones. La debilidad principal es la gestión del proceso.

Si el proceso vive en un prompt largo, es frágil. El agente puede saltarse una etapa, mezclar roles, olvidar que la implementación necesita revisión por otro perfil o empezar trabajo downstream antes de que upstream haya pasado revisión.

Un grafo lo resuelve de forma más ingenieril. Cada nodo tiene entrada, salida, estado y reglas de transición. Si la revisión falla, downstream no despierta. Si un script falla, el agente no finge que todo está bien. Si hace falta una persona, el workflow se detiene en `human_review` en vez de adivinar.

Aquí O2B y Hermes Workflows se juntan en un sistema:

- workflows llevan el proceso;
- Hermes ejecuta tareas con mecanismos nativos;
- Open Second Brain guarda contexto, preferencias, decisiones y trazas de runs;
- la persona queda en el circuito donde realmente importa.

Esto ya se parece más a una fábrica que a un conjunto de trucos sueltos con AI.

## Qué sigue

El objetivo cercano es llevar `hermes-workflows` al punto donde pueda mostrar una demo completa: no solo un grafo bonito en un dashboard, sino un run que pasa por varias etapas de agentes, revisión, ramas, escritura en memoria y entrega del resultado.

Cuando eso sea estable, Dark Factory estará mucho más cerca de la forma por la que empecé todo esto. Idea de entrada. Grafo de proceso. Varios agentes con roles distintos. Memoria que sobrevive sesiones. La persona no como despachador, sino como dueña de la intención y de la decisión final.

Lo más interesante: Dark Factory ya empezó a construirse a sí misma. Cada noche hace un research pass: busca nuevas ideas para mejorar Open Second Brain, compara enfoques, extrae patrones útiles y crea tareas en el Kanban de Hermes. Luego, de vez en cuando, toma un scope adecuado para implementarlo, lo lleva a PR y, después de mi approve, lo convierte en release.

Puedes ver ejemplos en [GitHub Releases de Open Second Brain](https://github.com/itechmeat/open-second-brain/releases). A partir de `v1.12.0`, los releases fueron implementados completamente por Hermes sin mi participación en el código. Yo solo tuve que leer el PR generado y aprobarlo.

Suena un poco grande, pero hace un par de meses Open Second Brain era solo un repositorio vacío. Ahora es un plugin estable que Hermes puede elegir como memoria.

Veremos hasta dónde consigo llevar esta fábrica.
