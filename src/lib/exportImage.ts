import { toPng } from "html-to-image";

export async function exportElementAsPng(
  element: HTMLElement,
  fileName = "canceltour-story.png",
  pixelRatio = 2
): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio,
      cacheBust: true,
      skipFonts: false,
      style: {
        transform: "scale(1)",
      },
    });

    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to generate image card:", error);
    throw error;
  }
}
