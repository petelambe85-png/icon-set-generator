// components/IconGrid.tsx
"use client";

interface IconGridProps {
  images: string[];
  isLoading: boolean;
}

export default function IconGrid({ images, isLoading }: IconGridProps) {
  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-sm text-slate-600">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <span>Generating your icon set…</span>
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold text-slate-700 mb-3">
        Generated Icon Set
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((url, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm flex flex-col items-center"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-50">
              <img
                src={url}
                alt={`Generated icon ${idx + 1}`}
                className="h-full w-full object-contain"
              />
            </div>
            <a
              href={url}
              download={`icon-${idx + 1}.png`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 text-xs text-indigo-600 hover:underline"
            >
              Download PNG
            </a>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <a
          href={images[0]}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-slate-500 hover:underline"
        >
          Open first image in new tab
        </a>
      </div>
    </div>
  );
}
