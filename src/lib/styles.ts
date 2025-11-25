// lib/styles.ts

export type PresetStyleId =
  | "sticker"
  | "pastels"
  | "business"
  | "cartoon"
  | "3d"
  | "gradient";

export interface StylePreset {
  id: PresetStyleId;
  label: string;
  promptSuffix: string;
  description: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "sticker",
    label: "Sticker",
    description: "Cute, bold sticker icons with outlines and drop shadows.",
    promptSuffix:
      "cute sticker icon, bold outline, slight drop shadow, flat vector style, simple background",
  },
  {
    id: "pastels",
    label: "Pastels",
    description: "Soft, rounded icons with pastel colors.",
    promptSuffix:
      "minimal vector icon, soft pastel color palette, rounded shapes, gentle gradients, clean background",
  },
  {
    id: "business",
    label: "Business",
    description: "Clean, professional UI icons.",
    promptSuffix:
      "professional flat icon, minimal vector design, corporate UI style, subtle gradients, clean white or light background",
  },
  {
    id: "cartoon",
    label: "Cartoon",
    description: "Playful cartoon illustrations.",
    promptSuffix:
      "colorful cartoon icon, 2D illustration, playful proportions, clean outlines, flat background",
  },
  {
    id: "3d",
    label: "3d",
    description: "3D rendered icon style.",
    promptSuffix:
      "3d rendered icon, soft studio lighting, smooth materials, isometric view, high quality CG render",
  },
  {
    id: "gradient",
    label: "Gradient",
    description: "Modern gradient-based icons.",
    promptSuffix:
      "modern flat icon, bold gradients, smooth color transitions, minimal shapes, high contrast",
  },
];

export const STYLE_PRESET_MAP: Record<PresetStyleId, StylePreset> =
  STYLE_PRESETS.reduce(
    (acc, preset) => {
      acc[preset.id] = preset;
      return acc;
    },
    {} as Record<PresetStyleId, StylePreset>
  );
