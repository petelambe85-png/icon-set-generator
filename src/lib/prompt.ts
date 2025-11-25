// lib/prompt.ts
import { PresetStyleId, STYLE_PRESET_MAP } from "./styles";

interface BuildPromptOptions {
  basePrompt: string;
  styleId: PresetStyleId;
  colors?: string[];
}

export function buildIconPrompt({
  basePrompt,
  styleId,
  colors,
}: BuildPromptOptions): string {
  const style = STYLE_PRESET_MAP[styleId];
  const trimmedPrompt = basePrompt.trim();

  const paletteText =
    colors && colors.length > 0
      ? ` Use this brand color palette: ${colors.join(
          ", "
        )}. Keep the icons visually consistent and primarily within this palette.`
      : "";

  return [
    `You are designing a cohesive set of 4 minimal vector ICONS in ${style.label} style.`,
    `For THIS image, generate exactly ONE icon related to the theme: "${trimmedPrompt}".`,
    "The image must contain a single main object only, centered with generous padding.",
    "Do NOT draw multiple different objects in the same image. Do NOT show a collection or collage of items. No repeating items scattered around.",
    "If the theme sounds plural or like a category (for example “hockey equipment”), still pick ONE representative object for this icon (for example a helmet, a glove, a net, or a stick) and show only that object.",
    "Across the 4 outputs, the icons should be different objects or poses but share a consistent style: same line thickness, perspective, level of detail, and background treatment.",
    `Style guidance: ${style.promptSuffix}.`,
    "Square 1:1 aspect ratio, like a 512x512 app icon. Simple plain background, no text, no logos, no UI chrome, no full scenes, no photographic realism.",
    "Clean, high-contrast shapes with clear silhouette.",
    paletteText,
  ]
    .join(" ")
    .trim();
}
