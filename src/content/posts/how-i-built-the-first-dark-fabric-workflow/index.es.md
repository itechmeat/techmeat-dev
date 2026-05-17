---
title: "Cómo construí el primer workflow de Dark Factory"
description: "Hermes en un VPS, un grafo kanban de 13 tareas, revisiones entre etapas en diferentes perfiles, un mini-brainstorm con un humano por Telegram y un despliegue bare-HTML al final. El primer stack funcional de Dark Factory — sobrevivió a varios ciclos de depuración y ahora pasa por todas las etapas sin despacho manual."
pubDate: 2026-05-17
locale: es
tags: [dark-factory, hermes, kanban, workflow, claude-code, codex]
ogImage: "/posters/og/posts/how-i-built-the-first-dark-fabric-workflow.png"
prFileId: f437da1df4ad9d05300787b47117a17551261cd17aa5ab05a691717016351ebd
---

En el [post anterior](/es/posts/how-i-built-open-second-brain/) escribí sobre OpenSecondBrain — la capa de memoria que usan los agentes de IA. La memoria es solo la mitad de la historia. La otra mitad es el proceso en sí: quién hace qué, quién revisa a quién, qué cuenta como "hecho", y cómo todo arranca con una sola frase en el chat.

Hoy lancé la primera versión funcional: el workflow `new-project`. Llevo una idea a Telegram y al final obtengo un proyecto desplegado con documentos, diseño, plan y una página pública real.

## Cómo se ve desde fuera

Llevo una idea. Por ejemplo: "necesito una landing de una página para mi pequeño estudio".

Después respondo a rondas cortas de preguntas puntuales. Primero, el brainstorm en sí: quién es la audiencia, qué se quiere destacar, qué stack prefiero, cómo debería sentirse. Luego, a lo largo de cada etapa, un par de sesiones cortas más de 4–5 preguntas: lo que le falte al autor del documento actual para no inventarse cosas.

Todo lo demás lo hace la fábrica. Mientras tanto puedo dedicarme a lo mío.

## Un kanban con tarjetas vivas

Lo más visible de todo esto es el tablero kanban. Cuando digo "sí" al plan final, el orquestador crea 13 tarjetas en una sola pasada, una por cada etapa de trabajo. A partir de ahí, todo ocurre delante de mis ojos.

Las tarjetas se mueven solas. Primero se enciende la primera, aparece la marca `running`, y sé que uno de los subagentes la ha tomado. Unos minutos después la tarjeta pasa a `done` y se enciende la siguiente. Entre cada etapa productora siempre hay una tarjeta de revisión, y otro subagente distinto debe tomarla: el que escribió el documento nunca revisa su propio trabajo.

A veces la revisión falla. Entonces la tarjeta de revisión pasa a `blocked`, junto a ella aparece una nueva fix-task para el mismo autor, y todo el downstream se queda esperando. Cuando el autor corrige y cierra la fix-task, la revisión despierta y vuelve a leer el artefacto. Puede aprobarlo. Puede devolverlo otra vez. Máximo dos rondas, luego se escala a mí.

Al final miro el tablero casi como un seguimiento de pedido: ahora lo están armando, ahora lo empaquetan, ahora lo envían. Solo que no es un mensajero — son varios subagentes trabajando a la vez en diferentes partes de mi proyecto.

## Lo que sale al final

Al final del proceso tengo:

- un `about.md` estructurado con la esencia de la idea;
- `specs.md` con requisitos funcionales y no funcionales;
- `architecture.md` con el contorno técnico;
- `plan.md` con una hoja de ruta por fases hasta el MVP;
- `DESIGN.md` con la identidad visual, tokens, tipografía y pantallas clave;
- un repositorio de GitHub propio del proyecto con todos esos archivos;
- una página pública desplegada en el subdominio `<slug>.techmeat.dev`, sirviendo de momento el HTML más simple posible que refleja `about.md`. Es la promesa de que el proyecto existe y está accesible.

La implementación de la funcionalidad en sí es trabajo de otro workflow, el siguiente. El objetivo de este primero es llevar la idea al estado de "todo descrito, todo acordado, el proyecto tiene su propia dirección". A partir de ahí ya se puede contratar a la fábrica para el desarrollo real.

## Lo que fue difícil

Hice varias pasadas de depuración. En cada una asomaba su propio bug ridículo: un subagente intentaba ordenar su propio directorio de trabajo y mataba su sesión de shell; o se ponía a implementar la funcionalidad en mitad de una etapa, aunque la implementación no entra en este workflow y es trabajo del siguiente. Entre pasadas parcheaba el skill y reiniciaba. En el estado actual el ciclo va limpio de principio a fin.

## Por el camino, la memoria también creció

En el post anterior prometí que [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) era la otra mitad de la historia. Desde entonces esa mitad ha madurado bastante, y para la propia fábrica eso importa.

El cambio principal es que OpenSecondBrain ahora tiene una capa de "memoria observacional". Antes escribía en él a mano, como en un diario. Ahora los subagentes captan mis preferencias sobre la marcha (cosas como "los commits se escriben en imperativo" o "no uses abreviaturas internas sin explicar"), depositan las notas en una bandeja de entrada, y una vez al día un agente Hermes ejecuta `dream` — un pase en segundo plano que convierte las observaciones repetidas en reglas. Esas reglas se cargan automáticamente al inicio de cada nueva sesión, y dejo de repetirme veinte veces.

Además: búsqueda de texto completo en toda la base de conocimiento de OpenSecondBrain, backup y rollback antes de cada pase `dream`, una capa aparte que registra cada operación pagada (qué se pagó, para qué, a qué está vinculada), y protección impuesta por la máquina contra que un agente pise por accidente las reglas de otro. Todo esto es lo que hace posible a la fábrica: cuando un subagente escribe `DESIGN.md`, ya ve mis preferencias acumuladas sobre tipografía e interfaz. Las dejé caer una vez en el chat, OpenSecondBrain las fijó, y ahora viajan con cada nuevo proyecto sin recordatorios.

## Qué sigue

`new-project` es solo el bootstrap. El siguiente será `new-feature`, un workflow que toma un proyecto existente con sus documentos y lleva la siguiente feature hasta producción. Y un tercero, `bugfix`: triaje, repro, fix, verificación, ship. Juntos, esos tres playbooks son mi versión de Dark Factory para una persona: llevo una idea o un reporte de bug, y al final sale una funcionalidad operativa.

Hasta una fábrica completa el camino aún está por delante. Pero el primer trozo está montado y va estable.

Publicar todo esto como opensource todavía es prematuro: en esta etapa es más investigación que producto terminado. En cuanto el proceso completo de construcción de proyectos vaya estable, abriré todo. Sígueme en [X](https://x.com/techmeat).
