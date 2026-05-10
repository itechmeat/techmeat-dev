---
title: "Cómo le di una cartera a mi agente de IA y por qué enseguida le hizo falta una memoria"
description: "open-second-brain 0.8.0 y Pay Memory: cómo le permití al agente pagar APIs externas a través de pay.sh y por qué la parte clave no resultó ser el pago en sí, sino un registro claro de cada céntimo gastado."
pubDate: 2026-05-10
locale: es
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
prFileId: 4edd4f7935d1db5654aef8b076e3f9e8f57b0ec671bb6e4cfa6504b200c8cb5a
---

Hace unos días lancé [open-second-brain](/es/posts/how-i-built-open-second-brain/) - una capa de memoria basada en ficheros para agentes de IA. Desde entonces me daba vueltas una idea. Si el agente corre en un VPS, con su propio horario, a través de Telegram - tarde o temprano va a necesitar gastar dinero. Comprar una llamada de API. Generar una ilustración. Disparar una búsqueda de pago.

El pago en sí es un problema ya resuelto. [pay.sh](https://pay.sh) envuelve una llamada HTTP ordinaria en una de pago vía micropagos en USDC sobre Solana. El agente ejecuta curl a través de `pay`, la cartera firma la transacción, del otro lado se devuelve una respuesta. Listo.

Pero "listo" es solo la mitad de la historia.

## Caos con cartera

Imagina esto: el agente está trabajando en una tarea, toma un puñado de decisiones por el camino, dos de ellas son llamadas de pago. Una hora más tarde abres la terminal y el scrollback ya se fue volando de la pantalla. En algún lugar de allí hubo invocaciones de `pay`, en algún lugar llegaron firmas de tx, en algún lugar volvieron respuestas JSON.

¿Por qué lo hizo el agente? ¿Sobre qué base? ¿Cuánto esperaba gastar? ¿Cuánto se debitó realmente? ¿Dónde está el resultado?

Si quieres confiarle al agente algo autónomo, "léete el scrollback" no sirve. Un log de terminal no es estructurado, no está vinculado a la tarea, no es indexable, no sobrevive a un reinicio y no se puede abrir en Obsidian como un artefacto normal.

Bastante rápido me di cuenta de que la tarea no era "enseñar al agente a pagar" - era "asegurarse de que cada pago deje atrás un rastro con sentido".

![Un agente de IA sosteniendo una cartera digital mientras un rastro de micropagos fluye hacia tarjetas-recibo de Markdown enlazadas](./image.png)

Esta ilustración fue generada exactamente de la forma que describe el propio post: a través de `pay.sh`, usando el gateway x402 `paysponge/fal` y el endpoint `fal-ai/fast-sdxl`. La generación costó **0.01 USDC** desde la cartera mainnet `64FaukkZDUdFTufXF49H1CrHjDfsmBFqfrUjsAS8XrgP`; la transacción pública de Solana es [`5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW`](https://solscan.io/tx/5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW). El request id fue `019e135a-357b-71f3-8b9d-305e728b05fb` y el asset generado se guardó localmente como `image.png`.

Y aquí open-second-brain encajó a la perfección.

## Pay Memory

En la versión 0.8.0, OSB recibió una nueva capa - **Pay Memory**. En resumen: memoria para el dinero.

Después de cada acción de pago, aparece en el vault un fichero Markdown plano con estos campos:

- **por qué** el agente decidió pagar;
- **qué servicio** se llamó;
- **qué spending policy** se aplicó y qué decidió (`allowed` / `approval_required` / `denied` / `not_checked`);
- **coste esperado** y **monto realmente debitado**;
- **payment proof** - la firma concreta de Solana que puedes abrir en Solscan y verificar;
- **el resultado** - un enlace a una asset note separada con la salida;
- **quién aprobó**, si la policy lo requería.

No es una tabla de SQLite y no es un dashboard. Es Markdown plano que vive en la misma carpeta donde el agente escribe su daily log. Puedes abrirlo con los ojos, comentarlo, hacer commit en Git, luego buscarlo con grep o mostrarlo como prueba.

OSB no se convierte aquí en un sistema de pagos - no guarda cartera, no firma transacciones, no hace enforcement. Hace lo que sabe hacer bien: mantiene una memoria honesta y legible por humanos. pay.sh le da al agente acceso a recursos de pago; Pay Memory le da al humano la posibilidad de abrir el vault una semana después y entender con calma lo que pasó.

Por cierto, [así es exactamente como se ve un receipt real](/files/fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md) - el de esa misma ilustración al principio del post. Markdown crudo, directo desde el vault, sin procesamiento alguno. Frontmatter con todos los campos enumerados arriba y, debajo, un texto en lenguaje humano sobre el "por qué", lo "que devolvió la policy" y "cuánto se debitó de verdad".

Dentro del Second Brain vive en esta ruta:

```
AI Wiki/
└── payments/
    └── 2026-05-10/
        └── fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md
```

Sin magia: fecha → carpeta, slug → nombre de fichero. Cómodo para grep, git diff y la navegación habitual en Obsidian.

## Un principio que resultó importar más que el resto

Cuando revisé la implementación borrador, mi ojo captó de inmediato un detalle: el receipt siempre escribía "Allowed by the configured spending policy" - incluso cuando en el vault no existía ninguna policy.

Suena a pequeñez. En realidad, mata todo el sentido.

Pay Memory es una capa de audit. Una capa de audit vale exactamente en la medida en que es honesta. En el momento en que el receipt empieza a contar una historia bonita en lugar de la real, todo se derrumba. Así que la regla resultó simple: mejor escribir `not_checked` que loguear con confianza `allowed` falsamente. Si la policy no se comprobó - dilo. Si la policy devolvió `denied` pero un humano dejó pasar la llamada a mano - dilo también.

La tentación de la "buena narrativa" es el principal enemigo de un sistema de audit. Y esa es, probablemente, la lección más importante del día - una que pienso trasladar a otras partes del proyecto.

## Un pago real en producción

Al final del día, todo esto había que comprobarlo no con fixtures de sandbox, sino con dinero real. Envié diez céntimos de USDC a una cartera Solana recién creada y le pedí al agente encontrar tres cafés en Belgrado vía Google Places.

Un segundo después volvieron tres lugares reales - Artist Specialty Coffee, Dusha, DRIP. Tx finalizada en mainnet, $0.001 USDC, el balance pasó de 0.10 a 0.099. Firma en Solscan, clicable.

Y entonces se puso en marcha toda la cadena de Pay Memory: un receipt con la firma real en el vault, una asset note separada con los tres cafés, un informe diario de pagos y una entrada corta en Daily con enlaces a ambos archivos. Puedo abrir el vault en Obsidian, hacer clic en la prueba, ver el pago real en el explorador y justo al lado - una historia clara, en lenguaje humano, de por qué el agente lo hizo.

## Para qué todo esto

No intento construirme enterprise compliance ni blockchain-for-everything. La arquitectura en sí es vergonzosamente sencilla - un conjunto de archivos Markdown en las carpetas adecuadas.

Pero la idea detrás importa.

Si un agente trabaja cada vez más autónomamente, su memoria tiene que cubrir no sólo las acciones textuales sino también las acciones con consecuencias: llamar a un servicio externo, gastar dinero, crear un asset, solicitar approval. El pago es sólo el ejemplo más vívido, porque la pregunta de la confianza aparece de inmediato. Los mismos principios se trasladan fácilmente a publicar un post, enviar un email, hacer deploy, encargar una generación, una operación on-chain.

Versión corta:

> pay.sh le da al agente acceso a recursos de pago.
> Pay Memory le da al humano la capacidad de entender, una semana después, por qué el agente usó ese acceso.

Si el agente sólo gasta dinero - eso es un riesgo. Si el agente gasta dinero y deja un rastro honesto, enlazado y legible por humanos - eso ya es un workflow en el que poco a poco se puede empezar a confiar.

Pay Memory salió como parte de [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0).
