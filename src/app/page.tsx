// app/page.tsx
"use client";

import { FormEvent, useState } from "react";
import PresetSelect from "@/components/PresetSelect";
import IconGrid from "@/components/IconGrid";
import type { PresetStyleId } from "@/lib/styles";

function parseColorInput(raw: string): string[] {
  return raw
    .split(/[,\s]+/)
    .map((c) => c.trim())
    .filter(Boolean)
    .map((c) => (c.startsWith("#") ? c : `#${c}`))
    .filter((c) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c));
}

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<PresetStyleId>("pastels");
  const [colorInput, setColorInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt for your icon set.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setImages([]);

    const colors = parseColorInput(colorInput);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style,
          colors,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }

      const data = (await res.json()) as { images: string[] };
      setImages(data.images || []);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message || "Something went wrong while generating the icons."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Icon Set Generator
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Enter a theme, choose a preset style, and optionally provide brand
            colors. The app will generate a set of{" "}
            <strong>4 matching 1:1 icons</strong> using the FLUX.1 [schnell]
            model on Replicate.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prompt */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-800">
                Prompt for icon set
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='e.g. "Hockey equipment", "Travel booking app", "Fintech dashboard actions"'
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 min-h-[80px]"
              />
              <p className="text-xs text-slate-500">
                Describe the theme or concept for your icons. The system will
                generate 4 different but related icons.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-800">
                Preset style
              </label>
              <PresetSelect value={style} onChange={setStyle} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-800">
                Brand colors (optional)
              </label>
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="#7C3AED, #F97316 or 7C3AED F97316"
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-500">
                Enter one or more HEX colors, separated by commas or spaces.
                These will be used as a palette hint.
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Generating…" : "Generate icon set"}
              </button>
              <p className="text-[11px] text-slate-400">
                Uses Replicate&apos;s{" "}
                <a
                  className="underline"
                  href="https://replicate.com/black-forest-labs/flux-schnell"
                  target="_blank"
                  rel="noreferrer"
                >
                  FLUX.1 [schnell]
                </a>{" "}
                model.
              </p>
            </div>
          </form>

          <IconGrid images={images} isLoading={isLoading} />
        </section>
      </div>
    </main>
  );
}
