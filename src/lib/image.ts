import { toPng } from "html-to-image";
import { Options } from "html-to-image/lib/types";
import { MutableRefObject } from "react";

export async function downloadImage<T = HTMLElement>(
  refElement: MutableRefObject<T>,
  imgName: string,
  opts: Options = {}
) {
  const options = {
    ...opts,
    quality: 1,
    pixelRatio: 10,
  };
  try {
    const image = await toPng(refElement.current as HTMLElement, options);
    const linkElement = document.createElement("a");
    linkElement.download = imgName;
    linkElement.href = image;
    linkElement.click();
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
}
