// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { buildIconPrompt } from "@/lib/prompt";
import type { PresetStyleId } from "@/lib/styles";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const runtime = "nodejs";

interface GenerateRequestBody {
  prompt: string;
  style: PresetStyleId;
  colors?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateRequestBody;

    if (!body.prompt || !body.prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const style = body.style ?? "sticker";
    const colors =
      Array.isArray(body.colors) && body.colors.length > 0
        ? body.colors
        : undefined;

    const composedPrompt = buildIconPrompt({
      basePrompt: body.prompt,
      styleId: style,
      colors,
    });

    const output = (await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: composedPrompt,
        aspect_ratio: "1:1",
        num_outputs: 4,
        output_format: "png",
        output_quality: 90,
      },
    })) as any[];

    const imageUrls = output.map((file: any) => {
      if (file && typeof file.url === "function") {
        return file.url() as string;
      }
      return String(file);
    });

    return NextResponse.json({ images: imageUrls });
  } catch (error: any) {
    console.error("Replicate error:", error);
    return NextResponse.json(
      {
        error:
          "Failed to generate icons. Please try again, or check your API token.",
      },
      { status: 500 }
    );
  }
}
