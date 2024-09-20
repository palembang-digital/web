import { toPng } from "html-to-image";
import { MutableRefObject } from "react";

export async function downloadImage<T = HTMLElement>(
  refElement: MutableRefObject<T>,
  imgName: string
) {
  try {
    const canvas = await toPng(refElement.current as HTMLElement);
    const linkElement = document.createElement("a");
    linkElement.download = imgName;
    linkElement.href = canvas;
    linkElement.click();
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
}
