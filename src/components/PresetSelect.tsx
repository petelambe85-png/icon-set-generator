// components/PresetSelect.tsx
"use client";

import { STYLE_PRESETS, type PresetStyleId } from "@/lib/styles";
import clsx from "clsx";

interface Props {
  value: PresetStyleId;
  onChange: (value: PresetStyleId) => void;
}

export default function PresetSelect({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {STYLE_PRESETS.map((preset) => {
        const selected = preset.id === value;

        return (
          <button
            key={preset.id}
            type="button"
            onClick={() => onChange(preset.id)}
            className={clsx(
              "group rounded-xl border px-3 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-indigo-500",
              selected
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm">{preset.label}</span>
              {selected && (
                <span className="rounded-full bg-indigo-500 text-white text-[10px] px-2 py-0.5">
                  Selected
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500 leading-snug">
              {preset.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
