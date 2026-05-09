---
title: "Cómo construí OpenSecondBrain"
description: "La historia de open-second-brain: cómo Hermes en un VPS, Obsidian, MCP, CLI y varios runtimes de agentes se combinaron en una pequeña memoria basada en archivos para agentes de IA."
pubDate: 2026-05-09
tags: [ai-coding, bun]
locale: es
---

Llevo mucho tiempo usando activamente diversas herramientas de IA, pero en cierto momento quedó claro: no solo las estaba usando, sino que me había «envuelto» casi por completo en agentes y en todo lo relacionado con la IA.

Desde hace varios meses, los agentes me escriben código siguiendo mis flujos de trabajo: planificación, implementación, revisión, correcciones, verificación repetida. Funciona, pero el proceso tiene una extraña cola manual. Incluso cuando un agente escribe el código, sigo teniendo que mover tareas entre etapas, transferir contexto, recordar las reglas, ejecutar comprobaciones y asegurarme de que el siguiente ejecutor entienda lo que ya ha ocurrido.

Había demasiado trabajo repetitivo. Por eso, el siguiente paso natural no fue otra funcionalidad, sino automatizar el propio flujo de trabajo.

Así es como surgió [OpenSecondBrain](https://github.com/itechmeat/open-second-brain): un intento de dar a los agentes una memoria adecuada sobre lo que hacemos, por qué lo hacemos y qué decisiones ya se han tomado.

## De los flujos de trabajo manuales a Dark Fabric

En el primer artículo escribí sobre cómo lancé este blog con agentes de código. Allí el flujo de trabajo fue deliberadamente simple: establecer el contexto, construir un proyecto Astro, pasar por el diseño, añadir entradas y verificar el resultado.

Pero mi proceso habitual es más complejo. Tiene roles, revisiones intermedias, agentes separados para diferentes tipos de tareas y control de calidad en cada paso. Cuando hay muchas tareas de este tipo, la persona se convierte en un despachador: mueve el contexto aquí, pide a aquel que revise esto, dale al siguiente agente la salida del anterior, no olvides registrar la decisión.

Quería llegar a un modelo más riguroso que cada vez suena más como Dark Fabric: entra una idea de funcionalidad, sale una funcionalidad implementada, probada y desplegada. No «un agente escribió un trozo de código», sino una fábrica que sabe cómo descomponer el trabajo en etapas y llevarlo a través del proceso.

Aún estamos lejos de una Dark Fabric completa. Pero el primer paso práctico ya existe: Hermes, ejecutándose en un VPS, con agentes para diferentes tareas, habilidades, una interfaz de Telegram y un enrutamiento económico de modelos a través de OmniRoute.

Y casi de inmediato se hizo evidente la segunda componente obligatoria de esta fábrica: los agentes necesitan memoria.

## Por qué un agente necesita un Second Brain

Si un agente trabaja en una sola sesión, basta con ponerle el contexto en el prompt. Si un agente trabaja en un proyecto durante semanas, eso no es suficiente.

Necesita saber:

- qué reglas ya se han adoptado en el proyecto;
- qué decisiones se discutieron y por qué se eligieron precisamente esas;
- qué hechos surgieron durante las investigaciones;
- qué artefactos ya se han creado;
- qué agentes participaron en el trabajo;
- dónde está la base de conocimiento humana y dónde está la zona de servicio de los agentes.

Y lo más importante: esto no debe depender únicamente de la «memoria del modelo». Necesito un sistema de conocimiento simple, verificable y basado en archivos que pueda abrir manualmente, leer en Obsidian, sincronizar, commitear parcialmente o no commitear en absoluto.

Por eso open-second-brain desde el principio no resultó ser «un chatbot más con memoria», sino una pequeña infraestructura en torno a un vault de Markdown.

## Por qué Obsidian y Markdown

La elección de un vault compatible con Obsidian fue casi obvia.

Primero, son archivos Markdown corrientes. Sin magia, sin bases de datos propietarias, sin dependencia de un servicio específico. Si un agente escribe algo, puedo abrir el archivo y ver el resultado.

Segundo, Obsidian ya resuelve bien la parte humana del Second Brain: notas, wikilinks, Daily Notes, navegación manual, grafo, búsqueda. No tenía sentido crear mi propia interfaz de conocimiento cuando existe una herramienta familiar.

Tercero, los agentes no necesitan todo Obsidian. Necesitan operaciones deterministas: crear una estructura de servicio, añadir un evento al registro diario, construir un índice de páginas, comprobar la salud del vault, exportar la configuración sin secretos. Todo esto se puede hacer a través de CLI y MCP, sin obligar al modelo a «pensar» en operaciones de archivos donde es mejor ejecutar un comando preciso.

Actualmente, open-second-brain crea un área de agentes `AI Wiki/` en el vault, mantiene registros diarios en `Daily/*.md`, puede actualizar un índice Markdown, comprobar la configuración y no toca las notas humanas por encima de la sección de servicio `## Raw events`.

## Di un repositorio vacío — el agente eligió la arquitectura

Lo más interesante: no me senté a diseñar todo esto como una API de biblioteca clásica. Le di al agente enlaces a implementaciones populares, un repositorio vacío y una tarea: crear un plugin universal, principalmente para Hermes, pero de forma que otros agentes también pudieran adoptarlo.

El primer commit fue puramente documental: un README y un bootstrap del proyecto el 6 de mayo. Luego el agente rápidamente construyó una base de CLI, el comando `o2b`, init/doctor, primitivas de vault y un índice. Ese mismo día apareció un servidor MCP — una capa importante, porque a través de MCP diferentes runtimes pueden obtener las mismas herramientas sin análisis manual de la línea de comandos.

Las primeras versiones fueron muy pragmáticas: lograr que Hermes pudiera instalar el plugin, levantar un vault, comprobar el estado y escribir eventos. No una arquitectura perfecta en papel, sino una memoria mínima funcional para un agente real.

Luego el proyecto comenzó a evolucionar bajo la presión de las integraciones.

## De Hermes a un plugin universal

Hermes siguió siendo el runtime principal. Para eso se concibió el proyecto: instalar un plugin, apuntar a un vault, darle herramientas al agente y hacer que escriba eventos importantes en el Second Brain.

Pero pronto quedó claro que vincularse solo a Hermes era un error. Ya tenía diferentes agentes y diferentes entornos: Claude Code, Codex, OpenClaw. Si el Second Brain debía ser una memoria compartida, no podía vivir en un solo cliente.

Así aparecieron en el proyecto adaptadores y manifiestos para varios runtimes:

- Hermes como escenario principal de instalación;
- Claude Code a través de un manifiesto de marketplace y MCP;
- Codex a través de su propio manifiesto de marketplace y MCP;
- OpenClaw primero a través de un adaptador JS, luego a través de una entrada de plugin nativo completa;
- un contrato MCP genérico para runtimes que aparecerán en el futuro.

Esta es una decisión arquitectónica importante: debe haber un solo núcleo, pero puede haber múltiples puntos de entrada. Los agentes no necesitan discutir dónde está la verdad. La verdad está en el vault y en el conjunto compartido de operaciones.

## Lo que hubo que arreglar por el camino

open-second-brain evolucionó muy rápidamente: del 6 al 9 de mayo, el proyecto pasó de un README a la versión `0.7.0`. Y casi cada versión no fue «cosmética», sino una reacción a un problema real de integración.

Por ejemplo, OpenClaw primero obtuvo compatibilidad nativa de plugins, pero el runtime resultó ser más estricto de lo esperado. Hubo que añadir `name` dentro de los objetos tool, hacer `register()` síncrono y luego reescribir el plugin de OpenClaw a JavaScript puro sin `child_process`, porque el escáner de seguridad bloqueaba los subprocesos.

El siguiente gran tema fue la identidad. Si en el diario simplemente dice `@agent`, ese registro es casi inútil. Así que en `0.6.0` apareció un flujo de trabajo con nombres de agentes: `o2b init --agent-name`, registro en `AI Wiki/identity/agents.md` y verificación de que las entradas Daily reciben un `@agent-name` adecuado en lugar de un placeholder.

Luego llegaron el soporte de zonas horarias, la protección contra la escritura en el vault equivocado, los manifiestos de marketplace para Claude y Codex, las auto-instrucciones para MCP, la normalización de argumentos vacíos, la verificación del flujo de instalación y el registro multi-agente. Nada de esto suena como una funcionalidad heroica de producto, pero son exactamente los detalles que distinguen un juguete de una herramienta que puedes dejar funcionando en un servidor.

## Versión 0.7.0: un solo núcleo en TypeScript y Bun

El cambio más grande ocurrió en `0.7.0`: el proyecto migró a un núcleo unificado en TypeScript sobre Bun.

Antes de eso, el repositorio tenía lógica paralela: una implementación en Python para CLI/MCP, una parte en JavaScript para OpenClaw, un shim de Hermes. Este tipo de esquema empieza a desviarse rápidamente. Corregiste un bug en un lugar — no hay garantía de que lo corrigieras en otro. Añadiste soporte de zona horaria en Python — mejor no olvides repetirlo en JS.

En `0.7.0`, el agente eliminó la duplicación: Hermes, Claude Code, Codex y OpenClaw ahora consumen módulos compartidos de `src/core/`. El CLI vive en `src/cli/`, MCP en `src/mcp/`, y la entrada de OpenClaw se compila de TypeScript a un bundle JS mediante `bun build`.

De paso apareció un conjunto de pruebas adecuado: `bun:test` con 176 casos, pruebas del shim de Python, una prueba concurrente de append-event con 12 procesos, comprobaciones de frescura del bundle y verificación de sincronización de versiones en los manifiestos.

Este es precisamente el momento donde se nota la ventaja de un flujo de trabajo con agentes. A una persona le resulta desagradable migrar manualmente el mismo código entre runtimes y reescribir pruebas. Para un agente, está bien, siempre que le des un objetivo claro, restricciones y verificación del resultado.

## Cómo funciona en un VPS

Toda esta historia se ejecuta en un VPS normal por unos 8 dólares al mes. Allí también vive Hermes, allí se puede desarrollar, allí se gestionan las suscripciones de IA y el enrutamiento de modelos a través de OmniRoute.

Para mí, esta es una parte importante del experimento. No quiero que los flujos de trabajo asistidos por IA requieran una infraestructura cara y separada. Necesito un servidor, un navegador, Telegram como interfaz del agente, repositorios git cercanos y acceso barato a modelos.

El resultado es una imagen bastante extraña pero funcional: puedo escribirle al agente en Telegram desde el teléfono, él analizará la tarea en el VPS, irá al repositorio, usará las habilidades necesarias, creará un artefacto, ejecutará comprobaciones y escribirá un evento importante en el Second Brain.

Esto aún no es Dark Fabric. Pero tampoco es simplemente «chatear con un modelo».

## Qué salió

Al momento de este borrador, open-second-brain es una capa de memoria pequeña pero ya útil para el desarrollo basado en agentes.

Puede:

- inicializar un vault compatible con Obsidian para trabajo de agentes;
- crear `AI Wiki/` y páginas de servicio;
- escribir eventos diarios en Markdown;
- almacenar identidades de agentes;
- tener en cuenta la zona horaria del usuario, no solo la hora del servidor;
- comprobar la salud del vault, la configuración y los manifiestos de runtime;
- exportar la configuración con valores sensibles redactados;
- funcionar a través de CLI, MCP y adaptadores de runtime;
- soportar Hermes, Claude Code, Codex y OpenClaw desde un solo repositorio.

Lo más valioso ni siquiera es la lista de comandos. Lo valioso es que los agentes ahora tienen un protocolo de memoria compartido: cuando ocurre algo duradero — código, una corrección, un cambio de configuración, contenido, un hallazgo de investigación, una decisión de diseño — hay que registrarlo para que el yo-del-futuro y el agente-del-futuro puedan encontrarlo más adelante.

## Qué viene después

El objetivo más cercano es llevar la combinación Hermes + open-second-brain a un estado donde el agente no solo escriba eventos, sino que realmente use la memoria acumulada durante la planificación y la revisión.

Más allá de eso, quiero:

- conectar mejor los registros Daily con las páginas wiki;
- añadir búsquedas más útiles y resúmenes del historial del proyecto;
- escribir un artículo aparte sobre cómo funciona exactamente Hermes en el VPS y cómo está configurada la comunicación a través de Telegram;
- transformar los flujos de trabajo actuales en una Dark Fabric más autónoma;
- comprobar si diferentes agentes pueden compartir un solo vault sin problemas y sin romper el contexto mutuo.

La conclusión principal hasta ahora es simple: los agentes no necesitan solo un modelo ni solo acceso a un repositorio. Necesitan un entorno donde las decisiones, los hechos y los eventos se conviertan en una parte duradera del proceso.

[open-second-brain](https://github.com/itechmeat/open-second-brain) es mi primer paso funcional en esa dirección.

## Cómo se escribió este artículo

Lo siento, pero este artículo también fue escrito por el mismo agente Hermes. Solo este párrafo y mi [post en Facebook](https://www.facebook.com/reel/1355271143340726/) fueron escritos a mano. Simplemente le pedí al agente que clonara mi blog como un proyecto normal, revisara el historial de commits y usara el post de Facebook como base. Y por supuesto, releí y corregí el texto antes de publicarlo. Y no me digan que no tiene alma — yo le pongo alma al agente.
