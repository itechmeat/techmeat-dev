import { onCleanup, onMount } from "solid-js";

interface Props {
  selector?: string;
  copyLabel: string;
  copiedLabel: string;
}

export default function CopyButton(props: Props) {
  onMount(() => {
    const selector = props.selector ?? "article pre";
    const cleanups: Array<() => void> = [];

    for (const pre of document.querySelectorAll<HTMLPreElement>(selector)) {
      if (pre.dataset.copyEnhanced === "true") continue;

      pre.dataset.copyEnhanced = "true";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code-button";
      button.textContent = props.copyLabel;
      button.setAttribute("aria-label", props.copyLabel);
      let resetTimeout: number | undefined;

      const restoreLabel = () => {
        button.textContent = props.copyLabel;
        button.setAttribute("aria-label", props.copyLabel);
      };

      const scheduleRestore = () => {
        if (resetTimeout) window.clearTimeout(resetTimeout);
        resetTimeout = window.setTimeout(restoreLabel, 1200);
      };

      const copy = async () => {
        const code = pre.querySelector("code");
        const text = code?.textContent ?? pre.textContent ?? "";
        if (!navigator.clipboard?.writeText) return;

        try {
          await navigator.clipboard.writeText(text);
        } catch (error) {
          console.warn("Failed to copy code block", error);
          restoreLabel();
          return;
        }

        button.textContent = props.copiedLabel;
        button.setAttribute("aria-label", props.copiedLabel);
        scheduleRestore();
      };

      button.addEventListener("click", copy);
      pre.insertAdjacentElement("beforebegin", button);

      cleanups.push(() => {
        if (resetTimeout) window.clearTimeout(resetTimeout);
        button.removeEventListener("click", copy);
        button.remove();
        delete pre.dataset.copyEnhanced;
      });
    }

    onCleanup(() => {
      for (const cleanup of cleanups) cleanup();
    });
  });

  return null;
}
